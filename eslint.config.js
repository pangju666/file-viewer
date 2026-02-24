import eslint from "@eslint/js";
import vue from "eslint-plugin-vue";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import globals from "globals";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...vue.configs["flat/recommended"],
  prettier,
  {
    ignores: ["dist/**", "node_modules/**"],
  },
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        //...globals.node,
      },
      parserOptions: {
        ecmaFeatures: { jsx: false },
        warnOnUnsupportedTypeScriptVersion: true,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    ignores: ["dist/**", "node_modules/**"],
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vue.parser,
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: false,
        },
      },
    },
  },
);
