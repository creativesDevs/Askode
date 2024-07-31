/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'subtitle': ['"Bruno Ace SC"', 'sans-serif'],
        'title-text': ['"Bruno Ace"', 'sans-serif'],
        
      },
    },
  },
  plugins: [],
}

