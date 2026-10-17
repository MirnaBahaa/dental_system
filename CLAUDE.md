# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Your context window will be automatically compacted as it approaches its limit, allowing you to continue working indefinitely from where you left off. Therefore, do not stop tasks early due to token budget concerns. As you approach your token budget limit, save your current progress and state to memory before the context window refreshes. Always be as persistent and autonomous as possible and complete tasks fully, even if the end of your budget is approaching. Never artificially stop any task early regardless of the context remaining.

## Branch Workflow — Never Push to Main

This repo uses a **clone → branch → push** workflow. `main` is the clean template and must never receive design work.

### One branch per project — always

Each project lives on exactly one `dental-N` branch for its entire lifetime. **If a branch already exists for the project you are working on, push all further changes to that same branch — never create a new branch for the same project.**

Before doing anything, check what branch this project is already on:
```bash
git fetch --all && git branch -r
```
If a `dental-N` branch already exists for this project, check it out and push to it:
```bash
git checkout dental-N
# ... make changes ...
git push origin dental-N
```

### When starting a brand-new project (no branch exists yet)

Only create a new branch when this is a genuinely new, separate project — not an edit or continuation of an existing one.

1. Before writing any code, run this to see all existing remote branches:
   ```bash
   git fetch --all && git branch -r
   ```
2. Find the highest-numbered `dental-N` branch (e.g. if `dental-3` is the last one, the next is `dental-4`).
3. Create and switch to the new branch:
   ```bash
   git checkout -b dental-4
   ```
4. **Immediately prompt the user to run `/setup-log`** before any design work begins:
   > "You're now on branch `dental-4`. Before we start, run `/setup-log <your-name>` so your prompts are logged correctly — e.g. `/setup-log Nadine`."
   Do not proceed with any design or code changes until `/setup-log` has been run.
5. Do all design and development work on that branch.
6. Push to that branch — **never to `main`**:
   ```bash
   git push -u origin dental-4
   ```

### Branch naming rules

- Format: `dental-N` where N increments from the highest existing number on the remote.
- Check remote branches each time — do not assume the count from local history.
- If no `dental-N` branches exist yet, start at `dental-1`.
- **Never create `dental-N+1` for edits to an existing `dental-N` project.**

### Safety rules

- **At the start of every session on `main`**, immediately prompt the user:
  > "You're on the `main` branch — this is the clean template and should never be edited directly. Do you want to create a new project branch now? Run `git fetch --all && git branch -r` to see existing branches, then I'll help you create the next `dental-N` branch."
  Do not wait for the user to ask. Raise this the moment you detect `main` is the active branch.
- If the current branch is `main`, refuse to commit design/code changes and remind the developer to check out the correct `dental-N` branch first.
- If a collaborator is about to push and you detect they are on a newly created branch but an existing branch already holds this project's work, stop and redirect them to the correct branch.

---

## Project Status Tracking — Update on Every Push

The `README.md` contains a **Project Status** table that must be kept current. Follow these rules on every git push:

### On the first push from this template

Before committing, ask the person pushing:
1. **Designer name** — who created the design? Fill in the `Designer` field.
2. **Design Status** — is the design complete or still in progress? Set `Design Status` to `In Progress` or `Completed`.

Set the following fields automatically without asking:
- `Review Status` → `Not Reviewed`
- `Development Status` → `Not Started`

### On every subsequent push

Ask the person pushing:
1. Has the **Design Status** changed? Update it to `In Progress` or `Completed` as appropriate.

### Fields managed by the reviewer only

`Review Status` and `Development Status` are controlled exclusively by the project reviewer on their local device. Do **not** prompt anyone else to change these fields.

Valid values for reference:
- **Design Status**: `In Progress` / `Completed`
- **Review Status**: `Not Reviewed` / `Reviewed`
- **Development Status**: `Not Started` / `In Progress` / `Completed`

---

