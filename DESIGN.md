---
name: meder-cool-guy
description: A developer's live journal — the thinking behind the diff, written while it ships.
colors:
  void-violet: "#0d0a1f"
  panel-dark: "#15102e"
  panel-mid: "#1c1640"
  ghost-lavender: "#e8e3ff"
  muted-violet: "#7d76b3"
  electric-cyan: "#3df0ff"
  neon-magenta: "#ff4ec3"
  acid-lime: "#b6ff5c"
  terminal-yellow: "#ffe14e"
  code-void: "#0a0820"
  lavender-bg: "#e8e2f5"
  near-white: "#fefcff"
  deep-violet-ink: "#1a0d33"
typography:
  display:
    fontFamily: "Iowan Old Style, Georgia, Times New Roman, serif"
    fontSize: "clamp(28px, 5vw, 38px)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-1px"
  body:
    fontFamily: "JetBrains Mono, Courier New, ui-monospace, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "JetBrains Mono, Courier New, ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 400
    letterSpacing: "0.5px"
  panel-header:
    fontFamily: "JetBrains Mono, Courier New, ui-monospace, monospace"
    fontSize: "10px"
    fontWeight: 400
    letterSpacing: "1.2px"
rounded:
  none: "0px"
spacing:
  xs: "4px"
  sm: "10px"
  md: "14px"
  lg: "18px"
  xl: "24px"
components:
  post-card:
    backgroundColor: "{colors.panel-dark}"
    rounded: "{rounded.none}"
    padding: "14px"
  post-card-header-cyan:
    backgroundColor: "{colors.electric-cyan}"
    textColor: "{colors.void-violet}"
    rounded: "{rounded.none}"
    padding: "5px 12px"
  post-card-header-yellow:
    backgroundColor: "{colors.terminal-yellow}"
    textColor: "{colors.void-violet}"
    rounded: "{rounded.none}"
    padding: "5px 12px"
  panel:
    backgroundColor: "{colors.panel-dark}"
    rounded: "{rounded.none}"
    padding: "10px"
  theme-toggle:
    backgroundColor: "{colors.void-violet}"
    textColor: "{colors.ghost-lavender}"
    rounded: "{rounded.none}"
    padding: "3px 10px"
---

# Design System: meder-cool-guy

## 1. Overview

**Creative North Star: "The Late Night Room"**

This is a developer's bedroom at 2am — code on one screen, writing on the other, both happening at once. The visual language is a working terminal, not a showroom. Every page reads like something that is actively running: a process you walked in on mid-execution.

The system documents itself as it ships. The journal feeds the site; the site is the journal. The aesthetic rejects the polished portfolio, the retrospective case study, the "what I learned" post written three months after the fact. It rejects hero metrics, gradient text, and glassmorphism. The timestamped thinking trail is the anti-AI-slop proof of work — hard to fake, actually interesting to read.

In dark mode, the page lives inside the neon terminal. In light mode, the same layout inverts to lavender and deep violet — the same room in daylight. Same structure, different atmosphere.

**Key Characteristics:**
- Monospace-first: JetBrains Mono for all UI text, body, labels, code
- Hard-cornered: zero border-radius across every component
- Two-shadow system: print-offset shadows on cards, glow halos on accent elements (dark only)
- Dual-mode palette: near-black neon (dark default) / lavender (light) — layout unchanged
- Personality over polish: the author's voice, typos and all, is part of the design

## 2. Colors: The Void Violet Palette

A full neon palette against a near-black void in dark mode; a lavender inversion in light mode. Every neutral leans violet — nothing in this system is neutral in the gray sense.

### Primary
- **Electric Cyan** (`#3df0ff`): The dominant accent. Borders, active tabs, links, sidebar headings, "see all" prompts. In dark mode, this color defines the grid — every surface is outlined in it.

### Secondary
- **Neon Magenta** (`#ff4ec3`): Energy and presence. The hero cursor, the terminal prompt username (`meder@home:~$`), blinking marquee dots, sidebar `me.png` label. Where the site has a heartbeat, it's magenta.

### Tertiary
- **Acid Lime** (`#b6ff5c`): In-progress status indicator and the live tab. Signals active work without alarm.
- **Terminal Yellow** (`#ffe14e`): Every other post card header, secondary marquee items. Warm contrast against cyan's cool — the two-color alternating pattern is a LiveJournal callback.

