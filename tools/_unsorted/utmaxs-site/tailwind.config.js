/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./lib/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        industrial: {
          950: "#070b12",
          900: "#0b1220",
          850: "#101827",
          800: "#152033",
          700: "#1e2c43",
          300: "#91a4bd"
        },
        signal: {
          blue: "#4da3ff",
          cyan: "#38d7ff",
          green: "#3ddc97",
          amber: "#ffbf5c"
        }
      },
      boxShadow: {
        panel: "0 18px 70px rgba(0, 0, 0, 0.18)"
      }
    }
  },
  plugins: []
};
