# Project Workflow — Homepage Design Process

This document captures the full end-to-end process used to build a homepage using this template. It covers every step from reference analysis through to GitHub push, including the tools, skills, and gotchas that apply. Reuse this for every new client project on this stack.

**Stack:** Next.js 15 · React 19 · Tailwind 3.4 · Framer Motion · TypeScript  
**Skills involved:** `/reference-analysis` · `/web-design`  
**Chrome extension:** Claude-in-Chrome (required for reference extraction)

---

## Overview — The 5-Stage Process

```
1. Reference Analysis      → extract design tokens, patterns, behavior from reference site
2. Design System Setup     → apply tokens to tailwind.config, globals.css, animations.ts, layout.tsx
3. Component Library       → build UI primitives + pattern components
4. Homepage Build          → create section components, compose page.tsx
5. Ship                    → build check, commit, push to feature branch
```

Each stage feeds the next. Do not skip or reorder them.

---

## Stage 1 — Reference Analysis

### Tools
- **Skill:** `/reference-analysis`
- **Chrome extension:** `tabs_context_mcp` → `javascript_tool` → `computer`

### Process

**1. Check for the Chrome extension first — always.**  
Before doing anything, run `tabs_context_mcp`. If the reference site is already open in a managed tab, use the extension for all extraction. Do NOT fall back to `web_fetch` unless the extension is unavailable.

```
tabs_context_mcp → check for reference URL in open tabs
  → YES: use javascript_tool + computer for all extraction
  → NO:  use web_fetch + offer console script to user
```

**2. Run the JS extraction script via `javascript_tool`:**
```javascript
(() => {
  const data = { fonts: [], cssVars: [], transitions: [], animations: [], keyframes: [], hover: [] };
  const sheets = [...document.styleSheets];
  sheets.forEach(sheet => {
    try {
      [...sheet.cssRules].forEach(rule => {
        const text = rule.cssText || '';
        if (rule instanceof CSSKeyframesRule) data.keyframes.push({ name: rule.name, css: rule.cssText });
        if (text.includes('transition')) { const m = text.match(/transition[^;]+;/g); if (m) data.transitions.push({ selector: rule.selectorText, value: m }); }
        if (text.includes('animation:')) { const m = text.match(/animation[^;]+;/g); if (m) data.animations.push({ selector: rule.selectorText, value: m }); }
        if (rule instanceof CSSStyleRule) {
          const s = rule.style;
          [...s].filter(p => p.startsWith('--')).forEach(p => data.cssVars.push({ name: p, value: s.getPropertyValue(p).trim() }));
          if (rule.selectorText?.includes(':hover') || rule.selectorText?.includes(':focus')) data.hover.push({ selector: rule.selectorText, css: rule.cssText });
        }
      });
    } catch(e) {}
  });
  document.querySelectorAll('link[href*="fonts.googleapis"]').forEach(l => data.fonts.push({ type: 'google-font', href: l.href }));
  console.log(JSON.stringify(data, null, 2));
  return 'Done';
})();
```

**3. Capture screenshots at key states using `computer` tool:**
- Default (scroll = 0) — captures navbar default state + hero
- Scrolled past hero — captures navbar scroll state
- Each major section — scroll to it, force-reveal IX2 hidden elements first

**Force-reveal IX2 hidden elements before screenshotting:**
```javascript
document.querySelectorAll('[style*="opacity: 0"], [style*="opacity:0"]').forEach(el => {
  el.style.opacity = '1';
  el.style.transform = 'none';
  el.style.filter = 'none';
});
```

