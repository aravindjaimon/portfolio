# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project Overview

Personal portfolio for Aravind Jaimon (aravindjaimon.com): a Next.js 16 App Router site with a kinetic, neo-brutalist landing page where every section is a live anime.js demo driven by real career data, plus an MDX blog and MDX case studies. Product truth lives in `PRODUCT.md`; the visual system in `DESIGN.md`.

## Tech Stack

- Next.js 16 (App Router, React 19, TypeScript 5 strict), pnpm
- Tailwind CSS v4 (CSS-first config in `app/globals.css`), shadcn/ui primitives in `components/ui`
- **anime.js v4** for all motion (no GSAP, no framer-motion)
- **velite** for content (YAML + MDX → `.velite/`, aliased as `#site/content`)
- Fonts via `next/font/google`: Bebas Neue (display), Inter (body), JetBrains Mono (data/labels)

## Commands

```bash
pnpm dev            # velite --clean && next dev
pnpm build          # velite --clean && next build
pnpm start
pnpm lint           # eslint
pnpm format         # prettier
```

## Structure

- `app/` — routes: `/` (landing), `/blog`, `/blog/[slug]`, `/blog/tag/[tag]`, `/projects/[slug]`, `feed.xml`, `sitemap.ts`, `api/*`, `.well-known/api-catalog`. `layout.tsx` mounts `Header` and `Footer` for every route.
- `components/sections/` — landing sections (`hero`, `ticker`, `story`, `skills`, `projects`, `metrics`, `experience`, `education`, `contact`) plus shared `header`/`footer`; `project-glyphs.tsx` holds the morphable SVG glyphs.
- `components/chrome/` — the pixel-grid monogram (`mark.tsx`, client; `mark-patterns.ts`, plain data shared with the icon/OG image routes).
- `components/motion/` — tiny shared motion pieces: `count-up.tsx`, `split-heading.tsx`.
- `components/blog/` — blog UI + `mdx-components.tsx` (also renders case-study MDX via `BlogContent`).
- `content/data/*.yaml` — profile, milestones, skills, metrics, experience, education (single-document collections).
- `content/projects/*.mdx` — six case studies (frontmatter = structured data, body = prose). `glyph` frontmatter must be a key of `PROJECT_GLYPHS`.
- `content/blog/*.mdx` — articles.
- `velite.config.ts` — all collection schemas. `lib/data.ts` is a thin adapter re-exporting velite output under stable names (`personalInfo`, `projects`, `skillGroups`, …); `lib/blog.ts` wraps posts.
- `hooks/useAnimeScope.ts` — the one animation abstraction (see below).

## Conventions

### Motion (anime.js)

- Every animated component is `"use client"`, holds a `useRef` root and calls `useAnimeScope(root, ({ matches }) => { ... })`. The hook wraps `createScope` with media queries `mobile` and `reduceMotion` and reverts on unmount.
- Markup renders the **final** visual state; animations only add motion. `if (matches.reduceMotion) return;` at the top of every build callback.
- A `ScrollObserver` (`onScroll`) drives exactly one animation — create a fresh `onScroll(...)` per `animate`/`createTimeline` (use a small factory), never share one instance.
- Inside a scope, selector strings resolve **within the root**. Pass elements (e.g. `root.current`) when you need the root itself as a container/target.
- Colours passed to anime.js must be literal (`#CCFF00`), not `hsl(var(--volt))`.
- Text splitting: `splitText(el, { chars | words })`; keep HTML structure simple inside split targets.
- anime.js rejects empty target arrays — guard filtered lists before `animate`/`tl.add`.
- The anime engine pauses while `document.visibilityState` is `hidden`; verify motion in a visible tab (a background Chrome tab shows every animation frozen).
- Image routes (`app/icon.tsx`, `opengraph-image.tsx`, …) must not import client components; share plain data modules instead.

### Styling

- Tokens only: `bg-background`, `text-foreground/N`, `border-border`, `text-primary` (brand red `#C41E3A`), `text-volt` (acid lime `#CCFF00`). No hex literals in class names.
- Utilities in `globals.css`: `.bg-grid` (hairline grid ground), `.marquee`, `.outline-text`.
- `--radius: 0` — sharp corners everywhere. Dark theme only.
- Text on dark must keep ≥4.5:1 contrast: use `/60` or higher for readable text, `/50` only for icons/decoration.

### Voice

- The proof persuades; CTAs invite ("Get in touch", "Start a conversation", "Email me"). Never "hire me" or any ask for the job.

### Content

- Edit YAML/MDX under `content/`, never `lib/data.ts`. Add fields in `velite.config.ts` first; the adapter picks them up through types.
- Static generation must keep working (`generateStaticParams` for posts, tags, projects).

### Design process

- `PRODUCT.md` (product truth) and `DESIGN.md` (visual system) are the design authorities; `.impeccable/surfaces/` holds the surface brief with the direction contract for `/`.
