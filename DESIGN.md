---
name: Aravind Jaimon Portfolio
description: A lead engineer's proof rendered as a running machine — near-black drafting sheet, brand red and acid lime, every section a live anime.js demo of real career data.
colors:
  ground: "hsl(0 0% 4%)"
  ink: "hsl(0 0% 98%)"
  plate: "hsl(0 0% 10%)"
  muted: "hsl(0 0% 14%)"
  hairline: "hsl(0 0% 18%)"
  brand-red: "hsl(350 75% 44%)"
  volt: "hsl(72 100% 50%)"
typography:
  display:
    fontFamily: "Bebas Neue, Impact, sans-serif"
    fontSize: "clamp(3.5rem, 13vw, 7.5rem)"
    fontWeight: 400
    lineHeight: 0.86
    letterSpacing: "0.025em"
  headline:
    fontFamily: "Bebas Neue, Impact, sans-serif"
    fontSize: "clamp(3.75rem, 8vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "0.025em"
  title:
    fontFamily: "Bebas Neue, Impact, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.025em"
  action:
    fontFamily: "Bebas Neue, Impact, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.15em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  lede:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.2em"
  dimension:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.25em"
rounded:
  none: "0px"
spacing:
  hairline: "1px"
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
  section: "80px"
  section-lg: "96px"
components:
  button-primary:
    backgroundColor: "{colors.volt}"
    textColor: "{colors.ground}"
    typography: "{typography.action}"
    rounded: "{rounded.none}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.volt}"
    textColor: "{colors.ground}"
  button-nav:
    backgroundColor: "{colors.volt}"
    textColor: "{colors.ground}"
    typography: "{typography.action}"
    rounded: "{rounded.none}"
    padding: "6px 16px"
  button-nav-hover:
    backgroundColor: "{colors.brand-red}"
    textColor: "{colors.ink}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.action}"
    rounded: "{rounded.none}"
    padding: "12px 24px"
  chip-skill:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "8px 12px"
  chip-tag:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "2px 8px"
  chip-tag-hover:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.brand-red}"
  chip-filter-selected:
    backgroundColor: "{colors.brand-red}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "6px 12px"
  input-search:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "12px 40px"
  card-cell:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "24px"
  title-block:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "16px"
---

# Design System: Aravind Jaimon Portfolio

## Overview

**Creative North Star: "The Drafting Sheet That Runs"**

The site is an engineer's proof rendered as a running machine. The ground is a near-black drafting sheet ruled by a 48px hairline grid; on it, every landing section is a live anime.js demonstration driven by the real career data in `content/`: a breathing 13×13 grid under the name, an ink line scrubbed by scroll through the story, skills chips loose on a table, a metric rail with a moving dot, a draggable business card. The interface recedes so the numbers and the motion do the persuading; copy is direct and numbers-first, and every call to action invites a conversation rather than asking for the job.

Two accents share the sheet and never blur together. Brand red is identity: the initial letters of the name, section-heading emphasis, the pixel mark, the hard offset shadow under anything you can press. Acid lime "volt" is the machine's live signal: scroll progress, the ink line, dimension callouts, dates, the primary button. White type does the reading. There are no gradients as decoration, no soft shadows, no rounded corners, and no photography except blog covers.

The build refuses the centred-hero-plus-uniform-card-grid portfolio. Layout is asymmetric and dense at the edges (dimension lines, a title-block strip in the footer, a rotating "since 2020" badge), open in the middle. Under reduced motion or without JavaScript the complete page is in the markup; motion only adds.

**Key Characteristics:**

- Near-black ground with a 48px hairline grid; 1px rules and `gap-px` cell tables instead of cards
- Bebas Neue for everything that shouts (display, headings, nav, buttons); Inter reads; JetBrains Mono measures (dates, dimensions, title blocks, metadata)
- Brand red for identity and pressure; volt for live signal and the primary action
- Hard 4–10px red offset shadows on interactive chips, raised CTAs and the business card; nothing else casts a shadow
- Zero radius everywhere, including icons, inputs and images
- Drafting-sheet grammar as the signature: title-block metadata strips, dimension-line callouts, revision numbers
- All motion through one hook (`useAnimeScope`), one ScrollObserver per animation, final state in the markup

## Colors

A two-accent, near-monochrome palette: white ink on a near-black sheet, red for identity, lime for signal.

### Primary

- **Brand Red** (`{colors.brand-red}`, the binding `#C41E3A`): the initial "A" and "J" of the name, the emphasised word in every section heading ("The **story**", "Systems **shipped**"), the pixel-mark cells, the hard offset shadow under chips, CTAs and the business card, the case-study glyph and metric values, the scrollbar thumb, and the hover state of the header button and blog tags. Also the selected state of blog filter chips.

### Secondary

