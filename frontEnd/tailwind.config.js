import flowbite from "flowbite-react/tailwind";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}", flowbite.content()],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        lightMode: "#FFFFFF",
        darkMode: "#212631",
      },
    },
  },
  plugins: [flowbite.plugin()],
}
