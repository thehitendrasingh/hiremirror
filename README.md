# HireMirror

**Find out why recruiters ignore your resume.**

HireMirror is a PMF-validation MVP for hiring visibility intelligence — not a resume builder, ATS checker, or dashboard SaaS. It mirrors how recruiters perceive your application in ~7 seconds.

## Flow

1. **Landing** — Emotional hook + sample insights
2. **Upload** — Resume (PDF/DOCX) + job description (no login)
3. **Analysis loader** — Premium loading experience while Gemini analyzes
4. **Results** — Single-scroll narrative: core diagnosis, 7-second scan, top 3 risks, one rewrite

## Tech stack

- Next.js 14 App Router · TypeScript · Tailwind · shadcn-style UI · Framer Motion
- Google Gemini (structured JSON)
- pdf-parse · mammoth
- In-memory session store (no DB)

## Getting started

```bash
npm install
cp .env.example .env.local
# Add GEMINI_API_KEY to .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy (Vercel)

1. Push to GitHub
2. Import in Vercel
3. Set `GEMINI_API_KEY` in project environment variables
4. Deploy

## Project structure

```
/app              — Routes (landing, analyze, loading, results)
/components       — Reusable UI (layout, motion, shadcn)
/features         — Feature modules (landing, analyze, results)
/lib              — Session store, validation
/services         — Resume parsing, Gemini
/prompts          — Recruiter-authentic AI prompts
/types            — Zod schemas & TypeScript types
/utils            — Constants, cn helper
```

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Yes | Google AI Studio API key |
| `GEMINI_MODEL` | No | Default: `gemini-2.5-flash` |

## License

Private — MVP startup product.
