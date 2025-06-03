/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f6f7f6',
          100: '#e3e7e4',
          200: '#c7d0ca',
          300: '#a3b1a8',
          400: '#7d9084',
          500: '#4d6357',
          600: '#244d35',
          700: '#1d3e2a',
          800: '#162e20',
          900: '#0f1f15',
          950: '#0a140e',
        },
        surface: {
          dark: '#000000',
          DEFAULT: '#0a0a0a',
          light: '#121212',
        },
      },
      fontFamily: {
        display: ['Swear Display', 'serif'],
        mono: ['Overpass Mono', 'monospace'],
        obviously: ['Obviously', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        'super-wide': '0.25em',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      padding: {
        '125': '125px',
        '100': '100px',
        '50': '50px',
      },
    },
  },
  plugins: [],
};