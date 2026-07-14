/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        containment: '#080A0C',
        steel: '#12161B',
        gunmetal: '#1E252D',
        concrete: '#6B7280',
        hazard: '#F5C542',
        warning: '#D72638',
        bio: '#8BC34A',
      },
      fontFamily: {
        display: ['Rajdhani', 'Arial Narrow', 'Arial', 'sans-serif'],
        body: ['Inter', 'Segoe UI', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        hazard: '0 0 0 1px rgba(245, 197, 66, 0.22), 0 18px 45px rgba(0, 0, 0, 0.35)',
      },
    },
  },
  plugins: [],
};
