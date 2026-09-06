# Design spec — maximalist anime.js rebuild of aravindjaimon.com

Approved 2026-09-06. Originates from the planning session; implementation notes in CLAUDE.md and DESIGN.md.

## Context

The current site is a competent but conventional dark portfolio: 10 `"use client"` sections in `components/sections/`, GSAP ScrollTrigger fade-ins (never cleaned up, `registerPlugin` repeated in 6 files), all content hard-coded in `lib/data.ts` (739 lines), a velite/MDX blog with one post, and `/projects/[slug]` case studies. The user wants it rebuilt as a **senior-engineer landing page "like never seen before"**: dark neo-brutalist / kinetic maximalism where the anime.js homepage showcase animations are re-skinned with the user's own data — every section is a live demo of one anime.js feature.

Decisions already made with the user (do not re-open):

| Decision     | Choice                                                                                                                                                                                      |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Direction    | Dark neo-brutalist / kinetic. Near-black ground, hairline grid, huge Bebas display type, sharp corners (`--radius: 0`), motion everywhere.                                                  |
| Scope        | **Everything**: landing + header/footer + `/blog`, `/blog/[slug]`, `/blog/tag/[tag]`, `/projects/[slug]`.                                                                                   |
| Engine       | **anime.js v4** (`animejs`), remove `gsap`.                                                                                                                                                 |
| Identity     | Keep brand red `#C41E3A` (`--primary`) + Bebas Neue / Inter / JetBrains Mono. Add one electric secondary: **acid lime `#CCFF00` → `--volt`**.                                               |
| Content      | **Migrate `lib/data.ts` to velite** (`content/data/*.yaml` + `content/projects/*.mdx`). `lib/data.ts` stays as a thin adapter re-exporting the same names. Project bodies become MDX prose. |
| Architecture | "Every section IS a live demo" — one anime.js feature per section (table below).                                                                                                            |
| Process      | **Full Impeccable harness**: PRODUCT.md, direction contract, detector, finish-reviewer agent, documenter → DESIGN.md. Direction is user-pinned; the pin beats impeccable's roll.            |

Ponytail applies: reuse shadcn/ui primitives already in `components/ui`, CSS where CSS suffices (marquee, grid ground), one shared hook instead of per-section animation plumbing, no abstractions beyond what the 11 sections actually share.

---

## Phase 0 — Foundation

### 0.1 Dependencies

- `pnpm add animejs` ; `pnpm remove gsap`.
- Delete `hooks/useHeroAnimation.ts`, `hooks/useTimelineAnimation.ts` (GSAP-only, replaced).
- Leave `next-themes` (unused, unrelated). Leave `tw-animate-css`.

### 0.2 `hooks/useAnimeScope.ts` (the only animation abstraction)

```ts
"use client";
import { createScope, type Scope } from "animejs";
export function useAnimeScope(
  root: RefObject<HTMLElement | null>,
  build: (scope: Scope) => void | (() => void),
  deps: unknown[] = []
) {
  useEffect(() => {
    const scope = createScope({
      root,
      mediaQueries: {
        mobile: "(max-width: 767px)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
    }).add(build);
    return () => scope.revert();
  }, deps);
}
```

- Every section: `const ref = useRef<HTMLElement>(null); useAnimeScope(ref, (self) => { if (self.matches.reduceMotion) return; ... })`.
- Reduced-motion rule: sections must render their **final** state in plain CSS/JSX; the scope only adds motion. No `opacity:0` in markup that JS must undo.
- Add to `hooks/index.ts`.

### 0.3 Tokens — `app/globals.css`

