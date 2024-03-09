/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'primary-btn': '#8EFA85'
      },
      boxShadow: {
        'solid': '5px 5px 0 0 rgba(0,0,0,0.8)',
        'solid-hover': '7px 7px 0 0 rgba(0,0,0,0.75)'
      },
      margin: {
        'title':'20vh'
      }
    },
  },
  plugins: [],
};
