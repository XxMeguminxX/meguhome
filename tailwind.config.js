/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        lavender: {
          50: '#f5f0ff',
          100: '#ede8fa',
          200: '#e8e0f0',
          300: '#d8c8f0',
          400: '#b89ddc',
          500: '#9b7ec8',
        },
        blush: '#e8a0bf',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
