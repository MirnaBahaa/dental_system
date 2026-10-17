# Code Examples

Copy-paste patterns for creating pages and section components.

---

## 1. Creating a New Page

Every page is an **async server component** that fetches CMS data and composes sections.

```tsx
// src/app/(site)/about/page.tsx

import { generatePageMetadata } from "@/lib/metadata";
import { fetchSectionContentSSR } from "@/lib/api";
import { SITE_NAME } from "@/lib/constants";

// Import your section components
import Hero from "@/components/sections/about/Hero";
import Story from "@/components/sections/about/Story";
import Team from "@/components/sections/about/Team";
import CTA from "@/components/sections/shared/CTA";

// SEO metadata
export const metadata = generatePageMetadata({
  title: "About Us",
  description: `Learn about ${SITE_NAME} and our team.`,
  path: "/about"
});

// Page component — async server component
export default async function AboutPage() {
  // Fetch all sections in parallel (returns null until CMS is connected)
  const [heroData, storyData, teamData, ctaData] = await Promise.all([
    fetchSectionContentSSR("about", "hero"),
    fetchSectionContentSSR("about", "story"),
    fetchSectionContentSSR("about", "team"),
    fetchSectionContentSSR("about", "cta")
  ]);

  return (
    <>
      <Hero data={heroData} />
      <Story data={storyData} />
      <Team data={teamData} />
      <CTA data={ctaData} />
    </>
  );
}
```

---

## 2. Creating a Section Component

Every section is a **client component** with a `defaultData` object matching the CMS schema.

```tsx
// src/components/sections/about/Hero.tsx

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

/**
 * CMS Schema for About Hero:
 * - title.text        — Main heading
 * - description.text  — Subtitle paragraph
 * - buttons[0]        — Primary CTA { text, url }
 * - assets[0]         — Hero image { image: { url, alt } }
 */
const defaultData = {
  title: { text: "About Our Company" },
  description: {
    text: "We are dedicated to delivering exceptional service and building lasting relationships with our clients."
  },
  buttons: [{ text: "Get in Touch", url: "/contact" }],
  assets: [
    {
      name: "hero-image",
      image: {
        url: "https://placehold.co/1200x675/e2e8f0/475569?text=About+Hero",
        alt: "Our team at work"
      }
    }
  ],
  lists: [],
  extraDetails: {}
};

interface HeroProps {
  data?: Record<string, any> | null;
}

export default function Hero({ data: cmsData }: HeroProps) {
  const data = cmsData ?? defaultData;

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="mb-6 font-serif text-3xl text-primary sm:text-4xl lg:text-5xl">
              {data.title?.text}
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-primary/80">{data.description?.text}</p>
            {data.buttons?.[0] && (
              <Button variant="accent" size="lg" href={data.buttons[0].url}>
                {data.buttons[0].text}
              </Button>
            )}
          </motion.div>

          {/* Image */}
          {data.assets?.[0]?.image?.url && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-warm-lg"
            >
              <Image
                src={data.assets[0].image.url}
                alt={data.assets[0].image.alt ?? ""}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  );
}
```

---

## 3. defaultData Shapes

### Simple — Title + Description + Buttons

```ts
const defaultData = {
  title: { text: "Section Heading" },
  description: { text: "A paragraph of descriptive text." },
  buttons: [
    { text: "Primary CTA", url: "/contact" },
    { text: "Secondary CTA", url: "/about" }
  ],
  assets: [],
  lists: [],
  extraDetails: {}
};
```

### With Lists — Cards, FAQs, Features, Steps

```ts
const defaultData = {
  title: { text: "Our Services" },
  description: { text: "What we offer." },
  buttons: [],
  assets: [],
  lists: [
    {
      name: "service-cards",
      items: [
        {
          title: { text: "Service One" },
          description: { text: "Description of service one." },
          extraDetails: { icon: "Briefcase" },
          buttons: [{ text: "Learn More", url: "/services/one" }],
          assets: []
        },
        {
          title: { text: "Service Two" },
          description: { text: "Description of service two." },
          extraDetails: { icon: "Palette" },
          buttons: [{ text: "Learn More", url: "/services/two" }],
          assets: []
        }
      ]
    }
  ],
  extraDetails: {}
};

// Access in component:
// const items = data.lists?.[0]?.items ?? []
// items.map(item => item.title?.text)
```

