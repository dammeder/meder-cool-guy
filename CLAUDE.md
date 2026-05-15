# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev       # start dev server (Turbopack)
npm run build     # production build
npm run lint      # ESLint

# Database
npx prisma migrate dev --name <name>   # create and apply a migration
npx prisma generate                    # regenerate client after schema change (run before seed if schema changed)
npx prisma db seed                     # seed posts (idempotent — skips if rows exist)
npx prisma studio                      # GUI for the DB
```

No test suite exists yet.

## Architecture

**Stack:** Next.js 16.2.4, React 19, TypeScript, PostgreSQL (local db: `mcg`), Prisma 7 with `@prisma/adapter-pg`. No Tailwind — all styles in `app/globals.css` via CSS custom properties.

**Data split — static vs DB:**
- `lib/data.ts` holds `ME`, `LINKS`, and `PROJECTS` as static arrays. Projects are not in the database.
- The DB has a single `Post` table: `id, date, time, body, hasCode, codeSnippet, projectSlug, createdAt`. `projectSlug` is a plain string foreign key into the static `PROJECTS` array — there's no DB-level join.
- When adding a real `Project` model to the DB, `lib/data.ts` and all components reading `PROJECTS` will need updating simultaneously.

**Routing:**
- `/` and `/journal` — pull posts from DB via `db.post.findMany`
- `/projects` — renders static `PROJECTS` from `lib/data.ts`
- `/projects/[slug]` — looks up project in static data, then queries posts by `projectSlug`
- `/admin` — compose form, creates posts via server action (`app/admin/actions.ts`)
- `/admin/login` — password form, sets `admin_session` cookie

**Auth middleware:** `proxy.ts` at the root contains the middleware logic that guards `/admin/*`. It is currently misnamed — Next.js only picks up `middleware.ts`. Rename it to `middleware.ts` to activate the session cookie check.

**Theme system:** CSS vars on `[data-theme="dark|light"]` set in `app/layout.tsx`. `--glow-strength` is `6px` dark / `0px` light, so all `box-shadow` glow effects disappear in light mode automatically. The no-flash inline script reads `localStorage.theme` before hydration.

**Next.js 16 gotchas:**
- Dynamic route `params` are `Promise<{ slug: string }>` — must be `await`ed in page components.
- Read `node_modules/next/dist/docs/` for anything that differs from standard App Router docs.

**Prisma client location:** generated into `lib/generated/prisma/` (not the default `node_modules/.prisma`). Import from `@/lib/generated/prisma/client`, not `@prisma/client`.

**Environment:** `.env.local` holds `DATABASE_URL`, `ADMIN_PASSWORD`, `ADMIN_TOKEN`. The seed file uses `dotenv/config` to load `.env` — make sure `DATABASE_URL` is set before running seed.
