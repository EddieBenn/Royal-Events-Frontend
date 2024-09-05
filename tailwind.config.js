/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
"./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'Holtwood':['Holtwood One SC', 'serif'],
        'Imperial':['Imperial Script', 'cursive'],
        'Inter':['Inter', 'sans-serif'],
        'Oswald': ['Oswald', 'sans-serif']
      }
    },
  },
  plugins: [],
}
