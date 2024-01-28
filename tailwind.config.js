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
        theme: '#050505',
        red: '#FA5757',
        floYellow: '#DDF988',
        blue: '#7E87EF',
        lightGray: '#B1B1B1',
        yellow: '#F5C563',
      },
      backgroundImage: {
        'landing-cover': "url('../public/assets/landing-cover.png')",
        'green-logo': "url('../public/assets/green-logo.svg')",
        'red-logo': "url('../public/assets/red-logo.svg')",
        icon: "url('../public/assets/icon.svg')",
        'workout-cover': "url('../public/assets/workout-cover.svg')",
        'bullet-points': "url('../public/assets/bullet-points.svg')",
        elipse: "url('../public/assets/elipse.svg')",
        'profile-bg': "url('../public/assets/profile-bg.png')"
      },
      fontFamily: {
        serif: ['Inter', 'sans-serif'],
      },
    },
  },

  plugins: [],
});
