# Dental System - Frontend

## 1. Description

Dental System is a responsive dental-practice website built with Next.js. It includes home, about, services, appointment, contact, location, FAQ, membership, reviews, before-and-after, privacy, and terms pages. The project also includes reusable page sections, SEO metadata and structured data, analytics integrations, Tailwind styling, and CMS-ready content helpers.

Business details and site defaults are maintained in `src/lib/constants.ts`. The site can run locally without connecting a CMS; external analytics and CMS integrations need their corresponding environment variables.

## 2. Languages, Runtime, and Packages

### Languages and runtime

| Technology              | Version                                                     |
| ----------------------- | ----------------------------------------------------------- |
| TypeScript              | `^5`                                                        |
| JavaScript (ES modules) | Used for JavaScript modules and configuration               |
| React / TSX             | React `^19.2.4`                                             |
| CSS                     | Tailwind CSS `3.4`                                          |
| Node.js                 | `20.9` or later                                             |
| npm                     | Use the npm version included with your Node.js installation |

The project uses the exact dependency versions recorded in `package-lock.json`. Version ranges below are from `package.json`.

### Runtime dependencies

| Package         | Version    | Purpose                  |
| --------------- | ---------- | ------------------------ |
| `next`          | `^16.1.6`  | Next.js app framework    |
| `react`         | `^19.2.4`  | UI library               |
| `react-dom`     | `^19.2.4`  | React DOM rendering      |
| `clsx`          | `^2.1.1`   | Conditional class names  |
| `framer-motion` | `^12.34.3` | UI and scroll animations |
| `gsap`          | `^3.15.0`  | Animation utilities      |
| `lucide-react`  | `^0.576.0` | Icon components          |

### Development dependencies

| Package                       | Version    | Purpose                               |
| ----------------------------- | ---------- | ------------------------------------- |
| `typescript`                  | `^5`       | Type checking and TypeScript compiler |
| `tailwindcss`                 | `3.4`      | Utility-first CSS                     |
| `eslint`                      | `^9`       | Linting                               |
| `eslint-config-next`          | `^16.1.6`  | Next.js ESLint rules                  |
| `eslint-config-prettier`      | `^10.1.8`  | Prettier/ESLint compatibility         |
| `prettier`                    | `^3.8.1`   | Code formatting                       |
| `prettier-plugin-tailwindcss` | `^0.7.2`   | Tailwind class sorting                |
| `postcss`                     | `^8.5.6`   | CSS processing                        |
| `autoprefixer`                | `^10.4.27` | CSS vendor prefixes                   |
| `@types/node`                 | `^20`      | Node.js type definitions              |
| `@types/react`                | `^19.2.14` | React type definitions                |
| `@types/react-dom`            | `^19.2.3`  | React DOM type definitions            |

## 3. Project Setup

### Prerequisites

- [Node.js](https://nodejs.org/) **20.9 or later** (npm is included).
- [Git for Windows](https://git-scm.com/download/win) on Windows, or [Git](https://git-scm.com/downloads) for macOS/Linux.
- A terminal: PowerShell on Windows, or Terminal on macOS/Linux.

See the [Next.js installation requirements](https://nextjs.org/docs/app/getting-started/installation#system-requirements) for runtime details.

### Windows (PowerShell)

```powershell
git clone https://github.com/MirnaBahaa/dental_system.git
Set-Location dental_system
npm ci
```

### macOS / Linux (Terminal)

```bash
git clone https://github.com/MirnaBahaa/dental_system.git
cd dental_system
npm ci
```

### Optional environment variables

The site has local defaults and can be started without a `.env.local` file. To enable integrations, create `.env.local` in the project root and add only the values you use:

```dotenv
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_API_BASE=
NEXT_PUBLIC_SITE_SLUG=
X_Api_Key=
```

Keep private credentials out of source control. Variables prefixed with `NEXT_PUBLIC_` are intended to be exposed to the browser, so never put secrets in them. `.env*` files are ignored by Git.

### Run and build

```bash
npm run dev       # Start the development server at http://localhost:3000
npm run lint      # Run ESLint
npm run build     # Create a production build
npm run start     # Serve the production build
npm run format    # Format project files with Prettier
npm run format:check
```

## 4. Project Structure

| Path                                                                  | Contents                                                                                                                 |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `src/app/layout.tsx`                                                  | Root document, fonts, metadata defaults, and analytics setup                                                             |
| `src/app/(site)/`                                                     | Website route group and shared site layout                                                                               |
| `src/app/(site)/page.tsx`                                             | Home page                                                                                                                |
| `src/app/(site)/about/`, `appointment/`, `contact/`, `location/`      | About, booking, contact, and location pages                                                                              |
| `src/app/(site)/services/`                                            | Services index, category routes, and service detail routes                                                               |
| `src/app/(site)/faq/`, `membership/`, `reviews/`, `before-and-after/` | FAQ, membership, reviews, and gallery pages                                                                              |
| `src/app/(site)/privacy/`, `terms/`                                   | Legal pages                                                                                                              |
| `src/app/globals.css`                                                 | Global styles and Tailwind directives                                                                                    |
| `src/components/Analytics/`                                           | Google Analytics, Meta Pixel, click ID, and scroll-depth components                                                      |
| `src/components/layout/`                                              | Navigation, footer, page shell, and other shared layout components                                                       |
| `src/components/sections/`                                            | Reusable sections grouped by page, including `home/`, `services/`, `service-category/`, `service-detail/`, and `shared/` |
| `src/hooks/`                                                          | Shared React hooks                                                                                                       |
| `src/lib/constants.ts`                                                | Site and business data                                                                                                   |
| `src/lib/`                                                            | API helpers, animations, metadata, schema, analytics events, and utilities                                               |
| `src/types/index.ts`                                                  | Shared TypeScript and CMS content types                                                                                  |
| `public/images/`                                                      | Static image and logo assets                                                                                             |
| `docs/`                                                               | Component examples and project documentation                                                                             |
| `tailwind.config.ts`                                                  | Tailwind theme and design tokens                                                                                         |
| `package.json` / `package-lock.json`                                  | Scripts and dependency definitions/lockfile                                                                              |

## Project Status

| Field              | Value        |
| ------------------ | ------------ |
| Designer           | Mirna        |
| Design Status      | Completed    |
| Review Status      | Not Reviewed |
| Development Status | Not Started  |

## Further Documentation

- [WORKFLOW.md](./WORKFLOW.md) — project workflow
- [CLAUDE.md](./CLAUDE.md) — repository conventions and component guidance
- [docs/EXAMPLES.md](./docs/EXAMPLES.md) — page and section examples
