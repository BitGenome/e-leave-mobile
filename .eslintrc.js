// eslint-disable-next-line no-undef
module.exports = {
  extends: ["eslint:recommended", "plugin:react/recommended"],
  plugins: ["react", "react-hooks"],
  rules: {
    // Enforces the need to import 'React' when using hooks/components
    "react/react-in-jsx-scope": "error",
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
  },
  settings: {
    react: {
      version: "detect", // Automatically detects the React version
    },
  },
};
