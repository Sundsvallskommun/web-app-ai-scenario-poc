import Core from "@sk-web-gui/core";
import { Config } from "tailwindcss/types/config";
import ContainerQueries from "@tailwindcss/container-queries";

export default {
  mode: "jit",
  content: [
    "./*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@sk-web-gui/*/dist/**/*.js",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      transitionProperty: {
        opacity: "opacity",
      },
    },
  },
  plugins: [
    Core({
      cssBase: true,
      colors: [],
    }),
    ContainerQueries,
  ],
} satisfies Config;
