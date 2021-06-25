module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'broccoli-brown': '#F8F3ED',
        'pastel-purple': '#826DF8',
        primary: '#333333',
        secondary: '#828282',
        'input-background': '#F5F5F5',
      },
      boxShadow: {
        modal: '0px 4px 16px rgba(0, 0, 0, 0.05)',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      backgroundColor: ['disabled'],
      backgroundOpacity: ['disabled'],
    },
  },
  plugins: [],
};
