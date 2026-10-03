/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#173d2a',
        leaf: '#2f7b3b',
        'leaf-dark': '#1f5b2d',
        lime: '#a9d85b',
        cream: '#fbf9ef',
        sand: '#f1ecdc',
        peach: '#f7e7d4',
        mist: '#eef5e9',
      },
      fontFamily: {
        sans: ['DM Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 18px 50px rgba(36, 83, 43, 0.10)',
        card: '0 10px 30px rgba(36, 83, 43, 0.08)',
      },
    },
  },
  plugins: [],
};
