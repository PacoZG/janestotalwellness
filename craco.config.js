// craco.config.js
module.exports = {
  jest: {
    configure: {
      globals: {
        "CONFIG": true
      }
    }
  },
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
}