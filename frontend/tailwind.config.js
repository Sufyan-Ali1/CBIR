/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}', // Scan all JS/JSX files in the app directory
    './components/**/*.{js,jsx}', // Scan components if you have them
  ],
  theme: {
  extend: {
    colors: {
      customBlue: '#1e40af', // Custom color for buttons
    },
    spacing: {
      '18': '4.5rem', // Custom spacing
    },
  },
},
  plugins: [], // Add Tailwind plugins here if needed
};