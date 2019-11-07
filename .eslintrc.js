module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "indent": ["error", 4,{ "SwitchCase": 1 }],
    "no-trailing-spaces": ["error", { "skipBlankLines": true }],
    "keyword-spacing": ["off"],
    "space-before-blocks":"off",
    "no-unused-vars":"warn",
    "space-before-function-paren":"off",
    "arrow-spacing":"off",
    "vue/no-unused-components":"warn"
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
