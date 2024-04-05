/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      spacing: {
        '960': '960px',
        '540': '540px',
        '318': '318px',
        '212': '212px',
      },
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
        theme: {
          floralwhite: "#FFFBF3",
          oldlace: "#FCF6E8",
          cornsilk: "#FCF0D0",
          vanilla: "#F1DEA9",
          coral: "#ED7B62",
          bittersweet: "#ED6461",
          ecru: "#DFBC71",
          ecrudark: "#CEB172",
          mantis: "#74BC5F",
          mantisdark: "#246C0E",
        }
      },
    },
    fontFamily: {
      'sans': ['"Rubik"', 'sans-serif'],
      // rubik: ['"Rubik"', 'sans-serif'],
    }
  },
  plugins: [require("flowbite/plugin")],
};