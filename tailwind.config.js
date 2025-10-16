/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        'silver': {
          DEFAULT: '#bebbbb',
          100: '#262525',
          200: '#4d4a4a',
          300: '#736f6f',
          400: '#999595',
          500: '#bebbbb',
          600: '#cbc9c9',
          700: '#d8d6d6',
          800: '#e5e4e4',
          900: '#f2f1f1'
        },
        'english_violet': {
          DEFAULT: '#444054',
          100: '#0e0d11',
          200: '#1b1922',
          300: '#292633',
          400: '#363343',
          500: '#444054',
          600: '#655f7e',
          700: '#8983a2',
          800: '#b0acc1',
          900: '#d8d6e0'
        },
        'dark_purple': {
          DEFAULT: '#2f243a',
          100: '#09070b',
          200: '#120e17',
          300: '#1c1522',
          400: '#251c2d',
          500: '#2f243a',
          600: '#58446c',
          700: '#82659e',
          800: '#ab98bf',
          900: '#d5ccdf'
        },
        'pale_dogwood': {
          DEFAULT: '#fac9b8',
          100: '#511806',
          200: '#a2310b',
          300: '#ef4c15',
          400: '#f48a66',
          500: '#fac9b8',
          600: '#fbd3c6',
          700: '#fcded4',
          800: '#fde9e2',
          900: '#fef4f1'
        },
        'salmon': {
          DEFAULT: '#db8a74',
          100: '#36160e',
          200: '#6b2d1c',
          300: '#a14329',
          400: '#ce5e40',
          500: '#db8a74',
          600: '#e3a291',
          700: '#eabaac',
          800: '#f1d1c8',
          900: '#f8e8e3'
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'strong': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 2px 10px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
