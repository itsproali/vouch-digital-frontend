/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#1334B3",
          secondary: "#F5F5F5",
          accent: "#E6E6E6",
          neutral: "#686687",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#f87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