### With Assets — Images

```ts
const defaultData = {
  title: { text: "Our Gallery" },
  description: { text: "" },
  buttons: [],
  assets: [
    {
      name: "main-image",
      image: {
        url: "https://placehold.co/800x600/e2e8f0/475569?text=Main",
        alt: "Main gallery image"
      }
    },
    {
      name: "secondary-image",
      image: {
        url: "https://placehold.co/400x300/e2e8f0/475569?text=Secondary",
        alt: "Secondary image"
      }
    }
  ],
  lists: [],
  extraDetails: {}
};

// Access in component:
// data.assets?.[0]?.image?.url
// data.assets?.[1]?.image?.alt
```

### With Extra Details — Arbitrary Key-Value Data

```ts
const defaultData = {
  title: { text: "Visit Us" },
  description: { text: "Come see our office." },
  buttons: [{ text: "Get Directions", url: "https://maps.google.com/..." }],
  assets: [],
  lists: [],
  extraDetails: {
    phone: "(555) 123-4567",
    address_line1: "123 Main Street",
    address_line2: "Suite 100, Dallas, TX 75001",
    maps_query: "My Business, 123 Main St, Dallas TX",
    show_hours: "true",
    badge_text: "Now Open"
  }
};

// Access in component:
// data.extraDetails?.phone
// data.extraDetails?.show_hours === 'true'
// Note: extraDetails values are ALWAYS strings, keys are ALWAYS snake_case
```

### Multiple Lists — Grouped Data (e.g. FAQ categories, service menu)

```ts
const defaultData = {
  title: { text: "FAQ" },
  description: { text: "" },
  buttons: [],
  assets: [],
  lists: [
    {
      name: "general",
      items: [
        {
          title: { text: "How do I get started?" },
          description: { text: "Simply contact us and we will guide you through the process." }
        }
      ]
    },
    {
      name: "pricing",
      items: [
        {
          title: { text: "What are your rates?" },
          description: { text: "We offer competitive pricing. Contact us for a quote." }
        }
      ]
    }
  ],
  extraDetails: {}
};

// Access: data.lists?.map(list => list.items) for grouped rendering
```

---

## 4. Adding to constants.ts

### New Service

```ts
// In the SERVICES array:
{
  id: 'web-design',
  title: 'Web Design',
  description: 'Beautiful, responsive websites.',
  icon: 'palette',
  href: '/services/web-design',
},
```

### New Service Detail

```ts
// In the SERVICE_DETAILS record:
'web-design': {
  id: 'web-design',
  slug: 'web-design',
  title: 'Web Design',
  heroTitle: 'Professional Web Design',
  icon: 'palette',
  overview: 'We create modern, responsive websites...',
  benefits: ['Custom design', 'Mobile-first', 'SEO optimized', 'Fast loading'],
  process: [
    { step: 1, title: 'Discovery', description: 'We learn about your business.' },
    { step: 2, title: 'Design', description: 'We create mockups for your review.' },
    { step: 3, title: 'Build', description: 'We develop the final website.' },
    { step: 4, title: 'Launch', description: 'We deploy and hand over.' },
  ],
  faqs: [
    { question: 'How long does it take?', answer: 'Typically 4-8 weeks.' },
  ],
  relatedServices: ['seo', 'branding'],
},
```

### New Nav Item with Dropdown

```ts
// In the NAV_ITEMS array:
{
  label: 'Services',
  href: '/services',
  children: [
    { label: 'Web Design', href: '/services/web-design' },
    { label: 'SEO', href: '/services/seo' },
    { label: 'Branding', href: '/services/branding' },
  ],
},
```

---

## 5. Naming Conventions

| Thing                     | Convention | Example                                 |
| ------------------------- | ---------- | --------------------------------------- |
| Component files           | PascalCase | `Hero.tsx`, `ServiceCards.tsx`          |
| Page directories          | kebab-case | `about/`, `contact-us/`, `our-team/`    |
| Section identifiers (CMS) | kebab-case | `page-hero`, `service-cards`            |
| List names                | kebab-case | `feature-items`, `office-hours`         |
| Image names               | kebab-case | `hero-image`, `team-photo`              |
| Extra details keys        | snake_case | `icon_path`, `show_phone`, `stat_value` |
