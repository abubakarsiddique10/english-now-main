/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "15px"
    },
    screens: {
      "xs": "250px",
      "sm": "450px",
      'md': '640px',
      'lg': '768px',
      'xl': '1024px',
    },
    extend: {},
  },
  plugins: [
  ],
}
