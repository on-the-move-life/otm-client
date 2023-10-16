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
