# Frontend Boilerplate

Next.js 15 + React 19 + Tailwind CSS 3.4 boilerplate with pre-wired SEO, analytics, and CMS integration.

## Project Status

| Field              | Value |
|--------------------|-------|
| Designer           | Mirna |
| Design Status      | Completed |
| Review Status      | Not Reviewed |
| Development Status | Not Started |


## Catalog Tags

| Tag | Value |
|-----|-------|
| Visual Style | minimal |
| Motion | expressive |
| Layout Density | dense |
| Quality | needs-work |


## Branch README Preview Format

Each branch README starts with this section. To add a screenshot: commit `preview.png` to the branch root and it will appear automatically.

```markdown
# Clinic Name — Branch: Dental-N

## Branch Preview

<!-- Add preview.png to the root of this branch to display the screenshot -->
![Homepage Preview](./preview.png)

**Clinic:** Clinic Name — "Tagline"
**Designer:** Name | **Design Status:** Complete | **Location:** City, State
```

---

## What's Included

- **SEO**: JSON-LD structured data, dynamic metadata, canonical URLs, Open Graph, sitemap, robots.txt
- **Analytics**: GA4 (GSC-compatible), Meta Pixel, scroll depth tracking, click ID capture, Consent Mode v2
- **Design System**: Tailwind design tokens (colors, typography, shadows, animations), Framer Motion presets
- **CMS Ready**: API fetcher, SectionData schema, section component pattern with defaultData fallback
- **Security**: HTTP security headers (X-Frame-Options, CSP, Referrer-Policy, etc.)

## Quick Start

```bash
npm install
cp .env.example .env    # Fill in site URL and analytics IDs
npm run dev
```

## Building on This

1. Edit `src/lib/constants.ts` — fill in all business data
2. Update `tailwind.config.ts` — change color palettes
3. Update `src/app/layout.tsx` — change fonts
4. Create components and pages following the patterns in `CLAUDE.md`

See `CLAUDE.md` for structure rules and `docs/EXAMPLES.md` for copy-paste code patterns.
