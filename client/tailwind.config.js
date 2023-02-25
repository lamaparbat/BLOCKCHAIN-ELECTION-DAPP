/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      "sm": "300px",
      "md": "768px",
      "lg": "1100px"
    },
    extend: {
      backgroundImage: {
        'celebrationGif': "url('/images/giphy.gif')"
      }
    },
  },
  plugins: [],
}
