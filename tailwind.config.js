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
        "border-input": "#565096",
        "light-gray": "#A7A6AB",
        "hover-btn": "#174A8B",
        "secondary": "#F9818E"
      },
      backgroundColor:{
        "light-gray": "#F8F9FE",
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
        "slider-mobile": "url('./assets/images/bg-sidebar-mobile.svg')",
      },
      animation: {
        fadeIn: "fadeIn 0.2s ease-in-out forwards",
        fadeOut: "fadeOut 0.2s ease-in-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0.5" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0.5" },
        },
      },
    },
  },
  plugins: [],
}

