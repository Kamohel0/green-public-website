/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#CFB09A", // Spotify Green
        secondary: "#191414", // Spotify Black
      },
      fontFamily: {
        sans: ["Inter", "sans-serif","Playfair Display", "serif"],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "2rem",
          sm: "3rem",
        },
      },
    },
  },
  plugins: [],
};
