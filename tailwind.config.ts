import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    // =========================================================
    // FONTS — Update these to match the brand
    // Import fonts in src/app/layout.tsx and set CSS variables
    // =========================================================
    fontFamily: {
      sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      serif: ["var(--font-serif)", "Georgia", "serif"],
      heading: ["var(--font-serif)", "Georgia", "serif"]
    },
    extend: {
      // =========================================================
      // COLORS — Update these to match the brand
      // primary: main brand color (dark, authoritative)
      // accent:  secondary action color (vibrant, for CTAs)
      // warm:    warm accent for decorative elements
      // =========================================================
      colors: {
        // Primary brand color (e.g., navy, dark blue, forest green)
        primary: {
          DEFAULT: "#1e3a5f",
          dark: "#152a45",
          light: "#2a5080"
        },
        // Accent / CTA color (e.g., teal, coral, gold)
        accent: {
          50: "#e8f4f8",
          100: "#d1e9f1",
          200: "#a3d3e3",
          300: "#75bdd5",
          400: "#47a7c7",
          500: "#2d8eb0",
          DEFAULT: "#2d8eb0",
          600: "#24728d",
          700: "#1b566a",
          800: "#123a47",
          900: "#091d24",
          light: "#47a7c7",
          dark: "#24728d"
        },
        // Warm accents
        coral: "#E8937D",
        peach: "#F5D5C8",
        "cream-warm": "#FAF9F6",
        // Neutrals
        cream: "#FAF8F5",
        "light-gray": "#F5F5F5",
        "medium-gray": "#6B7280",
        dark: "#1F2937"
      },
      // =========================================================
      // TYPOGRAPHY — Custom font sizes for headings and body
      // =========================================================
      fontSize: {
        "display-1": ["3.5rem", { lineHeight: "4rem" }],
        "display-2": ["2.5rem", { lineHeight: "3rem" }],
        "display-3": ["1.75rem", { lineHeight: "2.25rem" }],
        "body-hero": ["1.5rem", { lineHeight: "2rem" }],
        body: ["1.25rem", { lineHeight: "1.875rem" }],
        "body-lg": ["1.125rem", { lineHeight: "1.75rem" }]
      },
      // =========================================================
      // BORDER RADIUS — Rounded corner tokens
      // =========================================================
      borderRadius: {
        soft: "0.5rem",
        softer: "1rem"
      },
      // =========================================================
      // SHADOWS — Elevation and glow effects
      // =========================================================
      boxShadow: {
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
        "soft-lg": "0 10px 40px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
        glow: "0 0 40px rgba(45, 142, 176, 0.2)",
        warm: "0 4px 20px -2px rgba(0, 0, 0, 0.08)",
        "warm-lg": "0 8px 30px -4px rgba(0, 0, 0, 0.12)",
        "warm-hover": "0 12px 40px -8px rgba(0, 0, 0, 0.15)"
      },
      transitionDuration: {
        smooth: "300ms"
      },
      // =========================================================
      // ANIMATIONS — Scroll-triggered and decorative animations
      // =========================================================
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        "slide-in-right": "slideInRight 0.3s ease-out",
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        marquee: "marquee 30s linear infinite"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(100%)" },
          "100%": { opacity: "1", transform: "translateX(0)" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "0.9" }
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
