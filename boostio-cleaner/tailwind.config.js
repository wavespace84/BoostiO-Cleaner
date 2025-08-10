/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0B0F",
        foreground: "#FFFFFF",
        card: {
          DEFAULT: "rgba(18, 19, 26, 0.5)",
          foreground: "#FFFFFF",
          hover: "rgba(26, 27, 36, 0.6)",
        },
        primary: {
          DEFAULT: "#8B9BF3",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#B19CD9",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#9B8BF3",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#64748B",
          foreground: "#A8B2D1",
        },
        purple: {
          DEFAULT: "#8B9BF3",
          light: "#B19CD9",
        },
        mint: {
          DEFAULT: "#7DD3C0",
          light: "#A7F3D0",
        },
        ivory: {
          DEFAULT: "#F5E6D3",
          light: "#FAF4ED",
        },
        pink: {
          DEFAULT: "#F9A8D4",
          light: "#FCE7F3",
        },
        border: {
          DEFAULT: "#2A2D3A",
          light: "rgba(139, 155, 243, 0.2)",
        },
        glass: {
          bg: "rgba(255, 255, 255, 0.05)",
          strong: "rgba(255, 255, 255, 0.1)",
          border: "rgba(255, 255, 255, 0.15)",
        },
      },
      fontFamily: {
        sans: ["Pretendard", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      animation: {
        "gradient-shift": "gradientShift 4s ease infinite",
        "fade-in-up": "fadeInUp 1s ease-out",
        "blink": "blink 1s infinite",
        "matrix-fall": "matrixFall 20s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "spring": "spring 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
      keyframes: {
        gradientShift: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
        matrixFall: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        spring: {
          "0%": { transform: "scale(1)" },
          "30%": { transform: "scale(1.25)" },
          "40%": { transform: "scale(0.75)" },
          "50%": { transform: "scale(1.15)" },
          "65%": { transform: "scale(0.95)" },
          "75%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(20px)',
        'blur-heavy': 'blur(40px)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #8B9BF3, #B19CD9)',
        'gradient-secondary': 'linear-gradient(135deg, #B19CD9, #8B9BF3)',
        'gradient-dark': 'linear-gradient(180deg, #0A0B0F 0%, #0F1015 50%, #0A0B0F 100%)',
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
};