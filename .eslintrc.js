module.exports = {
  root: true,
  extends: [
    '@react-native-community',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  plugins: ['prettier', 'react', 'react-hooks', '@typescript-eslint'],
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    quotes: ['error', 'single', { avoidEscape: true }],
    "prettier/prettier": ["error", {
      bracketSpacing: true,
      jsxBracketSameLine: true,
      singleQuote: true,
      trailingComma: 'all', //Để all mới support type script
      arrowParens: 'avoid',
      useTabs: false,
      tabWidth: 2,
      printWidth: 120,
      endOfLine: "auto"
    }],
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'react/display-name': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-namespace': 'off',
    'eqeqeq': ['error', 'always'], //Bắt buộc toán tử === và !==
    'no-console': 'warn',
    'react/no-children-prop': 'off',
    // if you use React 17+; otherwise, turn this on
    'react/react-in-jsx-scope': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
      },
    },
  ],  
};
