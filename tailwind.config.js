/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html","./src/**/*.{jsx,js}"],
  theme: {
    extend: {
      boxShadow:{
        shadowperf:'0px 0px 40px black;'
      }
    },
  },
  plugins: [],
}

