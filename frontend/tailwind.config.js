/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nexlogix: {
          bg: '#170D0A',
          card: '#23120E',
          border: '#4A281E',
          gold: '#FFB500',
          goldHover: '#F0AA00',
          brown: '#351C15',
        }
      }
    },
  },
  plugins: [],
}