### Neutral
- **Void Violet** (`#0d0a1f`): Page background. Not black — the violet undertone is load-bearing. Pure `#000` reads generic terminal; this reads intentional.
- **Panel Dark** (`#15102e`): All panel and card backgrounds.
- **Panel Mid** (`#1c1640`): Hover state for project cards, secondary surfaces.
- **Ghost Lavender** (`#e8e3ff`): Main body text in dark mode. Lavender-tinted, not pure white.
- **Muted Violet** (`#7d76b3`): Dim text — timestamps, metadata, secondary labels.
- **Code Void** (`#0a0820`): Code block backgrounds. Darker than the page — pulls code blocks deeper into the surface.
- **Lavender BG** (`#e8e2f5`): Light mode page background.
- **Near White** (`#fefcff`): Light mode panel background. Barely off-white with a violet whisper.
- **Deep Violet Ink** (`#1a0d33`): Light mode body text and borders.

### Named Rules
**The Violet Chromatic Rule.** Every neutral leans violet. `#0d0a1f` is not black, `#e8e3ff` is not white, `#7d76b3` is not gray. The hue family is consistent across all 13 tokens. Nothing is neutral in the gray sense — ever.

**The Glow-Only-in-Dark Rule.** All glow shadows are keyed to `--glow-strength: 6px` in dark mode and `0px` in light mode. Use `box-shadow: 0 0 var(--glow-strength) [color]` everywhere — in light mode, they silently disappear without a single conditional.

**The Four-Accent Rule.** Cyan, magenta, lime, yellow — the complete accent vocabulary. Each has one job. Do not add a fifth.

## 3. Typography

**Display Font:** Iowan Old Style, Georgia, Times New Roman, serif
**Body/UI Font:** JetBrains Mono, Courier New, ui-monospace, monospace

**Character:** Intentionally discordant pairing. Editorial bold italic serif for the hero — one use, maximum weight — then monospace for everything else. The hero title reads like a print byline; everything below reads like a terminal session. The collision between the two is deliberate.

### Hierarchy
- **Display** (700 italic, clamp(28px, 5vw, 38px), line-height 1.05, letter-spacing -1px): Hero title only. The only serif on the page. Used once.
- **Body** (400, 13px, line-height 1.65): Post content. Monospace slows reading intentionally — no optical shortcuts from humanist letterforms. `white-space: pre-wrap` preserves the author's line breaks and typos exactly.
- **Label** (400, 11px, letter-spacing 0.5px): Navigation tabs, marquee items, prompt lines, sidebar rows.
- **Panel Header** (400, 10px, letter-spacing 1.2px, uppercase): Panel title strips — the most compressed type on the page.

### Named Rules
**The Mono Floor Rule.** JetBrains Mono is the floor, not an accent. Used for body, labels, navigation, metadata, and code. Any sans-serif UI text breaks the terminal register. Prohibited.

**The Italic-Once Rule.** Iowan Old Style italic appears only in the hero title (structural) and on `standalone` post-filed tags (semantic). Do not use italic for decoration elsewhere.

## 4. Elevation

Two shadow systems — neither is traditional depth.

**Print Offset** (`box-shadow: 3px 3px 0 var(--border)`): Applied to post and project cards. Hard, flat, no blur — a zine or sticker border, not a floating surface. The shadow shares the border color, reading as a thick offset frame rather than atmospheric depth. Reinforces the flat/print register.

**Glow Halo** (`box-shadow: 0 0 var(--glow-strength) [accent-color]`): Applied to the hero cursor, status dots, and accent-linked elements in dark mode. Not a depth cue — it signals electricity and life. Silent in light mode (`--glow-strength: 0px`).

### Named Rules
**The Flat-By-Default Rule.** There are no ambient shadows, no diffuse drop shadows, no blur-radius elevation. Surfaces do not float. Shadows appear only as print-offset (structural, on cards) or glow halo (expressive, on accents). Nothing else.

**The No-New-Shadows Rule.** Do not introduce additional shadow values. The two systems cover every case. A new shadow type is a new design language — prohibited.

## 5. Components

