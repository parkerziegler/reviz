/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "../ui/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        primary: "#419af7",
        secondary: "#8638e5",
      },
    },
  },
  plugins: [],
};
