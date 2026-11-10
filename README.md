# Portfolio — Sayem Ahamed

AI Engineer and Applied AI Researcher building production AI systems for education, healthcare, and research. Specializing in deep learning, medical image analysis, LLMs, RAG, and trustworthy AI.

**Live site**: [portfolio-xdk9.vercel.app](https://portfolio-xdk9.vercel.app)

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla HTML/CSS/JS (custom CSS with dark/light themes), Font Awesome 6 (CDN) |
| Backend | Node.js serverless (`@vercel/node`) — provider fallback chain |
| Chatbot | ByteBuddy — fetches context from PDF resume and `summary.txt` |
| Deploy | Vercel (static files + serverless functions) |

## Local Development

```bash
npm install
```

Create `.env.local` in the repo root:

```
GROQ_API_KEY=gsk-...
GEMINI_API_KEY=...           # optional
PUSHOVER_TOKEN=...            # optional
PUSHOVER_USER=...             # optional
GEMINI_MODEL=gemini-2.0-flash # optional
```

Run locally:

```bash
vercel dev
```

Frontend is served by Vercel routing during dev. Chat endpoint is `POST /api/chat`.

## File Structure

```
├── public/                    # Static frontend
│   ├── index.html             # Main page (hero, about, experience, projects, publications, skills, contact)
│   ├── style.css              # Dark/light theme styles
│   ├── script.js              # Chatbot UI, scroll animations, form validation
│   ├── sayem3.png             # Profile photo
│   └── favicon.svg            # SVG favicon
├── api/
│   ├── chat.js                # Vercel serverless handler for POST /api/chat
│   ├── providers/
│   │   ├── groq.js            # Groq REST API provider with tool calling
│   │   └── gemini.js          # Google Gemini REST API provider
│   ├── lib/
│   │   ├── provider-router.js # Fallback chain (Groq → Gemini → local)
│   │   ├── context-loader.js  # Loads summary.txt + Profile.pdf into chatbot context
│   │   ├── context-budget.js  # Token budget constants
│   │   ├── local-fallback.js  # Deterministic keyword-matching fallback
│   │   ├── request-validator.js
│   │   ├── safe-error.js      # Safe error wrapper (no stacks, no internals)
│   │   └── rate-limit.js      # Per-IP in-memory rate limiter (10 req/min)
│   └── data/
│       ├── Profile.pdf        # PDF resume loaded at startup for chatbot context
│       └── summary.txt        # Text summary of verified profile for chatbot context
├── docs/
│   ├── portfolio-update-plan.md
│   ├── portfolio-validation.md
│   └── chatbot-migration-audit.md
├── vercel.json                # Build & routing config
├── package.json               # Node.js dependency manifest (pdf-parse)
├── AGENTS.md                  # Agent instructions
└── README.md                  # This file
```

## Content-Update Guidance

1. **Profile data** — Edit `api/data/summary.txt` to update what the chatbot knows. Keep factual, concise language.
2. **Projects** — Each project is a `.project-card` div in `index.html`. Follow the existing pattern (title, status badge, description, Key Capabilities list, Technologies tags, optional repo link).
3. **Publications** — Use `.publication-item` divs with `.status-badge` for status (published, submitted, ongoing, book-chapter).
4. **Skills** — Edit the `.tech-tag` spans in the Skills section.
5. **Nav links** — Add new sections by duplicating the nav `<a>` and the corresponding `<section id="...">`.
6. **Theme** — CSS custom properties in `:root` of `style.css` control all colors. No build step required.

## Deployment

```bash
vercel deploy          # Deploy to production
vercel --prod          # Deploy current directory to production
```

No build step required. Vercel routes `/(.*)` → `public/$1` for static files and `/api/chat` → `api/chat.js` for the serverless backend.

## Chatbot (ByteBuddy)

The chatbot uses a multi-provider fallback chain:

1. **Groq** — `qwen/qwen3.6-27b` (primary)
2. **Groq** — `openai/gpt-oss-120b` (secondary)
3. **Google Gemini** — Free-tier Flash model (if configured)
4. **Local fallback** — Deterministic keyword-matching (no API required)

Tool calling: `record_user_details` (Pushover) and `record_unknown_question`.

## Notes

- Chatbot context is loaded from `api/data/Profile.pdf` and `api/data/summary.txt` at startup. Restart the server after updating these files.
- The serverless function requires `GROQ_API_KEY` to function. Without it, only the local keyword fallback works.
- Requests must carry an `Origin` header matching `ALLOWED_ORIGIN` (default `https://portfolio-xdk9.vercel.app`); anything else gets `403`. `http://localhost:3000` is also allowed under `vercel dev`.
- Rate limiting is in-memory, per function instance (10 requests/minute per IP). On Vercel the client IP comes from `x-vercel-forwarded-for`; set `TRUST_PROXY=1` only when running behind your own trusted proxy.
- Messages that look like prompt-injection attempts get a polite refusal (HTTP 200) instead of an error, so a single flagged message never breaks the chat session.
- The browser calls only `/api/chat` — never Groq or Gemini directly.
