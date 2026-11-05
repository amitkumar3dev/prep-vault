import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import eslintComments from '@eslint-community/eslint-plugin-eslint-comments';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import jestDom from 'eslint-plugin-jest-dom';
import promise from 'eslint-plugin-promise';
import testingLibrary from 'eslint-plugin-testing-library';
import globals from 'globals';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// eslint-config-next@15 and the react / react-hooks recommended presets are still
// eslintrc-style, so they are loaded through FlatCompat.
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended
});

const eslintConfig = [
  {
    ignores: [
      // eslintrc ignored dot-files / dot-folders by default, flat config does not
      '**/.*',
      '**/.*/**',
      'coverage/**',
      '**/*.config.js',
      '**/*.config.mjs',
      '**/*.config.ts',
      '**/*.setup.js',
      '**/*.setup.ts',
      'public/svg/**',
      'scripts/**',
      '**/styles.d.ts'
    ]
  },

  ...compat.extends('next'),
  js.configs.recommended,
  ...compat.extends('plugin:react/recommended', 'plugin:react-hooks/recommended'),
  testingLibrary.configs['flat/react'],
  jestDom.configs['flat/recommended'],
  promise.configs['flat/recommended'],
  {
    // Registered as "eslint-comments" (not "@eslint-community/eslint-comments")
    // so existing `eslint-disable eslint-comments/...` comments keep working.
    plugins: { 'eslint-comments': eslintComments },
    rules: {
      'eslint-comments/disable-enable-pair': 'error',
      'eslint-comments/no-aggregating-enable': 'error',
      'eslint-comments/no-duplicate-disable': 'error',
      'eslint-comments/no-unlimited-disable': 'error',
      'eslint-comments/no-unused-enable': 'error'
    }
  },
  prettier,

  {
    plugins: { '@typescript-eslint': tsPlugin },
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.jest
      },
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname
      }
    },
    linterOptions: {
      // ESLint 9 defaults to "warn"; ESLint 8 (previous setup) did not report these
      reportUnusedDisableDirectives: 'off'
    },
    rules: {
      'import/extensions': 'off',
      'import/prefer-default-export': 'off',
      'no-underscore-dangle': 'off',
      'operator-linebreak': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/require-default-props': 0,
      'react/prop-types': 0,
      '@typescript-eslint/no-explicit-any': 'off',
      'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'import/no-cycle': 0,
      '@next/next/next-script-for-ga': 0,
      'react/no-danger': 'warn',
      'testing-library/await-async-events': 'warn',
      'jsx-a11y/control-has-associated-label': 0,
      'no-unused-vars': 'warn', // Prefer ts-lint
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ]
    }
  }
];

export default eslintConfig;
