---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets:
  [
    "app/layout.tsx",
    "app/blog/page.tsx",
    "app/blog/[slug]/page.tsx",
    "app/projects/[slug]/page.tsx",
  ]
---

# Surface brief — `/` (landing) and shared chrome

Scope: landing page plus header/footer shared by /blog and /projects. Visitor mode: Experience (the work leads; the interface recedes).
Audience: hiring managers / CTOs screening a lead-level engineer in ~30s. Action: email dev@aravindjaimon.com. Proof: six case studies, eight impact metrics, 1→30+ team story (all cleared verbatim). Constraints: brand red, acid lime, Bebas/Inter/JetBrains Mono, zero radius, dark ground all pinned by the user; reduced-motion must show the complete page.

## Direction contract

THESIS: An engineer's proof rendered as a running machine — every section is a live anime.js demo driven by real career data. Refuses the centred hero + uniform card grid portfolio.

OWN-WORLD: Near-black ground ruled by a 48px hairline grid; brand red #C41E3A and acid lime #CCFF00 on white type. Bebas Neue for display, headings, nav and buttons; Inter body; JetBrains Mono only for data, dates, dimensions and title blocks. Zero radius, 1px rules, hard 4px offset shadows on interactive chips. Raise (drafting-sheet donor): title-block metadata strip in the footer and dimension-line callouts annotating the hero grid.

STORY: Visitor sees systems moving with real numbers, believes this engineer builds and scales, emails.

FIRST VIEWPORT: Full-bleed breathing 13×13 grid. Name split into characters, ~9rem, anchored bottom-left across two-thirds width. Right column: title, subtitle, tagline, volt primary action "Start a conversation" and socials; the header mark is a 5×5 pixel monogram cycling A → J → grid. Rotating-squares badge "SINCE 2020" top-right. Dimension callouts along grid edges read the cleared metric labels verbatim: "1M+ USERS SERVED" (top) and "1 → 30+ TEAM GROWTH" (right).

FORM: Kinetic hairline grid / anime.js playground — candidate 1 of 7 on the grounded list, user-pinned. Roll (degraded, key 00b849f6) assigned candidate 6, drafting sheet; its title-block and dimension grammar is donated as the raise above.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Unresolved

None. Blog and case-study pages inherit this world; see plan for their section list.
