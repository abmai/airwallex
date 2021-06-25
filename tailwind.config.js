module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'broccoli-brown': '#F8F3ED',
        'pastel-purple': '#826DF8',
        primary: '#333333',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
