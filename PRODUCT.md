# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: hiring managers, CTOs, and VPs of Engineering evaluating Aravind Jaimon for a lead / staff-level software engineering role. They arrive from LinkedIn, GitHub, a referral, or a résumé link, usually on desktop during a screening pass, and decide within roughly thirty seconds whether to open a conversation.

Secondary (confirmed but not the design target): engineers reading the blog for architecture and tooling write-ups.

## Product Purpose

A personal portfolio site (aravindjaimon.com) that proves senior engineering judgment and range — architecture, performance, team building — through real shipped systems, and converts that proof into an email conversation. Success is a qualified hiring conversation started by email.

## Positioning

First engineering hire who grew RaftLabs from one engineer to a 30+ engineer team while personally shipping production systems at scale: 1M+ users served, 10K events/minute processed, 97% sync-time reduction, 50+ systems built, 10+ engineers mentored. The combination of hands-on high-scale delivery and having built an engineering organisation from zero is the claim a neighbouring senior-engineer portfolio cannot truthfully copy.

## Operating Context

- Site is the canonical public profile; LinkedIn and GitHub point to it.
- Content is authored in the repo: `content/data/*.yaml` (profile, milestones, skills, metrics, experience, education) and `content/projects/*.mdx` (six case studies), `content/blog/*.mdx` (articles). Built by velite at `pnpm build`.
- Deployed on Vercel; Next.js 16 App Router, React 19, Tailwind CSS 4.
- Newsletter API (`/api/newsletter`), RSS feed, OpenAPI description and RFC 9727 API catalog already exist and must keep working.

## Capabilities and Constraints

- Routes: `/` (landing), `/blog`, `/blog/[slug]`, `/blog/tag/[tag]`, `/projects/[slug]`, `/feed.xml`, `/api/*`.
- Primary action everywhere: **email dev@aravindjaimon.com** (mailto). No booking link exists; do not invent one.
- Client companies behind the case studies are not named; industries are (iGaming, AI/SaaS, Retail, Enterprise SaaS, Gaming, EdTech). Keep them unnamed.
- Animation engine is anime.js v4; all motion is scoped per component and must respect `prefers-reduced-motion` (final state rendered without JS).
- Must remain statically buildable (`generateStaticParams` for posts, tags, projects).

## Brand Commitments

- Name: Aravind Jaimon. Wordmark treatment: the initial letters "A" and "J" of the name carry the brand red.
- Brand red `#C41E3A` is binding. User-pinned secondary accent for motion: acid lime `#CCFF00`.
- Typefaces are binding: Bebas Neue (display), Inter (body), JetBrains Mono (labels/code).
- Sharp corners (`--radius: 0`) and a dark ground are binding.
- Voice: direct, numbers-first, no hype adjectives; copy is already written in the content files. The proof does the persuading: calls to action invite a conversation ("Get in touch", "Start a conversation") and never ask for the job.

## Evidence on Hand

- Six case studies with metrics, stack, key decisions, results and lessons: `content/projects/*.mdx`. All figures are cleared to publish verbatim (confirmed 2026-09-06).
- Impact metrics, milestones, experience, education, certifications, achievements: `content/data/*.yaml`.
- One published blog post with cover image: `content/blog/building-raftstack-cli.mdx`, `public/images/blog/raftstack-cover.png`.
- No headshot, no client logos, no testimonials, no employer logos exist. Do not fabricate any of these.

## Product Principles

1. Prove with shipped systems and numbers; never claim with adjectives.
2. Every visitor path ends at the email action within one scroll of wherever they are.
3. Motion demonstrates engineering craft; it never hides content or blocks reading.
4. One source of truth for content (velite); the UI renders, it does not author.
5. Works without JavaScript and under reduced motion — the complete page is in the markup.
