const defaultTheme = require('tailwindcss/defaultTheme')


module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0066ff',
        'secondary': '#c5ff3e',
        'greyed': '#7c7c7c',
        'default-bg': '#f8f8ff',
        'secondary-bg': '#ffffff',
        'default': 'black',
        'default-hover': 'black',
        'default-light': '#f8f8ff',
        'default-light-hover': '#f8f8ff',
      },
    },

  },
  plugins: [],
}
