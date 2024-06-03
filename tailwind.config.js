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
        gradientStart: '#7E87EF',
        gradientEnd: '#B0B5F8',
      },
      backgroundImage: {
        'landing-cover': "url('../public/assets/landing-cover.png')",
        'green-logo': "url('../public/assets/green-logo.svg')",
        'red-logo': "url('../public/assets/red-logo.svg')",
        icon: "url('../public/assets/icon.svg')",
        'workout-cover': "url('../public/assets/gymbackground.jpeg')",
        'bullet-points': "url('../public/assets/bullet-points.svg')",
        'lb-up-arrow': "url('../public/assests/upArrow.svg)",
        'lb-down-arrow': "url('../public/assests/downArrow.svg)",
        elipse: "url('../public/assets/elipse.svg')",
        'profile-bg': "url('../public/assets/profile-bg.png')",
        'achievements-cover': "url('../public/assets/achievements-bg.png')"
      },
      fontFamily: {
        serif: ['Inter', 'sans-serif'],
        'sfpro': ['"SF Pro Display"', 'sans-serif'],
      },
      backgroundSize: {
        '25%': '25%',
        '50%': '50%',
        '75%': '75%',
        'full': '100%',
      },
    },

  },

  plugins: [],
});
