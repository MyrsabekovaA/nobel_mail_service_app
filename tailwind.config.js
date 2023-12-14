/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html', './src/**/*.{jsx, tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      width: {
        '70': '280px',
        '24': '100px',
      },
    },
  },
  plugins: [],
}

