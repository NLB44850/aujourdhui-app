export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        console: "readonly",
        fetch: "readonly",
        caches: "readonly",
        self: "readonly",
        clients: "readonly",
        Cache: "readonly",
        ServiceWorkerRegistration: "readonly",
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error",
      "no-console": "off",
      semi: ["error", "always"],
      quotes: ["error", "double"],
    },
  },
];