**4. Extract specific patterns:**
- Navbar: check nav element AND all child elements for background color — the "scroll fill" is often a `position: absolute` child div (`.head-bg`) with animated opacity, not the nav element's own background
- Animation-controlled elements: look for `will-change: opacity` in inline styles — these are IX2/GSAP managed and their computed style reflects the post-animation state, not the initial state
- Section backgrounds: document the alternation rhythm (white → #f6f8fa → white → dark)
- Decorative layer: floating circles, gradient overlays, edge fades — these are almost always missed on first pass

**5. Outputs — save to shared storage:**
```
~/.claude/plugin-data/web-research/briefs/
  [project]-style-brief.md       ← human-readable 7-dimension brief
  [project]-design-tokens.css    ← CSS custom properties, all extracted values
```

---

## Stage 2 — Design System Setup

Apply extracted tokens to 4 files. Do these in parallel.

### `tailwind.config.ts`
```
fontFamily:    sans (primary — e.g. Poppins), mono (label font — e.g. DM Mono), heading (same as sans — NO serif)
colors:        jaguar (primary text), paragraph (body text), accent (brand blue), accent-light,
               section-bg (alternating bg), border, dark, muted, secondary, pill-bg
               + feature gradient pairs: pink, purple, green
fontSize:      display-title, display-1, display-2, body-lg, body, small, caption
borderRadius:  pill(4px), card(8px), section(16px), card-lg(24px), full(100px)
maxWidth:      container: "1326px"
keyframes:     heroEntrance (blur+y), progressFill, textSwapOut, textSwapIn, floatCircle
```

### `src/app/layout.tsx`
- Replace default fonts with extracted fonts via `next/font/google`
- CSS vars: `--font-sans`, `--font-mono` (remove `--font-serif`)
- html className: `${sans.variable} ${mono.variable}`

### `src/app/globals.css`
Key utilities to add:
```css
.glass                   /* backdrop-filter: blur(71px), white/20 bg */
.section-wrapper         /* 16px outer padding — "card in page" feel */
.section-rounded         /* border-radius: 16px, overflow: hidden */
.ticker-fade-edges       /* CSS mask-image gradient left/right edge fades */
.progress-bar            /* 5px height, rounded-full */
.progress-bar-fill       /* white fill variant */
.progress-bar-fill-blue  /* accent fill variant */
.btn-swap                /* overflow: hidden container for text-swap hover */
.label-mono              /* DM Mono, uppercase, 16px, weight 500 */
.feature-icon-pink/purple/green  /* gradient icon box backgrounds */
.section-padding         /* py-[60px] md:py-[80px] lg:py-[100px] xl:py-[120px] */
```

Headings: `font-sans font-medium` (weight 500) — **not bold, not serif**

### `src/lib/animations.ts`
```typescript
heroEntrance:       { opacity: 0, filter: 'blur(75px)', y: 50 } → { opacity: 1, filter: 'blur(0)', y: 0 }
heroEntranceStagger: parent stagger container for hero children
sectionEntrance:    lighter version for non-hero sections
staggerContainer:   parent with 100-150ms stagger between children
imageHoverScale:    scale 1 → 1.02
perspectiveTilt:    3D card hover (rotateX/Y)
viewportSettings:   { once: true, amount: 0.15 }
```

---

## Stage 3 — Component Library

Build in this order. Each group depends on the previous.

### UI Primitives (`src/components/ui/`)
| Component | Key props | Notes |
|-----------|-----------|-------|
| `Button` | `variant` (primary/white/transparent), `size`, `href` | Text-swap hover via `.btn-swap` |
| `Label` | `variant` (dark/light) | DM Mono, uppercase, leading dot optional |
| `Badge` | `variant` (default/accent/dark) | 14px, rounded-pill |
| `GlassCard` | `variant` (default/light) | backdrop-filter blur |
| `ProgressBar` | `active`, `duration`, `variant` (white/blue) | rAF animation, `onComplete` callback |
| `ProgressBarGroup` | `count`, `activeIndex` | Renders N bars, one active |
| `SectionWrapper` | children | 16px padding + rounded-section inner |
| `Container` | children | max-w-container, horizontal padding |

### Pattern Components (`src/components/patterns/`)
| Component | Use case |
|-----------|----------|
| `FloatingCircles` | Decorative bg circles in dark sections (943px, opacity 0.1) |
| `TickerBar` | Infinite scroll ticker with edge fades |
| `ImageSlider` | Auto-cycling hero images with ProgressBarGroup indicators |
| `StepMeter` | 160×520px vertical step tracker (How It Works sidebar) |
| `PerspectiveCard` | Mouse-tilt 3D card with background image |
| `Accordion` | AnimatePresence height animation, single/multi expand |
| `StickyScrollSection` | 200vh outer container, sticky inner — scroll-reveal parent |

### Layout (`src/components/layout/`)
| Component | Behavior |
|-----------|----------|
| `Navbar` | Transparent at top → accent blue on scroll. Links **always white**. `useIsScrolled(10)`. |
| `Footer` | Dark `#111827`, rounded-section, 4-col grid (brand + 3 link groups) |

**Navbar scroll pattern (from Sanora reference):**
```
Default (scrollY = 0): bg-transparent — white text over hero image
Scrolled (scrollY > 10): bg-accent (#2081aa) fades in — white text stays white
CTA button: variant="white" (white bg, blue text) in both states
```
Implementation: `isScrolled ? "bg-accent shadow-sm" : "bg-transparent"` — links never change color.

---

## Stage 4 — Homepage Build

### Section component pattern — every section follows this exactly
```tsx
"use client";

const defaultData = {
  tagline:     { text: "..." },
  title:       { text: "..." },
  description: { text: "..." },
  buttons:     [{ text: "...", url: "/..." }],
  lists: [{ name: "...", items: [] }],
  extraDetails: {}
};

interface SectionProps {
  data?: Record<string, any> | null;
}

export default function SectionName({ data: cmsData }: SectionProps) {
  const data = cmsData ?? defaultData;
  // always optional-chain: data.title?.text, data.lists?.[0]?.items ?? []
}
```

The `defaultData` fallback means every section renders standalone without a CMS.  
The `website-upgrade` skill reads `defaultData` to push content to the CMS.

### Recommended homepage section order (pharmacy/medical)
```
Hero              → full-bleed dark image, trust badges, glass stat card
TrustBar          → white strip, accreditation badges
Services          → bento grid (featured 2×2 + 4 standard cards)
WhyCompounding    → 2-col: copy + comparison table | feature cards
HowItWorks        → dark section, sticky StepMeter + scroll-driven panels + animated fill
About             → stat carousel (ProgressBarGroup + counter swap) + credential badges
Testimonials      → sticky scroll reveal (StickyScrollSection + useScroll/useTransform)
CTABanner         → accent bg, FloatingCircles, dual CTA buttons
FAQ               → asymmetric 2-col: sticky title/button | Accordion
```

### Layout variety rule
Every homepage must use at least 4 structurally distinct layouts. Assign layouts before writing code:
- **Bento grid** — varied cell sizes (1 featured 2×2 + smaller cards)
- **Asymmetric 2-col** — unequal columns (e.g. `lg:grid-cols-[1fr_1.6fr]`)
- **Dark full-width** — `bg-dark`, floating circles, 3-col content
- **Sticky scroll reveal** — `StickyScrollSection` with `useScroll` + `useTransform`
- **Comparison layout** — split table inside a 2-col grid

If two adjacent sections share the same grid structure — stop and change one.

### Page composition (`src/app/(site)/page.tsx`)
```tsx
export default async function HomePage() {
  const [heroData, trustBarData, /* ... */] = await Promise.all([
    fetchSectionContentSSR("home", "hero"),
    fetchSectionContentSSR("home", "trust-bar"),
    // ... one per section
  ]);
  return (
    <>
      <Hero data={heroData} />
      <TrustBar data={trustBarData} />
      {/* ... */}
    </>
  );
}
```

### Wire layout.tsx
```tsx
// src/app/(site)/layout.tsx — replace the TODO comments with:
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
// ...
<Navbar />
<main>{children}</main>
<Footer data={footerData} />
```

---

## Stage 5 — Ship

### Build check
```bash
npm run build   # must pass with zero TypeScript errors before committing
npm run lint    # fix any ESLint issues
```

### Common build errors to pre-empt
| Error | Fix |
|-------|-----|
| `Cannot find namespace 'JSX'` | Replace `JSX.Element` with `import type { ReactElement } from "react"` |
| Object literal unknown property | Check interface field names in `src/types/index.ts` before writing constant data |
| Module not found `cn` | Add `clsx` + `tailwind-merge`, export `cn()` from `src/lib/utils.ts` |
| Missing peer dependency | Run `npm install` — autoprefixer and other deps may be absent in fresh clone |

### Git workflow
```bash
git checkout -b design-1          # create feature branch named for the design
git add <specific files>          # never git add -A (may include .env or binaries)
git commit -m "Add [client] homepage with [reference] design system"
git push -u origin design-1
```

Always push to a feature branch. Never push directly to `main`.

---

## Business Data Checklist (`src/lib/constants.ts`)

Fill in before any section components are written. Every hardcoded business detail goes here.

- [ ] `SITE_NAME` — business name
- [ ] `SITE_URL` — production domain
- [ ] `SITE_TAGLINE` — one-line value proposition
- [ ] `CONTACT_INFO` — phone, email, address, hours (use `days:` not `day:` for `BusinessHours`)
- [ ] `NAV_ITEMS` — with dropdown children for Services
- [ ] `SERVICES` — 4–6 services, each with id, title, description, href
- [ ] `TESTIMONIALS` — 6 patient/client testimonials with author, role, rating
- [ ] `FAQS` — 6–8 FAQs covering common categories
- [ ] `TEAM_MEMBERS` — key staff with credentials

---

## Section Background Rhythm

Follow this alternation to prevent visual monotony:
```
Hero         → bg-dark (full-bleed image)
TrustBar     → bg-white (border-y strip)
Services     → bg-white
WhyCompounding → bg-section-bg (#f6f8fa)
HowItWorks   → bg-dark
About        → bg-section-bg
Testimonials → bg-section-bg
CTABanner    → bg-accent
FAQ          → bg-white
Footer       → bg-dark
```
Rule: no more than 2 adjacent sections with the same background. Dark sections should be separated by at least one light section (except Footer after CTABanner).

---

## TypeScript Rules for This Stack

```typescript
// CORRECT — React 19 / Next.js 15
import type { ReactElement } from "react";
const icons: Record<string, ReactElement> = { ... };

// WRONG — JSX namespace not globally available
const icons: Record<string, JSX.Element> = { ... };  // ❌ build error

// CORRECT — optional chaining on all CMS data
data.title?.text
data.buttons?.[0]?.url
data.lists?.[0]?.items ?? []
data.extraDetails?.some_field

// CORRECT — check src/types/index.ts before writing constants
// BusinessHours uses `days` (plural) not `day`
{ days: "Monday – Friday", hours: "9AM – 6PM" }  // ✓
{ day: "Monday – Friday", hours: "9AM – 6PM" }   // ✗ TypeScript error
```

---

## Skill Quick Reference

| Task | Skill / Command |
|------|----------------|
| Analyse a reference site | `/reference-analysis [URL]` |
| Build a homepage | `/web-design` |
| Build an inner page | `/service-pages` |
| Review code quality | `/simplify` |
| Generate project guidelines | `/project-guidelines` |

**Skill files location:** `~/.claude/skills/`  
**Reference briefs location:** `~/.claude/plugin-data/web-research/briefs/`  
**Design tokens from this project:** `~/.claude/plugin-data/web-research/briefs/design-1-design-tokens.css`  
**Style brief from this project:** `~/.claude/plugin-data/web-research/briefs/design-1-style-brief.md`

---

## File Map — What Was Built in This Session

```
tailwind.config.ts                         ← Sanora design tokens (colors, fonts, spacing, keyframes)
src/app/layout.tsx                         ← Poppins + DM Mono fonts
src/app/globals.css                        ← All utility classes (glass, section-wrapper, progress-bar, etc.)
src/lib/animations.ts                      ← Framer Motion presets (heroEntrance, sectionEntrance, etc.)
src/lib/constants.ts                       ← Access Care business data
src/lib/utils.ts                           ← cn() utility (clsx + tailwind-merge)

src/components/ui/
  Button.tsx                               ← primary/white/transparent, text-swap hover
  Label.tsx                                ← DM Mono eyebrow label
  Badge.tsx                                ← pill badge
  GlassCard.tsx                            ← backdrop-blur glass card
  ProgressBar.tsx + ProgressBarGroup       ← rAF-animated bars
  SectionWrapper.tsx                       ← 16px card-in-page wrapper
  Container.tsx                            ← max-w-container centered

src/components/patterns/
  FloatingCircles.tsx                      ← decorative bg circles
  TickerBar.tsx                            ← infinite scroll ticker
  ImageSlider.tsx                          ← auto-cycling image slider
  StepMeter.tsx                            ← vertical 3-step progress indicator
  PerspectiveCard.tsx                      ← mouse-tilt 3D card
  Accordion.tsx                            ← animated expand/collapse
  StickyScrollSection.tsx                  ← 200vh sticky scroll parent

src/components/layout/
  Navbar.tsx                               ← transparent→blue on scroll, always white text
  Footer.tsx                               ← dark, 4-col, social links

src/components/sections/home/
  Hero.tsx                                 ← full-bleed, FloatingCircles, GlassCard stats
  TrustBar.tsx                             ← 6 accreditation badges
  Services.tsx                             ← bento grid (featured + 5 cards)
  WhyCompounding.tsx                       ← 2-col, comparison table, feature cards
  HowItWorks.tsx                           ← dark, StepMeter, scroll-driven visual fill
  About.tsx                                ← stat carousel with ProgressBarGroup
  Testimonials.tsx                         ← sticky scroll reveal with useScroll
  CTABanner.tsx                            ← accent bg, FloatingCircles, dual CTA
  FAQ.tsx                                  ← sticky left col, Accordion right

src/app/(site)/
  layout.tsx                               ← Navbar + Footer wired in
  page.tsx                                 ← all sections composed with Promise.all

design.md                                  ← homepage design guide (13 sections documented)
docs/WORKFLOW.md                           ← this file
```
