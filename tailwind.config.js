/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'subtitle': ['"Bruno Ace SC"', 'sans-serif'],
        'title-text': ['"Bruno Ace"', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle,#8331A5 0%, #430F58 100%)',
        'gradient-radial-2': 'radial-gradient(circle, #EB05FF 0%, #430F58 100%)',
        'combined-gradient': 'linear-gradient(rgba(4, 8, 13, 0.2) 0%, rgba(67, 15, 88, 0.3) 30%, rgba(0, 0, 0, 0.25) 100%)',
        
      },
      colors: {
        'custom-purple': '#CC00FF',
        
      },
    },
  },
  plugins: [],
}

