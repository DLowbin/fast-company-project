module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['standard', 'plugin:react/recommended'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    semi: [2, 'always'],
    'comma-dangle': ['error', 'only-multiline'],
    'space-before-function-paren': ['error', { anonymous: 'always', named: 'never' }],
    'no-unused-vars': 0,
    indent: [0, 'tab'],
    'no-tabs': 0,
    'multiline-ternary': ['off'],
    'object-shorthand': ['off'],
  },
};
