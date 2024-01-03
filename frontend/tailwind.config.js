/** @type {import('tailwindcss').Config} */

const {fontFamily}=require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode:'class',
  theme: {
    extend: {
    
    },
    colors: {
      darknav:'#2d374b',
      darkbg1: 'hsl(210, 33%, 38%)', // Replace with your desired HSL color
      darkright:'#2d4361',
      darkpost:'hsl(220, 7%, 56%)',
      darkwhite:'hsl(0,0%,100%)'
    },
  },
  plugins: [],
}

