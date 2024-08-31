/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        DEFAULT: "rgba(27, 27, 35, 0.12) 0px 4px 12px",
      },
      dropShadow: {
        DEFAULT: "rgba(27, 27, 35, 0.12) 0px 4px 12px",
      },
      colors: {
        palette: {
          1: "#6f5fc9",
          2: "#A084E8",
          3: "#E2D6FF",
          4: "#EDE8FA",
          5: "#8BE8E5",
          6: "#D5FFE4",
          7: "#9a73fa",
        },
        bg: {
          1: "#fdfdfe",
          2: "#F4F4FF",
          3: "#9370DB",
          4: "#EAF6F6",
        },
        text: {
          1: "#161621 ",
          2: "#2f3336",
          3: "#55555f",
        },
      },
    },
  },
  plugins: [],
};
