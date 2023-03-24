/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        'kanit': ['Kanit', 'sans-serif'],
      },
      color:{
        'outer-space': {
          '50': '#f5f8f6',
          '100': '#dee9e3',
          '200': '#bdd2c5',
          '300': '#94b4a2',
          '400': '#6d947f',
          '500': '#537966',
          '600': '#416050',
          '700': '#374e43',
          '800': '#2d3e36',
          '900': '#2a3731',
      }
      }
    },
    
  },

  plugins: [],
}
