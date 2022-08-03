const path = require('path');
const colors = require('tailwindcss/colors');
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', path.resolve(__dirname, './node_modules/litepie-datepicker/**/*.js')],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // Change with you want it
        'litepie-primary': colors.gray, // color system for light mode
        'litepie-secondary': colors.black // color system for dark mode
      },
    },
  },
  variants: {
    extend: {
      cursor: ['disabled'],
      textOpacity: ['disabled'],
      textColor: ['disabled'],
      opacity: ['disabled'],
    },
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
  },
  plugins: [],
}