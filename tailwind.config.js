/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        raleway: ['Raleway'],
        staatliches: ['Staatliches'],
        clickerscript: ['Clicker Script'],
        moondance: ['Moon Dance'],
        quintessential: ['Quintessential'],
      },
      keyframes: {
        // Spin forward (default)
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        // Custom reverse spin
        'spin-reverse': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
        // Subtle celebration pulse
        'subtle-celebrate': {
          '0%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.05)' },
          '50%': { transform: 'scale(1)' },
          '75%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        spin: 'spin 1s linear infinite',
        'spin-reverse': 'spin-reverse 1s linear infinite',
        'subtle-celebrate': 'subtle-celebrate 0.3s ease-in-out 1',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.animation-running': {
          'animation-play-state': 'running',
        },
        '.animation-paused': {
          'animation-play-state': 'paused',
        },
        '.animation-normal': {
          'animation-direction': 'normal',
        },
        '.animation-reverse': {
          'animation-direction': 'reverse',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
}
