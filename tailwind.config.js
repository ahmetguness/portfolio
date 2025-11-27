/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'space-dark': '#0A192F',
        'accent-cyan': '#64FFDA',
        'light-gray': '#CCD6F6',
        'mid-gray': '#8892B0',
        'card-blue': '#112240',
      },
      fontFamily: {
        'mono': ['"Space Mono"', 'monospace'],
      }
    },
  },
  plugins: [],
}
