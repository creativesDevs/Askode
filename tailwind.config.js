/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'subtitle': ['"Bruno Ace SC"', 'sans-serif'],
        'title-text': ['"Bruno Ace"', 'sans-serif'],
        'title': ['"Press Start 2P"', 'sans-serif']
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle,#8331A5 0%, #430F58 100%)',
        'gradient-radial-2': 'radial-gradient(circle, #EB05FF 0%, #430F58 100%)',
        'combined-gradient': 'linear-gradient(rgba(4, 8, 13, 0.2) 100%, rgba(67, 15, 88, 0.3) 30%, rgba(0, 0, 0, 0.25) 100%)',
        'custom-linear': 'linear-gradient(-45deg, rgba(0, 0, 0, 0.2) 0%, rgba(204, 0, 255, 0.2) 20%, rgba(0, 0, 0, 0.2) 70%)', 
      },
      colors: {
        'custom-purple': '#CC00FF',
        'gradient': 'linear-gradient(rgba(204, 0, 255, 1) 0%, rgba(233, 233, 233, 1) 100%)',
      },
    },
  },
  plugins: [],
}

