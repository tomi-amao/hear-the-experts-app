import type { Config } from 'tailwindcss'
const { mauve, violet } = require('@radix-ui/colors');


export default {
  darkMode: 'selector',
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors:{
      bgprimary: "#222221",
      bgsecondary: "#222221",
      txtprimary: "#27B08B",
      txtsecondary: "#27B08B",
      ...mauve,
      ...violet,
    },
    extend: {
      extend: {

        keyframes: {
          slideDown: {
            from: { height: '0px' },
            to: { height: 'var(--radix-accordion-content-height)' },
          },
          slideUp: {
            from: { height: 'var(--radix-accordion-content-height)' },
            to: { height: '0px' },
          },
        },
        animation: {
          slideDown: 'slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)',
          slideUp: 'slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)',
        },
      },
    },
  },
  plugins: [],
} satisfies Config

