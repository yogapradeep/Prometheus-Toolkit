/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        jetbrains: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "2xs": ["10px", "16px"],
      },
      height: {
        18: ["4.5rem", " 72px"],
      },
    },
  },
  plugins: [],
};
