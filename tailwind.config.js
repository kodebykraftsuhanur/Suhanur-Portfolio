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
        /** Mobile menu link: fade + rise (stagger via animation-delay). */
        mobileNavItemIn: {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        drawerIn: "drawerIn 0.22s ease-out forwards",
        mobileNavItemIn:
          "mobileNavItemIn 0.45s cubic-bezier(0.33, 1, 0.68, 1) both",
      },
      transitionTimingFunction: {
        "nav-smooth": "cubic-bezier(0.33, 1, 0.68, 1)",
        "nav-panel": "cubic-bezier(0.4, 0, 0.2, 1)",
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
