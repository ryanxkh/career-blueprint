# Career Blueprint Web App

## Project
Next.js 15 (App Router) web app for the Universal Career Development Coaching Prompt v3.5. Runs live coaching sessions via Claude API and renders the output as an interactive Career Blueprint.

## Tech Stack
- Next.js 15 (App Router, RSC, TypeScript)
- Tailwind CSS v4
- Vercel AI SDK (`ai` + `@ai-sdk/anthropic`)
- localStorage for persistence (no database)

## Conventions
- **Server Components by default** — only add `"use client"` when needed (interactivity, hooks, browser APIs)
- **Compound components** for Chat and Blueprint — Provider + subcomponents, not monolithic components with boolean props
- **System prompt loaded server-side** — `system-prompt.md` read via `fs/promises` in Server Components, never in client bundle
- **Versioned localStorage** — all keys prefixed `career-blueprint:v1:`
- **TypeScript strict mode** — no `any`, no `as` casts unless unavoidable
- **Imports** — use `@/*` alias for all project imports

## File Organization
- `app/` — pages and API routes (App Router conventions)
- `components/` — compound component groups (chat/, blueprint/, ui/, landing/)
- `lib/` — pure logic (parser, serializer, detector, storage, types)
- `hooks/` — custom React hooks

## Design Tokens
- Font: Geist Sans (body) / Geist Mono (code/data)
- Colors: Zinc scale for neutrals, Blue-600 for primary actions, Emerald for success states
- Border radius: rounded-lg default, rounded-xl for cards
- Spacing: Tailwind defaults, 4px grid

## Key Architecture
- Chat streaming via Vercel AI SDK `useChat` hook + `/api/chat` route handler
- Blueprint detection happens client-side after each assistant message completes
- Blueprint state persisted to localStorage, loaded on `/blueprint` page
- Import flow: paste markdown → parse → store → redirect to `/blueprint`
