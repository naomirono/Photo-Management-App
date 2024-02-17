/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'fira': ['Fira Sans'],
        'inter': ['Inter'],
      },
      fontWeight: {
        semibold: '600',
        regular: '400',
      },
    },
  },
  plugins: [],
}