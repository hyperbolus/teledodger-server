/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./client/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'nunito': ['Nunito', 'sans'],
      },
    },
  },
  plugins: [],
}

