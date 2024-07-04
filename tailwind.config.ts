import { color, motion } from "framer-motion";
import { mergeConfigs } from "tailwind-merge";
import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const svgToDataUri = require("mini-svg-data-uri");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
// this is the GridSVG function
function gridSVG({ matchUtilities, theme }: any) {
  matchUtilities(
    {
      "bg-grid": (value: any) => ({
        backgroundImage: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
        )}")`,
      }),
      "bg-grid-small": (value: any) => ({
        backgroundImage: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
        )}")`,
      }),
      "bg-dot": (value: any) => ({
        backgroundImage: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
        )}")`,
      }),
    },
    { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
  );
}

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        spotlight: "spotlight 2s ease .75s 1 forwards",
        scroll: "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
        zoomin: "zoomin 1450ms ease-out forwards",
        blurin: "blurin 1450ms ease-out forwards",
        opac: "opac 1450ms ease-in-out ",
        slidein: "slidein 700ms cubic-bezier(0.16, 1, 0.3, 1) forwards",
        slideout: "slideout 700ms cubic-bezier(0.16, 1, 0.3, 1) forwards",
        slidedown: "slidedown 1000ms cubic-bezier(0.16, 1, 0.3, 1) forwards",
        popup: "popup 600ms cubic-bezier(0.25, 0.1, 0.25, 1) forwards"
      },
      boxShadow: {
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
      },
      keyframes: {
        spotlight: {
          "0%": {
            opacity: "0",
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
        zoomin: {
          "0%": {
            transform: "scale(1.4)",
            opacity: "0",
            filter: "blur(40px)",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
            filter: "blur(0px)",
          },
        },
        blurin: {
          "0%": {
            filter: "blur(0px)",
          },
          "100%": {
            filter: "blur(40px)",
          },
        },
        opac: {
          "0%": {
            opacity: "0.4",
          },
          "100%": {
            opacity: "1",
          },
        },
        slidein: {
          "0%": {
            transform:
              "translateX(100%)" /* Start from 100% off-screen to the right */,
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)" /* Move to its final position */,
            opacity: "1" /* Become fully visible */,
          },
        },
        slideout: {
          "0%": {
            transform:"translateX(0)" ,
            opacity: "1",
          },
          "100%": {
            transform: "translateX(100%)" /* Start from 100% off-screen to the right */,
            opacity: "0",
          },
        },
        slidedown: {
          "0%": {
            transform:"translateY(-200%)" ,
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)" /* Move to its final position */,
            opacity: "1" /* Become fully visible */,
          },
        },
        popup: {
          "0%": {
            transform: "translateY(50%)",
            opacity: "0.4"
          },
          "40%": {
            transform: "translateY(20%)",
            opacity: "0.5"
          },
          "70%" :{
            transform: "translateY(10%)",
            opacity: "0.75"
          },
          "100%": {
            transform: "translateY(0%)",
            opacity: "1"
          }
        },
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    addVariablesForColors,
    gridSVG,
    // require("daisyui"),
    require("tailwind-scrollbar"),
  ],
};

export default config;
