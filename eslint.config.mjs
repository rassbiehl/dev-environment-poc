
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import jsdoc from 'eslint-plugin-jsdoc';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default tseslint.config(
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/coverage/**',
      '**/build/**',
    ],
  },

  // Shared JavaScript and TypeScript rules
  {
    files: ['frontend/**/*.{ts,tsx}', 'backend/**/*.ts'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
    ],
    plugins: {
      jsdoc,
    },
    rules: {
      'jsdoc/require-jsdoc': [
        'error',
        {
          require: {
            ClassDeclaration: true,
            ClassExpression: true,
            MethodDefinition: true,
            FunctionDeclaration: true,
          },
          contexts: [
            'TSDeclareFunction',
            'MethodDefinition[kind="constructor"]',
          ],
        },
      ],
      'jsdoc/require-description': 'error',
    },
  },

  // Frontend: React and browser
  {
    files: ['frontend/**/*.{ts,tsx}'],
    languageOptions: {
      globals: globals.browser,
    },
    extends: [
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
  },

  // Backend: Node.js
  {
    files: ['backend/**/*.ts'],
    languageOptions: {
      globals: globals.node,
    },
  },
);
