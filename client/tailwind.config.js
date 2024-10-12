const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", flowbite.content()],
  theme: {
    extend: {
      screens: {
        mbMini: "290px",
        mbXSmall: "400px",
        mbMedSmall: "500px",
        mbSmall: "600px",
        mbMedium: "800px",
        laptop: "1000px",
        carousel: "932px",
        tbPortrait: "1200px",
        tbLandscape: "1600px",
        Desktop: "2000px",
        lgDesktop: "2400px",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