### PostCard
The signature component. Alternating cyan/yellow solid-color header strip — even-indexed cards get cyan, odd get yellow. Full saturation block, not a tint or stripe. Print-offset shadow on the card, 1px border around the whole thing.
- **Shape:** Square-cornered (0px radius), 1px `--border` border, `3px 3px 0 var(--border)` offset shadow
- **Header:** Solid block, 5px 12px padding, 11px mono, date/time left — project/standalone right
- **Body:** 14px padding, 13px mono, `pre-wrap` (author's formatting is preserved intact)
- **Code Blocks:** Nested in body — `code-void` bg, `acid-lime` text, `border-soft` border, 11px mono

### Panel (Sidebar Widget)
Reusable sidebar widget. Four instances: `me.png`, `explorer`, `my projects`, `im currently`. Same shell, different body content.
- **Shape:** Square-cornered, 1px `electric-cyan` border (dark) / `deep-violet-ink` border (light)
- **Header:** `panel-mid` bg, 10px uppercase mono, letter-spacing 1.2px, `[─][□][×]` chrome on the right, colored label on the left (color varies by panel role)
- **Body:** `panel-dark` bg, 10px padding

### Tabs
Browser-tab metaphor. Active tab visually joins the content area below it via the border-bottom trick.
- **Active:** `panel-dark` bg, `electric-cyan` text, 1px border on three sides, `border-bottom: 1px solid var(--panel)` (disappears into content)
- **Inactive:** Transparent bg, `muted-violet` text, no border
- **Live tab:** Transparent, `acid-lime` text, right-aligned via flex spacer

### Marquee Bar
Scrolling status bar above everything. Blinking colored dots + rotating text items in all four accent colors. Theme toggle sits inline on the right.
- **Animation:** 42s linear infinite, content duplicated for seamless loop
- **Dots:** 7px circle, animated blink 1.1s steps(2) infinite, color matches adjacent text
- **Reduced motion:** Animation disabled; content becomes a static row

### Theme Toggle
Minimal button, inline inside the Marquee. No icon — text only. Inherits mono font from body.
- **Default:** `void-violet` bg, `ghost-lavender` text, 1px `electric-cyan` border, 3px 10px padding, 11px
- **Hover:** `panel-dark` bg

### Project Row (Sidebar)
Compact listing inside the Projects panel. Name + glowing status dot top row, year + post count below.
- **Status colors + glow:** Acid lime = in progress, Electric cyan = shipped, Neon magenta = abandoned
- **Glow:** `text-shadow: 0 0 4px [statusColor]` — synced to the status dot color

### Prompt Line
Terminal prompt decoration at the bottom of every content page. Atmospheric, non-interactive.
- **Format:** `meder@home:~$` (neon magenta) + blinking cursor character
- **Cursor blink:** 1s steps(2) infinite — respects `prefers-reduced-motion`

## 6. Do's and Don'ts

### Do:
- **Do** keep every neutral tinted violet. Page bg, text, panels — the hue family is consistent across all 13 tokens. Pure gray or pure black breaks the system.
- **Do** use the print-offset shadow (`3px 3px 0 var(--border)`) for all cards. It is the signature of this design.
- **Do** preserve the author's exact formatting in post bodies — `white-space: pre-wrap`, typos intact, line breaks as written. The voice is part of the design.
- **Do** use JetBrains Mono for every UI text element below the hero. The monospace floor is non-negotiable.
- **Do** keep border-radius at `0px` on every component. The square corner is a design decision.
- **Do** key all glow shadows to `--glow-strength` so they silently disappear in light mode with no conditionals.
- **Do** alternate post card headers cyan/yellow by index. The two-color pattern is a structural rhythm, not decoration.

### Don't:
- **Don't** use gradient text (`background-clip: text`). One solid color per text element. Emphasis via weight or size only.
- **Don't** add any border-radius. Even `2px` reads as a different system.
- **Don't** use glassmorphism or blur effects. The aesthetic is terminal and print — no blurred panels, no frosted glass.
- **Don't** add a fifth accent color. Cyan, magenta, lime, yellow — that is the complete vocabulary.
- **Don't** use any sans-serif font for UI text. Inter, system-ui, and humanist fonts break the terminal register.
- **Don't** use Iowan Old Style outside the hero title. The display serif earns its power from scarcity — one use only.
- **Don't** apply hardcoded glow values in light mode. Let `--glow-strength: 0px` do the work.
- **Don't** sanitize the post body copy. Lowercase, stream-of-consciousness, typos and slang are correct. "OMD (on mai dead)" is the expected register.
- **Don't** add new shadow systems. Print-offset and glow halo are the two. Everything else is prohibited.
