import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            colors: {
                transparent: "transparent",
                current: "currentColor",
                secondary: "#F5F0ED",
                primary: "#2B3D49",
                accent: "#3FB6C4",
                gray: "#9FB3BF",
                danger: "#BE3144",
                success: "#00c9b0",
                info: "#61B4BD",
                light_white: "#f7f7f7",
            },
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
