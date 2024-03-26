/** @type {import('tailwindcss').Config} */
const tailwindcssColors = require('tailwindcss/colors');
const { Color } = require('../../libs/global/colors.ts');
const Colors = (({ transparent, ...o }) => o)(Color);
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    colors: {
      ...Colors,
      transparent: tailwindcssColors.transparent
    },
    borderRadius: {
      none: '0',
      DEFAULT: '0.25rem',
      md: '0.5rem',
      full: '9999px'
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};
