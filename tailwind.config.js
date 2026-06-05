/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        coral: { DEFAULT: '#FF6B6B', dark: '#e05555' },
        mint: { DEFAULT: '#4ECDC4', dark: '#38b2ab' },
        clay: '#FFE66D',
        navy: '#1a1a2e',
      },
      boxShadow: {
        '3d':      '4px 4px 0px #1a1a2e',
        '3d-sm':   '2px 2px 0px #1a1a2e',
        '3d-lg':   '6px 6px 0px #1a1a2e',
        '3d-coral':'4px 4px 0px #e05555',
        '3d-mint': '4px 4px 0px #38b2ab',
      },
      fontFamily: {
        serif: ['"Fredoka One"', 'Georgia', 'serif'],
        sans:  ['Nunito', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
