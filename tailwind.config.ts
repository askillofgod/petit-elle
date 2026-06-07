import type { Config } from "tailwindcss";

/**
 * Petit Elle Design System — 06_DESIGN_SYSTEM.md 기준
 * 핵심은 Luxury가 아니라 Healing. 따뜻하고 절제된 호텔 스파 톤.
 */
const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/features/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem", // 24px mobile
        md: "2.5rem", // 40px tablet
        lg: "2.5rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        // Brand palette
        beige: {
          DEFAULT: "#D8BFB2", // Warm Beige (primary)
          light: "#EADCD2", // Light Beige
        },
        ivory: "#F7F3EF", // Soft Ivory (secondary bg)
        gold: "#B88D7A", // Champagne Gold (accent / CTA)
        "gold-dark": "#A87A67", // CTA hover
        brown: "#6A5A52", // Warm Brown (deep text)
        // Semantic text
        ink: "#2E2926", // text primary
        muted: "#7A6D66", // text secondary
        line: "#E6D8CF", // border
        // Status
        success: "#5F8A65",
        warning: "#C98A3A",
        error: "#C35A5A",
        // shadcn-compatible aliases
        background: "#F7F3EF",
        foreground: "#2E2926",
        border: "#E6D8CF",
        input: "#E6D8CF",
        ring: "#B88D7A",
        primary: {
          DEFAULT: "#B88D7A",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#EADCD2",
          foreground: "#6A5A52",
        },
      },
      fontFamily: {
        sans: ["var(--font-pretendard)", "Pretendard", "system-ui", "sans-serif"],
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
      },
      fontSize: {
        // responsive scale helpers (clamp) — 09 Font Scale
        hero: ["clamp(40px, 6vw, 96px)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        section: ["clamp(28px, 4vw, 56px)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "card-title": ["clamp(20px, 1.8vw, 24px)", { lineHeight: "1.3" }],
        body: ["clamp(15px, 1.3vw, 18px)", { lineHeight: "1.7" }],
      },
      spacing: {
        xs: "8px",
        sm: "16px",
        md: "24px",
        lg: "40px",
        xl: "80px",
        xxl: "120px",
      },
      borderRadius: {
        pill: "999px",
        card: "24px",
        image: "28px",
        modal: "32px",
        input: "14px",
        lg: "24px",
        md: "14px",
        sm: "10px",
      },
      boxShadow: {
        card: "0 16px 40px rgba(80, 60, 50, 0.08)",
        hover: "0 24px 60px rgba(80, 60, 50, 0.12)",
        header: "0 4px 24px rgba(80, 60, 50, 0.06)",
      },
      maxWidth: {
        container: "1280px",
        wide: "1440px",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out both",
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
