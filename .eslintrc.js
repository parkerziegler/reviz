/* eslint-env node */
module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react-hooks/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'next/core-web-vitals',
    'prettier',
  ],
  overrides: [
    {
      files: ['packages/compiler/__tests__/*.ts'],
      plugins: ['jest'],
      rules: {
        '@typescript-eslint/unbound-method': 'off',
        'jest/unbound-method': 'error',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    project: 'packages/*/tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    'no-console': ['error', { allow: ['warn', 'error'] }],
    camelcase: 'error',
    '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '_' }],
    '@typescript-eslint/explicit-function-return-type': ['error'],
    'import/newline-after-import': 2,
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
      },
    ],
  },
  settings: {
    next: {
      rootDir: 'packages/examples/',
    },
  },
};