- **Volt** (`{colors.volt}`, the pinned `#CCFF00`): the live-signal colour. Scroll-progress hairline, footer rule, story ink line, experience playhead and metric rail dot, dimension callouts, dates and periods, revision numbers in title blocks, the primary button fill, selection highlight, caret and focus ring. Hover colour for icon links and secondary text links. Used on dark only; volt-on-white does not exist.

### Neutral

- **Ground** (`{colors.ground}`): page and section background; also the text colour on volt surfaces.
- **Ink** (`{colors.ink}`): headings, primary text, button text on red. Body copy uses ink at 70% (ledes, paragraphs), 75% (story and highlight prose), 60% (metadata, labels, captions) and 50% only for icons and decorative marks.
- **Plate** (`{colors.plate}`): the one raised surface. Blog cards, code blocks, inline code, blockquotes, the search field.
- **Muted** (`{colors.muted}`): control chrome inside prose (copy button on code blocks).
- **Hairline** (`{colors.hairline}`): every rule, border, divider, grid line and cell gap. At 60% for the background grid and ledger rows, at 40% for the hero cells.

### Named Rules

**The Two Signals Rule.** Red means identity and pressure (initials, heading emphasis, offset shadows, hover-to-red). Volt means the machine is live (progress, ink, playheads, callouts, dates, the primary action). A single element never carries both except the pressed CTA (volt face, red shadow) and the badge rings (alternating).

**The Literal Colour Rule.** Colours handed to anime.js are literal hex (`#C41E3A`, `#CCFF00`, `#2D2D2D`); classes use tokens only (`text-primary`, `text-volt`, `border-border`). No hex in class names.

**The Legible Ink Rule.** Readable text on the ground sits at ink/60 or higher; ink/50 and below is reserved for icons, hairline markers and decorative wordmarks.

## Typography

**Display Font:** Bebas Neue (with Impact, sans-serif)
**Body Font:** Inter (with system-ui, sans-serif)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, monospace)

**Character:** A condensed poster face that only comes in one weight, set tight on the leading and always tracked open, against a quiet neutral grotesk for reading and a monospace that reads like dimension text on a drawing. Emphasis is never bold: it is a red word inside a white Bebas heading.

### Hierarchy

- **Display** (400, `clamp(3.5rem, 13vw, 7.5rem)`, 0.86): the hero name, split into characters that rise on load, anchored bottom-left across two-thirds width. The contact shout scales it up to `clamp(4rem, 14vw, 12rem)` at 0.85; the footer wordmark runs it as a 1px outline at 17vw / 13rem.
- **Headline** (400, 3.75rem → 6rem at md, 0.9): every section `h2` and page `h1` (blog index, case study). One word in brand red. Max width 48rem.
- **Title** (400, 1.875rem–2.25rem, 1): role titles, milestone phases (up to 3.75rem), metric values (tabular-nums), card titles, the business-card name.
- **Action** (400, 1.125rem–1.25rem, tracking 0.15em): nav links and every button. Nav sits at 1.125rem and ink/70; buttons at 1.25rem.
- **Lede** (400, 1.125rem → 1.25rem, 1.625, ink/70): the paragraph under each headline, max width 42–48rem.
- **Body** (400, 1rem, 1.625, ink/70–75): highlights, descriptions, prose. Chips and stack tags are body-size Inter at 0.75–0.875rem.
- **Label** (400, 0.75rem, uppercase, tracking 0.15–0.2em, JetBrains Mono): dates, periods, industry, metric labels, title-block entries, footer meta, table headers.
- **Dimension** (400, 0.6875rem, uppercase, tracking 0.25em, volt): the dimension-line callouts on the hero and metrics grid, the scroll cue.

### Named Rules

**The Three Voices Rule.** Bebas Neue shouts (display, headings, nav, buttons, metric values). Inter reads (ledes, body, chips). JetBrains Mono measures (dates, dimensions, title blocks, captions, code). A string set in mono is data; if it is prose, it is Inter.

**The Red Word Rule.** Every section headline carries exactly one word in brand red. Headings are never bold, never all-lowercase, never split across colours more than once.

**The Split Heading Rule.** Display and page-level headings may split into characters (`splitText` chars, `y: 110% → 0`, `stagger(22–28)`, `out(4)`); body reveals split into words. The container is `overflow-hidden` so the rise is clipped, and the plain text is what renders without JS.

## Layout

The page is a single column of full-bleed sections on a 48px hairline grid (`.bg-grid`, `--grid-cell: 48px`), each capped by a 80rem container (`max-w-7xl`) with 16px gutters, 24px from the `sm` breakpoint. Blog and case-study pages narrow the container (72rem index, 64rem case-study header, 48rem prose).

