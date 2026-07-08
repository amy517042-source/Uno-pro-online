/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        unoGreen: "#0b7a35",
        unoRed: "#e53935",
        unoBlue: "#1e88e5",
        unoYellow: "#fdd835"
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"]
      }
    },
  },
  plugins: [],
}
