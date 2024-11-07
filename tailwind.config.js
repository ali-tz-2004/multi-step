/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        borderInput: "#565096",
      },
      width: {
        '50': '50rem',
        "1/3": '30%'
      },
      height: {
        '30': '30rem',
      },
      backgroundImage: {
        "slider-desktop": "url('./assets/images/bg-sidebar-desktop.svg')",
      },
    },
  },
  plugins: [],
}