Vertical rhythm is section padding of 80px, 96px from `md` (`py-20 md:py-24`); showcase sections (metrics, contact) take 96px / 128px. Headline-to-content gap is 48–64px. Sections that need scroll anchoring carry `scroll-mt-20` for the 80px fixed header (64px on mobile).

Tables of data are built from the grid itself: a 1px `gap-px` on a hairline background with ground-coloured cells, never from card padding and shadows (project mosaic, metric strips, case-study metrics, footer title block). The project mosaic is a six-column grid with items spanning 2, 3 or 4 columns by tier; metrics are 2×4 on desktop, 4×2 on mobile with the rail redrawn vertically.

Breakpoints are Tailwind defaults; the motion hook exposes `mobile` at `max-width: 767px` and switches rails from horizontal to vertical there. Dimension callouts appear from `md` (top) and `lg` (right); the header title block appears from `xl`.

## Elevation & Depth

Flat by default. Depth is drawn, not lit: 1px hairlines, a ruled grid ground, and translucent ground plates (`bg-background/70–90` with a 2px blur) laid over the grid to keep type legible. The only shadows are hard, unblurred, brand-red offsets that read as a second sheet stacked beneath a pressable object; they shrink as the object is pressed down into the sheet. Soft shadows, glows and gradients-as-depth are not used; the one gradient in the system is the hero's radial ground plate that guarantees near-black under the name.

### Shadow Vocabulary

- **Raised CTA** (`box-shadow: 6px 6px 0 0 hsl(var(--primary))`): the hero and contact primary buttons. On hover the button translates 3px right/down and the shadow becomes `3px 3px 0 0`; transition 150ms on transform and box-shadow.
- **Chip** (`box-shadow: 4px 4px 0 0 hsl(var(--primary))`): draggable skill chips on the skills table.
- **Object** (`box-shadow: 10px 10px 0 0 hsl(var(--primary))`): the draggable business card in contact.

### Named Rules

**The Second Sheet Rule.** A hard red offset shadow means "you can pick this up": it belongs only to pressable or draggable objects (raised CTAs, skill chips, the business card). Static cells, cards, images and text never cast it.

**The Press Rule.** Hover on a raised object moves it toward its shadow by half the offset and halves the shadow; it never lifts, scales or glows.

## Shapes

Zero radius, everywhere: `--radius: 0`, so even shadcn's `rounded-md` resolves to a square corner. Borders are 1px hairlines; emphasis borders step to ink/70–80 (chips, business card) rather than getting thicker. Form language is the drafting sheet: rectangles, 1px rules, small filled squares as markers (8–12px, red or volt), a 45°-rotated volt square for timeline markers, nested rotating square rings for the badge, and the 5×5 pixel monogram. Case-study glyphs are closed polygons in a 100×100 box that morph on hover. Images are clipped square with a hairline border. Icons are Lucide SVG at 14–24px with `currentColor`; there are no icon fonts.

## Components

### Buttons

Bebas Neue, tracked 0.15em, square, no icon unless it is an outward arrow.

- **Shape:** square (0px)
- **Primary (raised):** volt fill, ground text, 12px 24px padding, red 6px offset shadow. Used for the one action per view that starts a conversation ("Start a conversation", "Email me"). Hover: press 3px toward the shadow.
- **Primary (nav / quiet):** volt fill, ground text, no shadow, 6px 16px in the header and 12px 24px on the case-study close. Hover: fill turns brand red with ink text, 200ms.
- **Secondary:** transparent, hairline border, ink/70–80 text, same padding. Hover: border and text go to full ink. A mono variant (Inter/JetBrains Mono at 0.875rem) appears beside the contact CTA for the copy-email action.
- **Inverse:** ink fill, ground text, hover to volt. Used once (skills "shuffle" control); provisional.
- **Focus:** the global 2px volt outline, 2px offset.

### Chips

- **Skill chip:** ground fill, ink/70 hairline border, Inter 0.875rem ink, 8px 12px, red 4px offset shadow; draggable within its arena and thrown on load.
- **Tag / stack chip:** plate fill (or transparent on the case-study stack list), hairline border, ink/60–70 text at 0.75–0.875rem, 2px 8px to 6px 12px. Hover on links: border and text go brand red. Selected filter: brand-red fill, ink text.
- **Difficulty badge:** hairline border with a 10% tint of volt (intermediate) or red (advanced) and matching text; the only tinted fills in the system.

### Cards / Containers

There are no floating cards. Content sits in cells of a hairline table (`gap-px` on `bg-border`, cells in ground) or inside a hairline-bordered panel on the grid.

- **Corner Style:** square
- **Background:** ground; plate for blog cards, code and quotes; ground at 70–90% with a 2px backdrop blur when laid over the grid
- **Shadow Strategy:** none (see Elevation)
- **Border:** 1px hairline; project cells brighten to volt on focus-visible (2px inset ring)
- **Internal Padding:** 12–16px for compact cells, 24–32px for standard, 32–48px for closing panels
- **Hover:** blog cards shift border to red/50 and title to red; project cells slide the corner arrow up-right in volt.