## Prompt Log — Capture Every Designer's Prompts

The `.claude/prompt-log/` system records every prompt automatically. The data lives in git alongside the design code so reviewers can see exactly how the work was done. **Both collaborators' prompts must end up in the same file and be pushed to GitHub.**

### Step 1 — Run `/setup-log` before your first prompt

Every person who works on a branch must run this **once** as their very first action:

```
/setup-log <your-name>
```

For example: `/setup-log Nadine` or `/setup-log Yomna`

This writes your name into `.claude/prompt-log/config.json` and initialises the Excel file. Without this step, your name won't appear on any of your prompt records and the Excel will show blank designer fields.

### Step 2 — Prompts are captured automatically

Every message you type is appended to `.claude/prompt-log/prompts.jsonl` with your name, branch, timestamp, and text. No action needed — the `UserPromptSubmit` hook handles it.

### Step 3 — Files are auto-staged at session end

When a Claude Code session ends, the `Stop` hook runs `git add` on all prompt log files. This means they are **staged and ready** for your next commit. You do not need to manually stage them.

> **If you commit from the terminal before reopening Claude Code**, the files may not be staged yet. Stage them manually first:
> ```bash
> git add .claude/prompt-log/prompts.jsonl .claude/prompt-log/sessions.jsonl .claude/prompt-log/tasks.jsonl .claude/prompt-log/config.json prompt-log.xlsx
> ```

### Step 4 — Always `git push` when you finish a session

Staged files only reach GitHub when you push. End every work session with a commit and push so your prompts are not lost.

### When two people work on the same branch

Both collaborators write to the same `prompts.jsonl` file. Each line is tagged with the designer's name, so there is no ambiguity. To avoid conflicts:

1. **`git pull` before starting** — get the other person's latest prompts first.
2. **Both push when done** — your lines are appended at the end so merges are clean.

---

## Starting a New Design Project — Read This First

**When a new homepage or website design is requested on this template, read `docs/WORKFLOW.md` before doing anything else.**

`docs/WORKFLOW.md` is the complete process documentation for this template. It covers:
- Stage 1: Reference analysis using the Chrome extension (`/reference-analysis` skill)
- Stage 2: Applying design tokens to tailwind.config, globals.css, animations.ts, layout.tsx
- Stage 3: Which UI and pattern components to build and in what order
- Stage 4: Homepage section patterns, layout variety rules, page composition
- Stage 5: Build checks, common TypeScript errors, and git workflow

Reading it takes less than 2 minutes and prevents rebuilding. Do not start writing components until you have read it.

```
docs/WORKFLOW.md   ← full process guide — READ AT PROJECT START
docs/EXAMPLES.md   ← copy-paste code patterns for pages and sections
```

---

## Stack

Next.js 15, React 19, Tailwind 3.4, Framer Motion, Lucide Icons, TypeScript

## Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run lint         # ESLint
npm run format       # Prettier write (auto-fix)
npm run format:check # Prettier check (CI)
```

## Quick Start

1. Create `.env.local` with `NEXT_PUBLIC_GA_MEASUREMENT_ID` and `NEXT_PUBLIC_SITE_URL`
2. `npm install && npm run dev`
3. Edit `src/lib/constants.ts` — fill in ALL business data (name, phone, address, services, FAQs)
4. Update `tailwind.config.ts` — change `primary`, `accent`, `warm` color palettes
5. Update `src/app/layout.tsx` — change fonts (Inter + Playfair Display are defaults)
6. Create components (UI, layout, sections) and pages following the patterns below

## Project Structure

```
src/
  app/
    layout.tsx              ← Root: fonts, GA4 script, metadata base
    globals.css             ← Tailwind directives + component classes
    robots.ts               ← Search engine rules
    sitemap.ts              ← XML sitemap (reads from constants.ts)
    (site)/
      layout.tsx            ← Site shell: JSON-LD schemas, Analytics, Navbar/Footer slots
      page.tsx              ← Home page — compose section components here
      not-found.tsx         ← Custom 404
      [page-name]/page.tsx  ← Create new pages here
  components/               ← CREATE ALL COMPONENTS HERE
    ui/                     ← Primitives: Container, Button, Card, etc.
    layout/                 ← Navbar, Footer, MobileMenu
    sections/
      home/                 ← Home page sections (Hero.tsx, About.tsx, etc.)
      [page-name]/          ← Per-page sections (about/, services/, etc.)
      shared/               ← Reusable across pages (PageHero, PageCTA, etc.)
    Analytics/              ← GA4, Meta Pixel, ScrollDepth, ClickIdCapture (pre-wired)
  lib/
    constants.ts            ← ALL business data — edit this FIRST
    api.js                  ← CMS fetch (returns null until CMS connected)
    metadata.ts             ← Page metadata generator
    schema.ts               ← JSON-LD structured data generators
    animations.ts           ← Framer Motion presets (easings, transitions, variants)
    ga-events.ts            ← GA4 event helpers
    production-config.ts    ← Production domain check for analytics
  hooks/
    useAnimatedCounter.ts   ← useAnimatedCounter, useScrollProgress, useIsScrolled, useMediaQuery
  types/
    index.ts                ← SectionData CMS schema (read the JSDoc!)
```

## What You Need to Create

The template provides infrastructure (config, lib, types, analytics, app shell).
You need to build everything the user sees:

1. **UI Components** (`src/components/ui/`) — Container, Button, Card, Badge, etc.
2. **Layout** (`src/components/layout/`) — Navbar, Footer, MobileMenu
3. **Section Components** (`src/components/sections/`) — per-page and shared sections
4. **Pages** (`src/app/(site)/`) — home, about, services, contact, etc.

After creating Navbar and Footer, wire them into `src/app/(site)/layout.tsx` where the TODO comments are.

## Critical Rules

### 0. Use Next.js Built-in Components

Always use Next.js optimized components instead of plain HTML equivalents:

- **Images:** Use `next/image` (`<Image>`) instead of `<img>`. Always provide `width`, `height`, and `alt`. For fill mode use `fill` prop with a positioned parent.
- **Links:** Use `next/link` (`<Link>`) instead of `<a>` for internal navigation.
- **Fonts:** Use `next/font` instead of `<link>` or `@import` for font loading.
- **Scripts:** Use `next/script` (`<Script>`) instead of `<script>` for third-party scripts.
- **Head/Metadata:** Use the `metadata` export or `generateMetadata` instead of `<head>` tags.

### 1. Section Component Pattern

Every section component MUST follow this structure:

```tsx
"use client";

const defaultData = {
  title: { text: "Section Title" },
  description: { text: "Section description." },
  buttons: [{ text: "CTA", url: "/contact" }],
  assets: [],
  lists: [],
  extraDetails: {}
};

interface SectionProps {
  data?: Record<string, any> | null;
}

