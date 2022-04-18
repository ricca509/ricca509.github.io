const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      monospace: ["Inconsolata", "monospace"],
      body: ["Inconsolata", "monospace"],
      title: ["Poppins", "sans-serif"]
    },    
    extend: {
      colors: {
        "fl-pink": "#d03a84",
        "fl-purple": "#6951a1",
        "fl-orange-1": "#f05672",
        "fl-orange-2": "#f47a61",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    // plugin(function ({ addBase, theme }) {
    //   addBase({
    //     h1: { fontSize: theme("fontSize.2xl"), fontFamily: theme("fontFamily.title") },
    //     h2: { fontSize: theme("fontSize.xl"), fontFamily: theme("fontFamily.title") },
    //     h3: { fontSize: theme("fontSize.lg"), fontFamily: theme("fontFamily.title") },        
    //   });
    // }),
  ],
};
