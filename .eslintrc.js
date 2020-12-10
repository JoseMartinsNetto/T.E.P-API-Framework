module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    es6: true,
    node: true
  },
  plugins: ["@typescript-eslint"],
  extends: ["plugin:@typescript-eslint/recommended", "prettier/@typescript-eslint", "standard"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    "@typescript-eslint/interface-name-prefix": ["error", "always"],
    "@typescript-eslint/explicit-function-return-type": ["off"],
    "no-async-promise-executor": ["off"],
    "lines-between-class-members": ["off"],
    "space-before-function-paren": ["off"],
    "no-useless-constructor": ["off"],
    "no-new": ["off"],
    quotes: ["error", "double", { allowTemplateLiterals: true }]
  }
}
