/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        card: {
          DEFAULT: "oklch(var(--card))",
          foreground: "oklch(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "oklch(var(--popover))",
          foreground: "oklch(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "oklch(var(--primary))",
          foreground: "oklch(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary))",
          foreground: "oklch(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "oklch(var(--muted))",
          foreground: "oklch(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "oklch(var(--accent))",
          foreground: "oklch(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive))",
          foreground: "oklch(var(--destructive-foreground))",
        },
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring))",
      },
      fontFamily: {
        sans: ['EB Garamond', 'Georgia', 'serif'],
        display: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        body: ['EB Garamond', 'Georgia', 'serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        card: "0 2px 16px oklch(22% 0.05 35 / 0.08)",
        "card-hover": "0 8px 32px oklch(22% 0.05 35 / 0.16)",
        "gold": "0 4px 20px oklch(72% 0.17 78 / 0.3)",
        "gold-lg": "0 8px 40px oklch(72% 0.17 78 / 0.4)",
        "maroon": "0 4px 20px oklch(30% 0.13 18 / 0.25)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