export default function SectionName({ data: cmsData }: SectionProps) {
  const data = cmsData ?? defaultData;
  return <h2>{data.title?.text}</h2>;
}
```

**Why:** The `website-upgrade` skill reads `defaultData` objects and pushes them to the CMS. The `??` fallback means components work with or without CMS.

### 2. Page Pattern

Every page MUST be an async server component:

```tsx
export default async function PageName() {
  const [sectionA, sectionB] = await Promise.all([
    fetchSectionContentSSR("page-slug", "section-a"),
    fetchSectionContentSSR("page-slug", "section-b")
  ]);
  return (
    <>
      <SectionA data={sectionA} />
      <SectionB data={sectionB} />
    </>
  );
}
```

### 3. Business Data in constants.ts

NEVER hardcode business name, phone, address, hours, services in components.
ALL business data goes in `src/lib/constants.ts`. Components import from there.

### 4. Data Access — Always Optional Chain

```tsx
data.title?.text; // text fields
data.buttons?.[0]?.url; // buttons
data.assets?.[0]?.image?.url; // images
data.lists?.[0]?.items ?? []; // lists (default to empty array)
data.extraDetails?.show_phone; // extra details (snake_case keys)
```

### 5. Component File Organization

- `src/components/ui/` — reusable primitives (Container, Button, Card, Badge)
- `src/components/layout/` — site-wide layout (Navbar, Footer, MobileMenu)
- `src/components/sections/home/` — home page sections only
- `src/components/sections/about/` — about page sections only
- `src/components/sections/shared/` — reusable across multiple pages
- One component per file, PascalCase names (Hero.tsx, Features.tsx)

## Styling Conventions

- Tailwind utility classes only (no CSS modules)
- Design tokens: `bg-cream-warm`, `text-primary`, `text-accent`, `shadow-soft`, `rounded-softer`
- Section backgrounds alternate: `bg-white` → `bg-cream-warm` → `bg-white` (CTAs use `gradient-primary`)
- Framer Motion for scroll animations: `whileInView` with `viewport={{ once: true }}`
- Import presets from `@/lib/animations` for consistent easing/timing
- Mobile-first responsive: base → `sm:` → `lg:` → `xl:`

## Available Hooks (`src/hooks/useAnimatedCounter.ts`)

Pre-built hooks — import and use in components:

```tsx
import {
  useAnimatedCounter,
  useScrollProgress,
  useIsScrolled,
  useMediaQuery
} from "@/hooks/useAnimatedCounter";

// Animate number 0→500 when scrolled into view (stats sections)
const { count, ref } = useAnimatedCounter({ end: 500, duration: 2000 });

// Scroll progress 0–100% (reading progress bars)
const progress = useScrollProgress();

// Has user scrolled past 50px? (Navbar shadow/shrink)
const isScrolled = useIsScrolled(50);

// CSS media query match (responsive JS logic)
const isMobile = useMediaQuery("(max-width: 768px)");
```

## Do Not Modify

These files are wired into the template infrastructure:

- `src/components/Analytics/*` — GA4, Meta Pixel, tracking
- `src/hooks/*` — pre-built utility hooks
- `src/lib/api.js`, `metadata.ts`, `schema.ts`, `ga-events.ts`, `production-config.ts`
- `src/types/index.ts` — SectionData schema
- `src/app/layout.tsx` — only change fonts and GA measurement ID
- `src/app/(site)/layout.tsx` — only add Navbar/Footer imports where the TODOs are

## Reference Docs

| File | What it contains |
|------|-----------------|
| `docs/WORKFLOW.md` | **Full project process** — reference analysis → design system → components → homepage build → ship. Read at the start of every new design project. |
| `docs/EXAMPLES.md` | Copy-paste code patterns for pages, sections, and constants. |

## Blog Pages

When creating blog pages, use the `BlogPost` type from `src/types/index.ts` for all blog data — even hardcoded content. This ensures the data structure matches the CMS API, making migration seamless.

```tsx
import { BlogPost } from "@/types";

// Hardcoded posts follow the same shape the API returns
const posts: BlogPost[] = [
  {
    id: 1,
    slug: "my-post",
    title: "My Post Title",
    excerpt: "A short summary.",
    content: "<p>Full HTML content here.</p>",
    featured_image: "/images/blog/my-post.jpg",
    featured_image_alt: "Description",
    author: { name: "Jane Doe", job_title: "Founder" },
    published_at: "2025-01-15T00:00:00Z",
    category: { name: "Tips", slug: "tips" },
    tags: [{ name: "Growth", slug: "growth" }],
    read_time: 5
  }
];
```

When the CMS blog engine is connected later, the hardcoded array gets replaced by API calls — same type, no component changes needed.

## CMS Schema Reference

See `src/types/index.ts` for the full SectionData interface and BlogPost types with detailed JSDoc.
