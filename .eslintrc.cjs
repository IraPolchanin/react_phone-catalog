/** @type {import("eslint").Linter.Config} */
module.exports = {
  env: {
    browser: true,
    es2024: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'airbnb-typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:cypress/recommended',
  ],
  overrides: [
    {
      files: ['**/*.spec.{js,ts,jsx,tsx}'],
      rules: {
        'react/jsx-filename-extension': ['off'],
        'import/no-extraneous-dependencies': 'off',
      },
    },
    {
      files: ['cypress.config.ts', '**/cypress/**/*.ts'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    project: './tsconfig.json',
    sourceType: 'module',
  },
  plugins: [
    'jsx-a11y',
    'import',
    'react-hooks',
    '@typescript-eslint',
    'prettier',
  ],
  rules: {
    // JS
    semi: 'off',
    '@typescript-eslint/semi': ['error', 'always'],
    'prefer-const': 2,
    curly: [2, 'all'],
    'max-len': [
      'error',
      {
        ignoreTemplateLiterals: true,
        ignoreComments: true,
      },
    ],
    'no-redeclare': [2, { builtinGlobals: true }],
    'no-console': ['error', { allow: ['error', 'warn'] }],
    'operator-linebreak': 0,
    'brace-style': [2, '1tbs'],
    'arrow-body-style': 0,
    'arrow-parens': 0,
    'no-param-reassign': [2, { props: true }],
    'padding-line-between-statements': [
      2,
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
      { blankLine: 'always', prev: 'directive', next: '*' },
      { blankLine: 'always', prev: 'block-like', next: '*' },
    ],
    'implicit-arrow-linebreak': 0,

    // React
    'react/prop-types': 0,
    'react/require-default-props': 0,
    'import/prefer-default-export': 0,
    'standard/no-callback-literal': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'react/destructuring-assignment': 0,
    'react/jsx-props-no-spreading': 0,
    'react/state-in-constructor': [2, 'never'],
    'react-hooks/rules-of-hooks': 2,
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',

    // Accessibility
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        assert: 'either',
        depth: 3,
      },
    ],
    'jsx-a11y/label-has-for': 'off',

    // Typescript
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: true,
        types: {
          '{}': false,
        },
      },
    ],

    // Import
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-unresolved': 'error',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
      },
    ],
  },
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    'vite.config.ts',
    'src/vite-env.d.ts',
    'cypress',
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        paths: ['src'],
        moduleDirectory: ['node_modules', 'src/'],
      },
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
};
