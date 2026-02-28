/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Critical for next-themes to work properly
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}