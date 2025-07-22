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
        laptop: '976px', // Custom breakpoint for tablet-to-laptop range
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
