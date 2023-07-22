/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./App.tsx",
    "./screens/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        priClr: "#A033CE",
        secClr: "#B590C1",
        actClr: "#5EBAB0",
        darkBgClr: "#111827",
      },
    },
  },
  plugins: [],
};
