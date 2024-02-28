/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-square': '#779952',
        'light-square': '#edeed1',
        'selected-square': '#ffff33',
        'dark-square-hover': '#B0C29C'
      }
    },
  },
  plugins: [],
}
