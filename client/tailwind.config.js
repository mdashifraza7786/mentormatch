/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#25476A",  //dark blue -- primary color
        secondary: "#03A9F4",  //light blue
        supporting1: "#AB47BC",  //dark pink
        supporting2: "#9FCC2E", //green
        supporting3: "#FA9F1B",  //golden yellow
        bgred: "#FF0000"       // red
      }
    },
  },
  plugins: [],
}