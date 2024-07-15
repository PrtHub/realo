/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          1: "#141414",
          2: "#1A1A1A",
          3: "#262626",
        },
        purple: {
          1: "#703BF7",
          
        },
        gray: {
          1: "#262626",
          
        },
      }
    },
  },
  plugins: [],
}