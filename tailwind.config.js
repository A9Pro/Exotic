/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        exotic: {
          red: "#C1121F",
          lightRed: "#FDE7EA",
          white: "#FFFFFF",
          charcoal: "#1A1A1A",
          gray: "#F5F5F5",
        },
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
      },
      boxShadow: {
        soft: "0 4px 20px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};
