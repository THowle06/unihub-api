import js from "@eslint/js";
import tselint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    ignores: ["dist/**", "node_modules/**"],
  },

  js.configs.recommended,

  ...tselint.config.recommended,

  eslintConfigPrettier,

  {
    files: ["src/**/*.ts"],

    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },

    rules: {
      "no-console": "warn",
    },
  },
];
