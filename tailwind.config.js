/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        text: 'hsl(144, 17%, 6%)',
        background: 'hsl(137, 28%, 68%)',
        primary: 'hsl(138, 19%, 37%)',
        secondary: 'hsl(138, 49%, 79%)',
        accent: 'hsl(180, 24%, 59%)',
      },
    },
  },
  plugins: [],
};
