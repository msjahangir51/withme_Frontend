/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens:{
      'vsm': '450px',
      'sm': '576px',
      'md': '760px',
      'lg': '960px',
      'xl': '1280px',
      '2xl': '1400px',
    },
    extend: {
      colors:{
        'main-color': "#222222",
        "input-color":"#444444"
      }
    },
  },
  plugins: [],
}