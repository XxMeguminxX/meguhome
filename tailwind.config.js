/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1a2a3a',
        crimson: { DEFAULT: '#C24448', dark: '#A03038' },
        ember: { DEFAULT: '#F5D048', light: '#F7C964' },
        blush: {
          50: '#fdf8f6',
          100: '#fdf0f0',
          200: '#EDD8D4',
          300: '#C8A0A0',
          400: '#B07878',
          500: '#9A7A7A',
          600: '#7D585D',
          700: '#5F4F5D',
          800: '#3D2F3A',
          900: '#2A1A20',
        },
      },
      boxShadow: {
        glow:    '0 4px 24px rgba(194, 68, 72, 0.09), 0 1px 4px rgba(0, 0, 0, 0.04)',
        'glow-lg': '0 8px 32px rgba(194, 68, 72, 0.16), 0 2px 8px rgba(0, 0, 0, 0.05)',
      },
      fontFamily: {
        serif: ['"Fredoka One"', 'Georgia', 'serif'],
        sans:  ['Nunito', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