### Inputs / Fields

- **Style:** plate fill, hairline border, JetBrains Mono 0.875rem, 12px vertical / 40px horizontal to clear a leading search icon, square
- **Focus:** border turns brand red; global volt outline applies to buttons and links, inputs suppress it in favour of the border shift
- **Placeholder:** ink/60

### Navigation

Fixed header, transparent over the hero and gaining a 90% ground fill, blur and bottom hairline after 50px of scroll. Left: the animated pixel mark (28px) plus "ARAVIND JAIMON" in Bebas 1.25–1.5rem tracked 0.05em. Centre (from `xl`): the title-block strip. Right: Bebas 1.125rem links at ink/70, 0.15em tracking, hover to ink; then the quiet volt "Get in touch" button. A 2px volt scroll-progress hairline runs along the top edge. Mobile: a hamburger opens a stacked list at Bebas 1.5rem with hairline separators and a full-width volt button.

### Title Block (signature)

A drafting-sheet metadata strip: a `<dl>` of hairline-divided cells in JetBrains Mono, uppercase, 0.625–0.75rem, 0.15–0.2em tracking. Terms at ink/60, values in ink, the revision (year) in volt. Compact inline in the header; a four-column table above the footer ("Drawn by / Role / Location / Revision"). Use it wherever a surface needs provenance.

### Dimension Callout (signature)

A measurement line: 1px ticks at each end, a 60% volt hairline, and the value plus label in mono dimension type centred on the line, horizontal along a top edge or vertical (`writing-mode: vertical-rl`) along a right edge. Text is a cleared metric read verbatim ("1M+ USERS SERVED"). Always `aria-hidden`; it annotates, it does not inform.

### Pixel Mark (signature)

A 5×5 grid of 4px squares with 1px gaps in a 24-unit box. The "A" pattern renders in brand red with off cells at 18% opacity and 55% scale. With `animate` it cycles A → J (red) → full grid (volt) → A on a 2.4s hold with a centre-out 18ms stagger. Static in the footer, favicon, apple icon and OG image.

### Motion (system-wide)

All motion is anime.js v4 through `useAnimeScope`: one `createScope` per component root with `mobile` and `reduceMotion` media queries, reverted on unmount, and `if (matches.reduceMotion) return;` first in every build. Markup is the final state. One `onScroll` observer per animation, built fresh from a factory. Easing vocabulary: `out(3)`/`out(4)` for entrances, `inOut(2–3)` for drawn lines, `spring({ bounce: 0.4–0.6 })` for objects returning home, `linear` for scrubbed and looping motion. Entrances are 500–900ms; loops 1.8–6s; hover presses 150ms; colour hovers 200ms. Reveals use `y` and `opacity` only; scale is reserved for markers and the breathing grid.

## Do's and Don'ts

### Do:

- **Do** set every heading, nav link and button in Bebas Neue with open tracking (0.025em display, 0.15em actions) and one brand-red word per section headline.
- **Do** reach for JetBrains Mono only for data: dates, periods, dimensions, metadata strips, captions, code.
- **Do** build tables of data from hairlines: `gap-px` on the hairline colour with ground-coloured cells, 1px rules, 48px grid ground.
- **Do** give pressable and draggable objects a hard brand-red offset shadow (4px chips, 6px CTAs, 10px objects) and press them toward it on hover.
- **Do** render the complete page in markup and add motion only inside `useAnimeScope` with a reduced-motion early return and one ScrollObserver per animation.
- **Do** phrase every call to action as an invitation ("Get in touch", "Start a conversation", "Email me") pointing at the mailto.
- **Do** keep readable text at ink/60 or higher; ink/50 is for icons and decoration.
- **Do** pass literal hex to anime.js and tokens to classes.

### Don't:

- **Don't** round any corner, including images, inputs, badges and icons; `--radius` is 0 and stays 0.
- **Don't** use soft shadows, glows, gradients as decoration or as elevation. The single permitted gradient is the hero's radial ground plate.
- **Don't** put volt on white or red on volt text; volt carries ground-coloured text, red carries ink.
- **Don't** set body prose in Bebas or in mono, and don't set data labels in Inter.
- **Don't** introduce bold weights; emphasis is size, tracking and the red word.
- **Don't** build floating cards with padding and shadow; use hairline cells or a hairline panel on the grid.
- **Don't** ship a shared ScrollObserver, a colour token string inside an anime call, or an animation without its reduced-motion return.
- **Don't** add headshots, logos, testimonials, a booking link or a kicker/eyebrow line above headings; none exist in the world.
