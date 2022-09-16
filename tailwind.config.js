/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      colors: {
        "booksy-gray": "#F5F7F9",
        "booksy-white": "#FFFFFF",
        "booksy-primary": "#424288",
        "booksy-secondary": "#C1A792",
        "booksy-bg": "#F4E7DE",
        "booksy-gold": "#FCC13C",
      },
      fontFamily: {
        "booksy-brand": ["Ms Madi", "cursive"],
      },
      backgroundImage: {
        "booksy-banner": 'url("./src/assets/banner.png")',
      },
    },
  },
  plugins: [],
};
