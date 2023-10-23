/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT');
module.exports = withMT({
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        green: '#5ECC7B',
        lightPurple: '#D6B6F0',
        darkGray: 'rgba(61, 61, 61, 0.30)',
        navBackground: 'rgba(0, 0, 0, 0.09)',
        red: '#FA5757',
        floYellow: '#DDF988',
        blue: '#7E87EF',
        lightGray: '#B1B1B1',
        yellow: '#F5C563',
      },
      backgroundImage: {
        'landing-cover': "url('../public/assets/landing-cover.png')",
        logo: "url('../public/assets/logo.svg')",
        icon: "url('../public/assets/icon.svg')",
      },
    },
  },
  plugins: [],
});
