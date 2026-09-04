/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        site1: '#dc2626',
        site3: '#8b5cf6',
        site5: '#0ea5e9',
      }
    },
  },
  plugins: [],
}
