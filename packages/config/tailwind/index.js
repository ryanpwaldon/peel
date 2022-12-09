const forms = require('@tailwindcss/forms')
const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

const fontSans = ['var(--inter-font)', ...defaultTheme.fontFamily.sans]
const fontSymbols = ['var(--symbols-font)', ...fontSans]

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: colors.neutral,
      },
      fontFamily: {
        sans: fontSans,
        symbols: fontSymbols,
      },
      lineHeight: {
        inherit: 'inherit',
      },
      spacing: {
        'device-bar-top': '47px',
        'device-bar-bottom': '26px',
        'content-bottom': '96px',
      },
      borderWidth: {
        hairline: '0.8px',
      },
      fontSize: {
        '2xs': ['0.625rem', '0.75rem'],
        '3xs': ['0.5rem', '0.625rem'],
        '3.5xl': ['2.125rem', '2.375rem'],
      },
    },
  },
  plugins: [forms],
}
