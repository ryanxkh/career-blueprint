# Career Blueprint Web App

## Project
Next.js 16 (App Router) web app for the Universal Career Development Coaching Prompt v3.7. Runs live coaching sessions via Claude API and renders the output as an interactive Career Blueprint.

## Tech Stack
- Next.js 16 (App Router, RSC, TypeScript)
- Tailwind CSS v4
- Vercel AI SDK (`ai` + `@ai-sdk/anthropic`)
- Auth.js v5 (NextAuth) — Credentials provider, JWT sessions
- Neon Postgres — via `@neondatabase/serverless` (HTTP driver)
- Drizzle ORM — schema in `lib/db/schema.ts`
- bcryptjs — password hashing

## Conventions
- **Server Components by default** — only add `"use client"` when needed (interactivity, hooks, browser APIs)
- **Compound components** for Chat and Blueprint — Provider + subcomponents, not monolithic components with boolean props
- **System prompt loaded server-side** — `system-prompt.md` read via `fs/promises` in Server Components, never in client bundle
- **TypeScript strict mode** — no `any`, no `as` casts unless unavoidable
- **Imports** — use `@/*` alias for all project imports

## File Organization
- `app/` — pages and API routes (App Router conventions)
- `components/` — compound component groups (chat/, blueprint/, ui/, landing/)
- `lib/` — pure logic (parser, serializer, detector, storage, types)
- `lib/db/` — database schema, client, and query functions
- `hooks/` — custom React hooks
- `auth.ts` — Auth.js v5 config (root level)
- `middleware.ts` — route protection for /coach and /blueprint

## Design Tokens
- Font: Instrument Serif (display headlines) / Geist Sans (body) / Geist Mono (code/data)
- Colors: Stone scale for neutrals (#fafaf8 bg, #1c1917 fg), Violet-600 (#7c3aed) for primary actions, Emerald for success states
- Background texture: Blueprint-style line grid (violet-tinted perpendicular lines via linear-gradient)
- Border radius: rounded-lg default, rounded-xl for cards, rounded-2xl for bento cards, rounded-full for CTAs
- Spacing: Tailwind defaults, 4px grid

## Key Architecture
- **Auth:** Email + password via Auth.js Credentials provider. JWT sessions (no DB session table). Routes /coach and /blueprint are protected by middleware.
- **Database:** Neon Postgres with Drizzle ORM. Tables: users, coaching_sessions, session_messages, blueprints. Lazy connection via proxy to avoid build-time errors.
- **Chat:** Streaming via Vercel AI SDK `useChat` hook + `/api/chat`. Messages persisted to DB (user before Claude call, assistant in onFinish). Session ID passed in request body.
- **Sessions:** Users can have multiple coaching sessions. Session list at /coach, individual session at /coach?session=<id>. Auto-titled from first user message.
- **Blueprint:** Detection happens client-side after each assistant message completes. Saved to DB via API + localStorage as fallback. Blueprint viewer loads data server-side from DB.
- **Import:** paste markdown → parse → save to DB (authenticated) or localStorage (unauthenticated) → redirect to /blueprint.

## Env Vars
- `DATABASE_URL` — Neon Postgres connection string
- `AUTH_SECRET` — Auth.js secret (generate via `npx auth secret`)
- `ANTHROPIC_API_KEY` — Claude API key

## Database Migrations
```bash
npx drizzle-kit generate  # Generate migration SQL
npx drizzle-kit migrate   # Apply migrations
```