- `:root`: add `--volt: 72 100% 50%` (#CCFF00), `--volt-foreground: 0 0% 4%`; map in `@theme inline` as `--color-volt`, `--color-volt-foreground`.
- Utilities (plain CSS in `@layer utilities`):
  - `.bg-grid` — repeating hairline grid (`linear-gradient` × 2, 48px cell, `hsl(var(--border))`), the neo-brutalist ground.
  - `.marquee` + `@keyframes marquee` — infinite horizontal scroll; `prefers-reduced-motion` → `animation: none`.
  - `.outline-text` — `-webkit-text-stroke: 1px currentColor; color: transparent` for footer wordmark.
- Replace scattered hex literals (`#0A0A0A`, `#1A1A1A`, `#2D2D2D`, `#C41E3A`) with token classes as each file is touched. No global regex pass — only files this plan rewrites.

### 0.4 Content → velite (`velite.config.ts`)

New collections (all under `content/`):

| Collection   | Source                       | Schema notes                                                                                                                                                                                                                                                                                                         |
| ------------ | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `profile`    | `data/profile.yaml` (single) | mirrors `PersonalInfo`                                                                                                                                                                                                                                                                                               |
| `milestones` | `data/milestones.yaml`       | array of `StoryMilestone`                                                                                                                                                                                                                                                                                            |
| `skills`     | `data/skills.yaml`           | `{ group, label, items[] }[]` (flattened from the `Skills` object; `label` = display name e.g. "System Design")                                                                                                                                                                                                      |
| `metrics`    | `data/metrics.yaml`          | `ImpactMetric[]`                                                                                                                                                                                                                                                                                                     |
| `experience` | `data/experience.yaml`       | `Experience[]`                                                                                                                                                                                                                                                                                                       |
| `education`  | `data/education.yaml`        | `{ education[], certifications[], achievements[] }`                                                                                                                                                                                                                                                                  |
| `projects`   | `projects/*.mdx`             | frontmatter: `id, title, subtitle, industry, role, challenge, solution[], metrics[], stack[], timeline?, teamSize?, glyph` (glyph = key into an SVG path map for the morph demo); body MDX = overview / problem / approach / decisions / results / lessons as headed prose. `slug` derived from filename like posts. |

- velite `s.object`/`s.array` for YAML; `s.mdx()` for projects (reuse the existing `rehypePrettyCode` config).
- **`lib/data.ts` becomes an adapter**: re-export `personalInfo`, `storyMilestones`, `skills`, `projects`, `impactMetrics`, `experience`, `education`, `certifications`, `achievements`, `getProjectBySlug`, `getAllProjectSlugs` from `#site/content` (velite alias, same as `lib/blog.ts` uses). Keep the exported interfaces as `type X = (typeof xs)[number]`. Consumers that survive unchanged: `app/sitemap.ts`, `app/projects/[slug]/page.tsx` (until Phase 3).
- Migration is mechanical: copy the literals out of `lib/data.ts` into YAML/MDX. Verify with a one-off script in the scratchpad that `JSON.stringify` of old vs new adapter output matches for every export (delete script after).

### 0.5 Verify Phase 0

`pnpm build` green (velite runs first), `pnpm lint` green, landing renders exactly as before (GSAP gone → old sections have no motion; acceptable, they're replaced in Phase 2).

---

## Phase 1 — Shared chrome (moves into `app/layout.tsx`)

- `components/sections/header.tsx` → rewrite. Keep nav data + mobile menu + `useScrollPosition`. New:
  - **Morphing mark**: inline `<svg>` with one `<path>`; `svg.morphTo` cycles A → J → square → A on a looping `createTimeline` (paths authored as 3 same-vertex-count polygons in `components/chrome/mark-paths.ts`).
  - **Scroll progress hairline**: 2px top bar, `animate(bar, { scaleX: [0,1], ease:'linear', autoplay: onScroll({ target: document.body, sync: true }) })`.
  - Nav link hover: `animate` underline `scaleX` from left (volt).
  - Works on all routes: section anchors become `/#story` etc. (Next `Link`), `scrollToSection` only when already on `/`.
- `components/sections/footer.tsx` → rewrite: `.bg-grid` ground, `.outline-text` giant name, `createDrawable` top rule drawn on enter (`onScroll`), socials, year.
- Move `<Header/>`/`<Footer/>` into `app/layout.tsx`; remove them from `app/page.tsx`, `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, `app/projects/[slug]/page.tsx` (delete their ad-hoc "Back to…" top bars; header covers navigation).
- `app/page.tsx` drops `"use client"` (sections carry their own directive) so it becomes a server component reading velite data and passing props down.

---

## Phase 2 — Landing sections (build in scroll order; hero first)

All in `components/sections/`, each `"use client"`, each `useAnimeScope`. Data passed as props from `app/page.tsx`.

| #   | File                                         | anime.js feature                           | Spec                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| --- | -------------------------------------------- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `hero.tsx`                                   | **stagger grid** + `text.split`            | Full viewport, `.bg-grid`. Behind: 13×13 (`self.matches.mobile` → 9×9) hairline squares; `animate('.cell', { scale:[1,.6,1], opacity:[.25,1,.25], delay: stagger(60,{grid:[n,n],from:'center'}), loop:true, ease:'inOutSine' })`. `pointermove` → nearest cell index → one-shot `animate` with `stagger(40,{grid,from:index})` ripple in volt (throttle to 1 per 120ms). Foreground: `text.split(h1,{chars:true})` → chars spring in from `y:120` with `stagger(30)`; first "A" and "J" red as today. Title/subtitle/tagline fade-up in a `createTimeline`. Badge: 4 nested outlined squares rotating at different speeds (anime home logo) labelled "SINCE 2020". CTA `Start a conversation` (volt fill, black text) + socials. Scroll cue: `createDrawable` vertical line loops. |
| 2   | `ticker.tsx`                                 | CSS marquee                                | `impactMetrics` repeated twice, `.marquee`, red/volt alternating separators. No JS.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 3   | `story.tsx` (replaces `about.tsx`, `#story`) | **SVG line drawing**                       | One `<path>` snakes down the left/center of the section through 4 milestone nodes. `animate(svg.createDrawable(path), { draw:'0 1', ease:'linear', autoplay: onScroll({ container: window, target: section, enter:'bottom top', leave:'top bottom', sync: true }) })`. Each milestone: `onScroll` enter → node `scale` spring pop + `text.split(words)` reveal of phase/date/description.                                                                                                                                                                                                                                                                                                                                                                                          |
| 4   | `skills.tsx` (`#skills`)                     | **draggable + spring**                     | Arena `div` (`.bg-grid`, `min-h-[70vh]`, `overflow:hidden`). Every skill item = chip (`border`, mono). `createDraggable('.chip', { container: arena, releaseEase: spring({stiffness:120,damping:12}), releaseContainerFriction:.8 })`. Initial layout: grouped columns with group labels; `SHUFFLE` button → `animate('.chip',{ x: ()=>utils.random(...), y: ()=>utils.random(...), rotate: ()=>utils.random(-12,12), delay: stagger(15,{from:'random'}), ease: spring() })`; `RESET` → back to `x:0,y:0,rotate:0`. Reduced-motion / touch-scroll conflict: on `mobile`, no draggable — static grouped grid (chips still rendered).                                                                                                                                                |
| 5   | `projects.tsx` (`#work`)                     | **SVG morph + timeline**                   | 6 cards from velite `projects`, 2-col (1-col mobile). Each card header has a `<svg><path/></svg>` glyph; `mouseenter` → `animate(path, { d: svg.morphTo(altPath), ease:'inOut(3)', duration:600 })`, leave → morph back. Glyph paths per `industry` in `components/sections/project-glyphs.ts` (6 pairs, equal vertex count, square-ish brutalist shapes). Card `onScroll` enter → `createTimeline` : border draws (`createDrawable` on card outline `<rect>`), title chars stagger, metric numbers count up (`animate(obj,{ v:[0,target], modifier: utils.round(0), onUpdate: write textContent })`; non-numeric values like "1 → 30+" just fade). Whole card is a `Link` to `/projects/[slug]`. Delete the in-page "selected project detail" behaviour (route exists).           |
| 6   | `metrics.tsx`                                | **motion path**                            | `<svg>` with a zig-zag `<path>` passing through 8 metric anchor points (2 rows × 4; 4×2 on mobile via separate path `d`). Volt dot: `animate(dot, { ...svg.createMotionPath(path), ease:'linear', autoplay: onScroll({ target: section, sync: true }) })`. Each metric: `onScroll` enter at its anchor → count-up as in projects.                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 7   | `experience.tsx` (`#experience`)             | **timeline scrubber**                      | Horizontal rail (vertical on mobile) with 5 roles. `const tl = createTimeline({ autoplay: onScroll({ target: section, enter:'bottom-=20% top', leave:'top+=20% bottom', sync: true }) })`; `tl.add(entry, {x:[-60,0],opacity:[0,1]}, i*400).add(highlights, {…}, '<+200')` etc.; `text.split(words)` for highlights. A volt playhead marker moves along the rail with `tl.progress`.                                                                                                                                                                                                                                                                                                                                                                                               |
| 8   | `education.tsx`                              | values stagger (quiet section)             | Cards for education/certs/achievements; on enter: `animate('.card',{ opacity:[0,1], y:[24,0], borderColor: stagger(['hsl(var(--primary))','hsl(var(--volt))']), delay: stagger(80) })`. Nothing loops.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 9   | `contact.tsx` (`#contact`)                   | **draggable business card** + scatter text | Business card (name/title/email/location, red edge) is `createDraggable(card,{ container: section, releaseEase: spring({bounce:.6}), snap: … })` that springs back to origin on release (`onRelease → animate(card,{x:0,y:0,ease:spring()})`). Headline "LET'S BUILD" via `text.split(chars)`; `mouseenter` on headline → chars scatter (`x/y random ±40, rotate ±20, stagger(10,{from:'random'})`), `mouseleave` → spring home. Copy-email button + mailto + socials (reuse `components/ui/button`).                                                                                                                                                                                                                                                                              |
| 10  | `footer.tsx`                                 | done in Phase 1                            | —                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

Header (Phase 1) is row 0.

Shared bits kept tiny: a `CountUp` helper (`components/motion/count-up.tsx`, ~25 lines, used by projects + metrics + case-study page); `project-glyphs.ts` path map. Nothing else shared beyond `useAnimeScope`.

Section rhythm: keep existing `py-24 md:py-32 px-6`, alternate `bg-background` / `.bg-grid` grounds, Bebas section titles now `text-6xl…9xl` and left-aligned with a numbered mono kicker (`01 / STORY`). Pace: hero (loud) → ticker → story (scrubbed) → skills (playful) → projects (dense) → metrics (kinetic) → experience (scrubbed) → education (quiet) → contact (playful) → footer (monumental).

Performance guardrails: all loops use `autoplay: onScroll({ enter, leave })` or pause on `leave` so off-screen sections don't tick; hero grid ≤ 169 elements; morph paths ≤ 12 vertices; test at DevTools 4× CPU throttle — anything under ~50fps gets simplified.

---

## Phase 3 — Blog + case study restyle

- `app/blog/page.tsx`: remove ad-hoc top bar; `.bg-grid` hero band with `text.split` title ("THE BLOG"); `BlogCard` grid enters via `stagger(60,{grid:[3,rows],from:'first'})` inside one `useAnimeScope` in a small client wrapper `components/blog/BlogGrid.tsx` (search/filter state moves in there; page becomes server component). Re-skin `BlogCard`, `BlogSearch`, `TagFilter`, `TagBadge`, `DifficultyBadge` to tokens (hex → `bg-background`/`border-border`/`text-primary`/`text-volt`). Hover: `animate(card,{ y:-6, ease: spring() })`.
- `app/blog/[slug]/page.tsx`: `BlogHeader` title split-text; in `BlogContent`, one `useAnimeScope` that draws a `createDrawable` rule under every `h2` on `onScroll` enter. `ReadingProgress` re-skinned volt. Mermaid/Giscus/TOC/code unchanged.
- `app/projects/[slug]/page.tsx`: read `project.content` (MDX) rendered with `components/blog/mdx-components.tsx`; header shows the static industry glyph; `MetricCard` uses `CountUp`; `SectionTitle` rule uses `createDrawable`. Delete the hand-built overview/decisions/results JSX (now MDX).
- `/blog/tag/[tag]` inherits.

---

## Phase 4 — Impeccable finish + docs

Impeccable base dir: `/Users/aj/.claude/plugins/cache/impeccable/impeccable/4.2.0/skills/impeccable/`.

1. **Before Phase 1 code** (do this at the start of implementation, after Phase 0): `scripts/impeccable context`, then `init` → `PRODUCT.md`; write surface brief for `/` with the six-block direction contract (THESIS / OWN-WORLD / STORY / FIRST VIEWPORT / FORM / FINISH) via `surface-brief write`. Run `concept-seed --scope direction --mode experience` as the skill requires, but the user-pinned direction wins any conflict; record the seed key in FORM. Load `reference/craft-floor.md` immediately before editing UI.
2. **After Phase 3**: `scripts/impeccable detect --json` on changed files → fix mechanical findings. Capture `.impeccable/review/desktop.png` (1440) and `mobile.png` (390) with entrance motion settled. Spawn `impeccable:impeccable-finish-reviewer` with request, contract, screenshots, findings. One fix batch + one verdict round (ceiling). Spawn `impeccable:impeccable-documenter` → `DESIGN.md`.
3. Update `CLAUDE.md`: real fonts (Inter/Bebas/JetBrains Mono), anime.js + `useAnimeScope` convention, velite collections (`content/data`, `content/projects`, `content/blog`), directory map incl. `components/sections|blog|ui|motion`, `hooks/`, `lib/`.
4. Copy this plan's design sections into `docs/superpowers/specs/2026-09-06-animejs-maximalist-rebuild-design.md` and commit (brainstorming spec requirement; couldn't write it in plan mode).

Commit per phase (conventional commits, as the repo uses `czg`/commitlint): `feat(foundation)…`, `feat(chrome)…`, `feat(landing)…`, `feat(blog)…`, `docs(design)…`.

---

## Verification (end-to-end)

1. `pnpm lint && pnpm build` green after every phase.
2. Phase 0 parity: scratchpad script diffs old `lib/data.ts` exports vs new adapter → identical JSON.
3. Browser (Claude-in-Chrome or Playwright MCP) on `pnpm dev`:
   - `/`, `/blog`, `/blog/building-raftstack-cli`, `/projects/rag-ai-assistant` at 1440 and 390 — screenshot each, zero console errors.
   - Interactions: hero ripple on pointer move; story path scrubs with scroll both directions; skills chips drag + spring, SHUFFLE/RESET; project glyph morphs on hover; metrics dot rides path + numbers count; experience playhead tracks scroll; contact card drags and springs home; header mark morphs; progress bar reaches 100% at page end.
   - Emulate `prefers-reduced-motion: reduce` → every section shows final state, no loops, chips static.
   - DevTools Performance with 4× CPU throttle while scrolling `/` → no long frames > 50ms sustained.
   - Navigate `/` → `/blog` → back: no anime.js errors (scopes reverted).
4. `impeccable detect` clean of mechanical findings; finish-reviewer verdict recorded in the final report at its actual scope.
