import type { Config } from "tailwindcss";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require("tailwindcss/colors");

const config: Config = {
    content: ["./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        colors: {
            ...colors,
            transparent: "transparent",
            current: "currentColor",
            secondary: "#F5F0ED",
            primary: "#3D5361",
            accent: "#D6B7B5",
            gray: "#D4C6BD",
            danger: "#BE3144",
            success: "#00c9b0",
            info: "#61B4BD",
        },
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
};
export default config;
