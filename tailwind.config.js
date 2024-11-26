/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background))",
        foreground: "rgb(var(--foreground))",
        "border-input": "#565096",
        "light-gray": "#A7A6AB",
        "btn-next-step-hover": "rgb(var(--btn-next-step-hover))",
        "secondary": "#F9818E",
        "card": "rgb(var(--card))",
        "btn-next-step": "rgb(var(--btn-next-step))",
        "input": "rgb(var(--input))",
        "input-color": "rgb(var(--input-color))",
        "toggle-color": "rgb(var(--toggle-color))",
        "card-summary": "rgb(var(--card-summary))",
      },
      width: {
        '50': '50rem',
        "1/3": '30%'
      },
      height: {
        '30': '30rem',
      },
      backgroundImage: {
        "slider-desktop": "var(--slider-desktop)",
        "slider-mobile": "var(--slider-mobile)",
      },
      animation: {
        fadeIn: "fadeIn 0.1s ease-in-out forwards",
        fadeOut: "fadeOut 0.1s ease-in-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity:" 0;" },
          "20%": { opacity:" 0;" },
          "40%": { opacity: "0.3;" },
          "60%": { opacity: "0.5;" },
          "80%": { opacity: "0.9;" },
          "100%": { opacity:" 1;" }
        },
        fadeOut: {
          "0%": { opacity: "0;"},
          "20%": { opacity: "0;"},
          "40%": { opacity: "0.3" },
          "60%": { opacity: "0.5" },
          "80%": { opacity: "0.9" },
          "100%": { opacity: "1;"}
        },
      },
    },
  },
  plugins: [],
}

