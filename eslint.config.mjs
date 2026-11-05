import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import eslintReact from '@eslint-react/eslint-plugin';
import reactHooks from 'eslint-plugin-react-hooks';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig([
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.expo/**',
      '**/.next/**',
      '**/.turbo/**',
      '**/coverage/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    files: ['apps/mobile/**/*.{ts,tsx}'],
    extends: [
      eslintReact.configs['recommended-typescript'],
      eslintReact.configs['disable-dom'],
      eslintReact.configs['disable-rsc'],
      eslintReact.configs['disable-web-api'],
    ],
  },
  {
    files: ['apps/mobile/**/*.{ts,tsx,js,jsx}'],
    extends: [reactHooks.configs.flat.recommended],
  },
  {
    files: ['apps/api/**/*.{ts,js}', 'packages/**/*.{ts,js}'],
    // Framework-independent rules for API and shared packages
    rules: {},
  },
  prettierConfig,
]);
