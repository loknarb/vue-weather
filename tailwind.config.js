module.exports = {
  plugins: [require("daisyui")],
  content: [
    "./public/index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {}
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme]/light"],
          "primary": "#e2ece9",
          "secondary": "#fde2e4",
          "accent": "#cddafd", // or #dfe7fd
          "base-100": "#f0efeb" // or  #fff1e6
        }
      }
    ]
  },
}