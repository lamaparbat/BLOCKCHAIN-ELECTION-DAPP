/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      "xsm": "300px",
      "sm": "550px",
      "md": "768px",
      "lg": "1100px"
    },
    extend: {
      backgroundImage: {
        'celebrationGif': "url('/images/giphy.gif')"
      },
      colors: {
        btnColor: "#1f398a !important"
      }
    },
  },
  plugins: [],
}
