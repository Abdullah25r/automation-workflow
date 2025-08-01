// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        kanit: ['Kanit', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      screens: {
        laptop: '976px',  
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
