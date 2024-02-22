/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
      backgroundColor: {
        smooth: "rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
}

