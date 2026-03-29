/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        drawerIn: {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
      },
      animation: {
        drawerIn: "drawerIn 0.22s ease-out forwards",
      },
      fontFamily: {
        serif: ['"EB Garamond"', "Georgia", "serif"],
        sans: ['Inter', "system-ui", "sans-serif"],
      },
      colors: {
        cream: "#fffefa",
        ink: "#0f0f0f",
        mist: "#fffbf0",
        pine: "#436437",
        subtitle: "#071a00",
        sand: "#f5ebd0",
      },
    },
  },
  plugins: [],
};
