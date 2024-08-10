/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateRows: {
        layout: "49px repeat(15, minmax(0, 1fr))",
      },
      backgroundColor: {
        // atom one dark bg color
        dark: "#282c34",
      },
      fontFamily: {
        Geist: ["Geist-Mono"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
