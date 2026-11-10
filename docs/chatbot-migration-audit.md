# Chatbot Migration Audit — ByteBuddy Architecture Review

## 1. How ByteBuddy Currently Works

ByteBuddy is the portfolio chatbot (agent name). It runs as a FastAPI endpoint on Vercel serverless. The flow:

1. User opens chat → frontend fetches `GET /chat/greeting` → shows greeting
2. User sends message → frontend sends `POST /chat {message, history}` → backend responds
3. Backend constructs a system prompt from `summary.txt` + `Profile.pdf` context
4. Calls OpenAI GPT-4.1-mini with tool definitions (`record_user_details`, `record_unknown_question`)
5. If the model responds with a tool call, the backend executes the Python function and loops
6. Final response returned to frontend, rendered with typing effect + Markdown

## 2. Current Provider and Model

| Field | Value |
|---|---|
| Provider | OpenAI |
| Model | `gpt-4.1-mini` (configurable via `OPENAI_MODEL` env var) |
| SDK | `openai` Python package |
| Auth | `OPENAI_API_KEY` env var → `OpenAI()` auto-reads from env |
| Fallback | None — single point of failure |

## 3. API Key Storage

| Secret | Location | Exposure Risk |
|---|---|---|
| `OPENAI_API_KEY` | `.env` (gitignored) | None — server-side only |
| `PUSHOVER_TOKEN` | `.env` (gitignored) | None |
| `PUSHOVER_USER` | `.env` (gitignored) | None |

**No secrets are exposed client-side.** All API keys are loaded on the server via `python-dotenv` and `os.getenv()`. The frontend never sees or sends keys. This is already secure.

## 4. Secret Exposure Check

- `public/script.js` — fetches `/chat` and `/chat/greeting` only. No API keys, no tokens, no secrets.
- `public/index.html` — no embedded secrets.
- `public/style.css` — no secrets.
- `api/index.py` — loads keys from env (`os.getenv`), never hardcodes them.
- `.gitignore` — correctly ignores `.env`. `.env.example` is tracked intentionally. No committed `.env` found.
- `.env.example` — contains placeholder values only (`sk-...`). No real secrets.

**Conclusion:** No secrets found in tracked client code. No rotation required. The `OPENAI_API_KEY` placeholder in `.env.example` should be replaced with the new provider's placeholder format for clarity.

## 5. How `summary.txt` Is Loaded

File: `api/data/summary.txt` (121 lines, ~7 KB of structured profile text).

Loaded in `Me.__init__()` at module import time:
```python
with open(summary_path, "r", encoding="utf-8") as f:
    self.summary = f.read()
```

Used in `Me.system_prompt()` — appended directly into the system prompt after `## Summary:`.

## 6. How PDF Context Is Loaded

File: `api/data/Profile.pdf` (binary, PDF resume).

Loaded at module import time via `pypdf.PdfReader`:
```python
reader = PdfReader(pdf_path)
for page in reader.pages:
    text = page.extract_text()
    if text:
        self.linkedin += text
```

Used in `Me.system_prompt()` — appended after `## LinkedIn Profile:`.

Both files are included in the Vercel deployment via `vercel.json`:
```json
"includeFiles": "api/data/**"
```

## 7. Conversation History

- **Storage:** Client-side only. `chatHistory` array in `public/script.js`.
- **Transmission:** Sent with every `POST /chat` request as `{message, history}`.
- **Pruning:** Backend truncates to `MAX_HISTORY_TURNS = 20` (last 40 messages, user+assistant pairs).
- **Persistence:** None — lost on page refresh. No database, no session store.
- **Size limit:** ~500 tokens for 20 turns at typical message length.

## 8. Current Token Usage (Estimated)

| Component | Tokens |
|---|---|
| System prompt + summary.txt + PDF context | ~2,204 |
| Conversation history (20 turns max) | ~500 |
| Current user message | ~200 |
| **Input total** | **~2,904** |
| Output reserve | 400–500 |
| **Total request budget** | **~3,300–3,500** |

## 9. Current Error Handling

