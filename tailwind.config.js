/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Warm paper with a faint rose cast — the Crimson Demons palette, sun-bleached.
        paper: '#F6F2F0',
        surface: '#FFFFFF',
        line: '#ECE4E2',
        ink: '#2B2024',
        mute: '#77656A',
        faint: '#A39195',
        crimson: { DEFAULT: '#C1394A', deep: '#8E2333', tint: '#FBEDEE' },
        ember: { DEFAULT: '#E0A21C', deep: '#8A5E07', tint: '#FBF1D9' },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'Georgia', 'serif'],
        sans: ['"Instrument Sans"', 'system-ui', 'sans-serif'],
      },
      // Dense dashboard scale, base 14px, roughly a 1.3 ratio at the top end.
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
        xs: ['0.78125rem', { lineHeight: '1.125rem' }],
        sm: ['0.875rem', { lineHeight: '1.375rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.25rem', { lineHeight: '1.5rem' }],
        xl: ['1.625rem', { lineHeight: '1.875rem', letterSpacing: '-0.015em' }],
        '2xl': ['2.125rem', { lineHeight: '2.25rem', letterSpacing: '-0.02em' }],
        '3xl': ['2.875rem', { lineHeight: '3rem', letterSpacing: '-0.03em' }],
      },
      // Radius encodes role: panel > card > tile.
      borderRadius: { panel: '22px', card: '16px', tile: '10px' },
      boxShadow: {
        card: '0 1px 2px rgba(43, 32, 36, 0.04)',
        lift: '0 10px 30px -14px rgba(193, 57, 74, 0.35), 0 2px 6px rgba(43, 32, 36, 0.05)',
      },
    },
  },
  plugins: [],
}
