/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'beige': {
          50: '#FDFBF7',
          100: '#F5F5DC',
          200: '#E8E6CE',
          300: '#D8D6BE',
          400: '#C5C2A5',
          500: '#B2AE8C',
        },
        'green': {
          50: '#F0F9F1',
          100: '#DCF2DE',
          200: '#B9E6BF',
          300: '#8FBC8F',
          400: '#6A9E6F',
          500: '#5A8A5F',
          600: '#4B754F',
          700: '#3C5F3F',
          800: '#2D4A30',
          900: '#1E3420',
        },
        'blue': {
          50: '#F0F7FA',
          100: '#E1F0F9',
          200: '#C3E0F3',
          300: '#ADD8E6',
          400: '#90C1D9',
          500: '#5F9BC8',
          600: '#477CAD',
          700: '#356292',
          800: '#244778',
          900: '#12315E',
        },
      },
      fontFamily: {
        'sans': ['Open Sans', 'sans-serif'],
        'heading': ['Montserrat', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': "url('https://images.pexels.com/photos/5764100/pexels-photo-5764100.jpeg?auto=compress&cs=tinysrgb&w=1600')",
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};