| Error Type | HTTP Status | Behavior |
|---|---|---|
| Rate limit (OpenAI) | 503 | "AI service is temporarily overloaded" |
| Timeout | 504 | "AI service timed out" |
| API error (429/502/503) | 503 | "AI service returned an error" |
| Other API error | 500 | "An unexpected error occurred" |
| Rate limiter (per-IP, 10/min) | 429 | "Rate limit exceeded" |
| `me_assistant` init failure | 503 | "Chat service is not available" |

**Problems:**
- No provider fallback — if OpenAI is down, the chatbot is dead.
- No distinction between transient and permanent errors for retry logic.
- Client only sees a generic "trouble connecting" message on any failure.

## 10. Current Deployment Architecture

```
Vercel Edge/Static
├── public/ (static files via @vercel/static)
│   ├── index.html
│   ├── script.js
│   └── style.css
└── api/index.py (FastAPI via @vercel/python)
    ├── GET  /              → {"status": "ok"}
    ├── GET  /chat/greeting → {"greeting": "..."}
    └── POST /chat          → {"response": "..."}
```

Vercel routing (`vercel.json`):
- `/chat` → `api/index.py`
- `/api/(.*)` → `api/index.py`
- `/(.*)` → `/public/$1`

CORS: locked to `https://portfolio-xdk9.vercel.app` only.

## 11. Files Requiring Modification

| File | Action | Reason |
|---|---|---|
| `api/chat.py` | **CREATE** | New multi-provider router module |
| `api/index.py` | MODIFY | Delegate `/chat` to ChatRouter, keep app shell |
| `api/test_index.py` | MODIFY | Update mocks for new provider architecture |
| `api/test_chat.py` | **CREATE** | Unit tests for provider fallback logic |
| `requirements.txt` | MODIFY | Replace `openai` with `groq` |
| `.env.example` | MODIFY | Replace `OPENAI_API_KEY` with `GROQ_API_KEY`, `GEMINI_API_KEY` |
| `AGENTS.md` | MODIFY | Update architecture, dependencies, commands |
| `docs/chatbot-migration-audit.md` | **CREATE** | This document |

**No changes needed:**
- `public/index.html` — no provider-specific code
- `public/script.js` — API interface unchanged (`POST /chat` + `GET /chat/greeting`)
- `public/style.css` — no provider-specific code
- `vercel.json` — routing unchanged
- `api/data/*` — profile data unchanged

## 12. Security and Reliability Issues (Pre-Migration)

| Issue | Severity | Status |
|---|---|---|
| Single provider (OpenAI) — no fallback | **High** | Will be fixed |
| No TPM/TPD awareness | **Medium** | Will be fixed |
| No request budget control | **Medium** | Will be fixed with `DEFAULT_REQUEST_TOKEN_BUDGET=3500` |
| No model deprecation handling | **High** | Will be fixed with env-controlled model IDs |
| Pushover tokens not validated at startup | **Low** | Pre-existing, not in scope |
| No conversation persistence | **Low** | Pre-existing, by design |
| Cold start latency (~1-2s on Vercel free) | **Low** | Pre-existing, unavoidable |
| API keys server-side only | ✅ **Good** | No change needed |
| CORS locked to production origin | ✅ **Good** | No change needed |
| Rate limiter per-IP | ✅ **Good** | No change needed |
| `.env` in `.gitignore` | ✅ **Good** | No change needed |

## 13. Migration Summary

The migration replaces OpenAI (single-provider, single-model) with a multi-provider fallback chain:
1. **Groq** — `qwen/qwen3.6-27b` (primary, free-tier)
2. **Groq** — `openai/gpt-oss-120b` (secondary, free-tier)
3. **Google Gemini** — user-configured Flash model (free-tier)
4. **Local deterministic fallback** — no API required, always available

Key improvements:
- No single point of failure
- All models are free-tier capable
- Graceful degradation on rate limits/outages
- Token budget control (3,500 per request)
- Deprecated models never block the chain
- Architecture works after Aug 16, 2026 deprecation
