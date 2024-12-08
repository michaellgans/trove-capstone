import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "fade-out": "fadeOut 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" }, // Use string for opacity
          "100%": { opacity: "1" }, // Use string for opacity
        },
        fadeOut: {
          "0%": { opacity: "1" }, // Use string for opacity
          "100%": { opacity: "0" }, // Use string for opacity
        },
      },
      colors: {
        brightBlue: "#0255EE",
        mediumBlue: "#002484",
        darkBlue: "#001756",
        brightYellow: "#FEC001",
        mediumYellow: "#BF9C09",
        darkYellow: "#886D00",
        brightRed: "#FE3302",
        mediumRed: "#CA1401",
        darkRed: "#6A0000",
        brightGreen: "#4B701F",
        mediumGreen: "#395518",
        text: "#090A05",
        icon: "#090A05",
        shadow: "#F3F3F1",
        mediumShadow: "#C8C3BB",
        darkShadow: "#6C6F6F",
        brightTan: "#E4BF9A",
        brown: "#755438",
        darkBrown: "#4D4125",
      },
      fontFamily: {
        basker: ["BaskerVilleSC", "serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
