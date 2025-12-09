import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';


const vitestGlobals = globals.vitest || {
  // fallback manual (en caso de versiones antiguas)
  afterAll: false,
  afterEach: false,
  beforeAll: false,
  beforeEach: false,
  describe: false,
  expect: false,
  it: false,
  test: false,
  vi: false,
};

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
     //plugins: { import: importPlugin },
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite
    ],
    languageOptions: {
      ecmaVersion: 2020,
       globals: {
        ...globals.browser,
        ...vitestGlobals
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'no-duplicate-imports': 'error', //Evitar import duplicados
      //'import/no-unresolved': 'error',
      //'import/order': ['warn', { 'newlines-between': 'always' }],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn'
    },
    
  },
]);
