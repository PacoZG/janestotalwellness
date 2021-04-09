module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      tableLayout: ['hover', 'focus'],
      backgroundColor: ['active'],
      textOpacity: ['dark']
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss'),
    require('autoprefixer')
  ],
}
