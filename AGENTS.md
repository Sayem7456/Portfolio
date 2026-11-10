# AGENTS.md — Personal Portfolio

## Stack
- **Frontend**: vanilla HTML/CSS/JS in `public/` (custom CSS, no framework).
- **Backend**: Node.js serverless functions in `api/` via `@vercel/node`.
- **Deploy**: Vercel (`vercel.json` routes `/api/chat` → `api/chat.js`, `/(.*)` → `public/$1`).

## Key files
| Path | Purpose |
|---|---|
| `public/index.html` | Page content (sections: hero, about, experience, projects, research, skills, contact) |
| `public/script.js` | Chatbot UI, scroll animations, hacker-themed visual effects |
| `public/style.css` | Dark/light theme styles (CSS variables; `[data-theme="light"]` overrides `:root`) |
| `api/chat.js` | Vercel serverless handler for `POST /api/chat` |
| `api/providers/groq.js` | Groq REST API provider with tool calling support |
| `api/providers/gemini.js` | Google Gemini REST API provider |
| `api/lib/provider-router.js` | Fallback chain orchestration (Groq → Gemini → local) |
| `api/lib/context-loader.js` | Loads summary.txt + Profile.pdf into chatbot context |
| `api/lib/context-budget.js` | Token budget constants and estimation (`DEFAULT_REQUEST_TOKEN_BUDGET = 3500`) |
| `api/lib/local-fallback.js` | Deterministic keyword-matching portfolio fallback |
| `api/lib/request-validator.js` | Request body validation |
| `api/lib/safe-error.js` | Safe error wrapper (no stacks, no internals) |
| `api/lib/rate-limit.js` | Per-IP in-memory rate limiter (10 req/min) |
| `api/data/Profile.pdf` | PDF resume read at startup as chatbot context |
| `api/data/summary.txt` | Text summary of verified profile read at startup as chatbot context |
| `docs/chatbot-migration-audit.md` | Audit of pre-migration architecture and migration summary |
| `docs/portfolio-update-plan.md` | Source-of-truth plan for all content updates |
| `docs/portfolio-validation.md` | Validation checks, fixed issues, remaining limitations |
| `vercel.json` | Build & routing config |
| `package.json` | Node.js dependency manifest (`pdf-parse`) |

## Running locally
```bash
npm install
# Requires .env.local with GROQ_API_KEY, optionally GEMINI_API_KEY, PUSHOVER_TOKEN, PUSHOVER_USER
vercel dev
```

Or run the serverless function directly:
```bash
node -e "require('./api/chat.js')"
```

## Commands
- `vercel deploy` — deploy to Vercel (installs deps from `package.json`).
- `npm test` — run the Node built-in test runner (`node --test`, auto-discovers `*.test.js`).
- `npm run check:budget` — verify the chatbot token budget fits each model's TPM limit.

## Dependencies
Backend: `pdf-parse` (npm), global `fetch` (Node.js 18+ built-in).
Frontend: Font Awesome 6 (CDN), `marked` (Markdown parse in chat).

## Chatbot ("ByteBuddy")
- Multi-provider fallback chain (in order):
  1. Groq — `qwen/qwen3.6-27b` (primary)
  2. Groq — `openai/gpt-oss-120b` (secondary)
  3. Google Gemini — user-configured Flash model (free tier)
  4. Local deterministic keyword fallback (no API required)
- Uses two tools via Groq function calling: `record_user_details` (Pushover) and `record_unknown_question`.
- Renders Markdown responses with a typing effect in the chat UI.
- Chat endpoint: `POST /api/chat` with `{ message: string, history: [{ role, content }] }`.
- Response: `{ answer: string, provider: string, model: string|null, fallbackUsed: boolean }`.
- Error response: `{ error: string, code: string }`.
- Token budget: `DEFAULT_REQUEST_TOKEN_BUDGET = 3500`.

## Constraints
- `.gitignore` ignores `.env`, `.env.local`, `.env.production`, `venv/`, `__pycache__/`, `.DS_Store`, `.vercel`, `node_modules/`.
- Data file paths are built relative to `api/lib/context-loader.js` (`path.join(__dirname, '..', 'data', ...)`).
- `.env.example` is tracked on purpose (placeholders only, no secrets).
- `/api/chat` requires an `Origin` header equal to `ALLOWED_ORIGIN` (default `https://portfolio-xdk9.vercel.app`); missing or different origins get `403`. Localhost is allowed only when `VERCEL_ENV=development`.
- Client IP for rate limiting comes from `x-vercel-forwarded-for`/`x-forwarded-for` only on Vercel or when `TRUST_PROXY=1`; never trust `cf-connecting-ip`/`true-client-ip`.
- Prompt-injection matches return a 200 guard reply (`provider: 'guard'`), and flagged history entries are dropped rather than rejected.
- Gemini model is NOT hardcoded — set `GEMINI_MODEL` in `.env` to an available free-tier model.
- The browser calls only `/api/chat` — NEVER Groq or Gemini directly.
