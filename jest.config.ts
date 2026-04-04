import type { Config } from "jest";

const config: Config = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    roots: ["<rootDir>/src"],
    testMatch: ["**/__tests__/**/*.test.ts", "**/?(*.)+(spec|test).ts"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },
    collectCoverageFrom: [
        "src/**/*.{ts,tsx}",
        "!src/**/*.d.ts",
        "!src/**/*.stories.{ts,tsx}",
        "!src/**/__tests__/**",
    ],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
    transformIgnorePatterns: [
        "node_modules/(?!(d3-array|d3-color|d3-contour|d3-interpolate|d3-path|d3-scale|d3-shape|d3-time|d3-time-format|internmap|delaunator|robust-predicates)/)",
    ],
    transform: {
        "^.+\\.tsx?$": [
            "ts-jest",
            {
                tsconfig: {
                    jsx: "react",
                    esModuleInterop: true,
                },
            },
        ],
    },
};

export default config;
