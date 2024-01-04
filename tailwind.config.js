/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        'searchBar-bg': 'rgba(6, 6, 6, 0.4)', // Custom background color
        'bg-opa70': "rgba(0,0,0,0.7)"
      },
      fontFamily : {
        inter : "'Inter', sans-serif",
        poppins : "'Poppins', sans-serif"
      },
      colors : {
        redtheme : "#DA4167",
        yellowtheme: "#F4D35E"
      }
    },
  },
  plugins: [],
}

