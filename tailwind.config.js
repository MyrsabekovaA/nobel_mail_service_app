/** @type {import('tailwindcss').Config} */
// const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    './index.html', './src/**/*.{jsx, tsx}',
    './node_modules/tailwind-datepicker-react/dist/**/*.js', 
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      satoshi: ['Satoshi', 'sans-serif'],
    },
    
    colors: {
      current: 'currentColor',
      transparent: 'transparent',
      white: '#FFFFFF',
      black: '#1C2434',
      'black-2': '#010101',
      body: '#64748B',
      bodydark: '#AEB7C0',
      bodydark1: '#DEE4EE',
      bodydark2: '#190b2d',
      primary: '#e6f4d2',
      secondary: '#4ab848',
      lightgreen: '#f8fcf2',
      stroke: '#E2E8F0',
      gray: '#969ba1',
      green300: '#86EFAC',
      graydark: '#202124',
      compdark: '#303134',
      lightgray: '#7e8189',
      'gray-3': '#FAFAFA',
      whiten: '#F1F5F9',
      whiter: '#F5F7FD',
      boxdark: '#121212',
      'boxdark-2': '##303134',
      c: '#16181c',
      'form-strokedark': '#3e4f69',
      darkblue: '#1b3373',
      'meta-1': '#DC3545',
      'meta-2': '#EFF2F7',
      meta3: '#5fb681',
      'meta-4': '#313D4A',
      'meta-5': '#259AE6',
      meta6: '#FFBA00',
      'meta-7': '#FF6766',
      'meta-8': '#F0950C',
      'meta-9': '#E5E7EB',
      success: '#219653',
      danger: '#c51d3e',
      warning: '#FFA70B',
    },
    screens: {
      '2xsm': '375px',
      xsm: '425px',
      '3xl': '2000px',
      '2xl': '1536px',
      xl: '1280px',
      lg: '1024px',
      md: '768px',
      sm: '640px',
    },
    extend: {
      shadow: ' 0 4px 8px rgba(0, 0, 0, 0.1);'
    },
  },
  plugins: [],
}


