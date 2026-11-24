/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        plum: "#4B1248",
        purple: "#521452",
        magenta: "#D90083",
        pinkBg: "#FFF3F9",
        bodyText: "#333333",

        primary: {
          DEFAULT: "#4B1248",
          dark: "#351035",
          light: "#F5EAF4",
        },

        accent: {
          DEFAULT: "#D90083",
          light: "#FFE5F2",
        },

        success: "#15803D",
        warning: "#D97706",
        danger: "#DC2626",
      },

      fontFamily: {
        sans: ["Inter", "Arial", "sans-serif"],
      },

      boxShadow: {
        soft: "0 4px 20px rgba(75, 18, 72, 0.08)",
        card: "0 8px 30px rgba(75, 18, 72, 0.10)",
      },

      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },

      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(15px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
    },
  },

  plugins: [],
};
