import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import nextPlugin from "@next/eslint-plugin-next";
import tailwindcssPlugin from "eslint-plugin-tailwindcss";
import prettierConfig from "eslint-config-prettier";

export default [
    js.configs.recommended,
    ...tseslint.configs.recommended,

    {
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
            },
            globals: {
                window: "readonly",
                document: "readonly",
                process: "readonly",
            },
        },
    },

    {
        plugins: {
            react: reactPlugin,
        },
        settings: {
            react: {
                version: "detect",
            },
        },
        rules: {
            ...reactPlugin.configs.recommended.rules,
            "react/jsx-uses-react": "off",
            "react/react-in-jsx-scope": "off",
        },
    },

    {
        plugins: {
            "react-hooks": reactHooksPlugin,
        },
        rules: {
            ...reactHooksPlugin.configs.recommended.rules,
            "react-hooks/exhaustive-deps": "off",
        },
    },

    {
        plugins: {
            "@next/next": nextPlugin,
        },
        rules: {
            ...nextPlugin.configs.recommended.rules,
        },
    },

    {
        plugins: {
            tailwindcss: tailwindcssPlugin,
        },
        rules: {
            ...tailwindcssPlugin.configs.recommended.rules,
            "tailwindcss/classnames-order": "off",
            "tailwindcss/no-custom-classname": "off",
            "tailwindcss/no-unnecessary-arbitrary-value": "warn",
        },
    },

    {
        rules: {
            indent: "off",
            semi: "off",
            "@typescript-eslint/indent": ["error", 4],
            "@typescript-eslint/semi": ["error"],
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/comma-dangle": [
                "error",
                {
                    arrays: "never",
                    objects: "always-multiline",
                    imports: "never",
                    exports: "never",
                    functions: "never",
                    enums: "always-multiline",
                },
            ],

            "object-curly-spacing": ["error", "always"],
        },
    },

    prettierConfig,
];
