/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        inputBorderColor: "rgb(0,0,0,0.5)",
      },
      flex: {
        2: "0 0 50px",
      },
      boxShadow: {
        transparent: "0 10px 20px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
}
