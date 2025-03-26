import importPlugin from 'eslint-plugin-import'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      ...tseslint.configs.recommended,
    ],
    languageOptions: {
      parser: tseslint.parser,
    },
  },
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        pragma: 'React',
        version: 'detect',
      },
    },
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'react': react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'import': importPlugin,
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      // Base rules
      'indent': ['warn', 2, { SwitchCase: 1 }],
      'no-use-before-define': 'off',
      'no-unused-vars': 'warn',
      'no-undef': 'off',
      'comma-dangle': ['error', 'always-multiline'],
      'jsx-quotes': ['error', 'prefer-double'],
      'node/no-callback-literal': 'off',
      'no-useless-return': 'off',
      'no-redeclare': 'off',
      'camelcase': 'off',
      'quotes': ['error', 'single'],
      'react-hooks/exhaustive-deps': 'off',

      // TypeScript rules
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      'object-curly-spacing': [1, 'always'],
      'semi': ['warn', 'never'],
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/no-redeclare': ['warn'],

      // Import rules
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'index', 'sibling', 'object', 'type'],
          'newlines-between': 'always',
          pathGroups: [
            {
              pattern: 'react**',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@/**',
              group: 'internal',
            },
            {
              pattern: '@/',
              group: 'external',
            },
          ],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          pathGroupsExcludedImportTypes: ['react'],
        },
      ],

      // React rules
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/display-name': 'off',
      'react/jsx-closing-bracket-location': 1,
      'react/jsx-indent': ['warn', 2, {
        indentLogicalExpressions: true,
      }],
      'react/jsx-indent-props': ['warn', 2],
      'react/jsx-wrap-multilines': ['warn', {
        arrow: 'parens-new-line',
        condition: 'parens-new-line',
        logical: 'parens-new-line',
      }],
      'react/jsx-tag-spacing': 1,
      'react/jsx-curly-spacing': [1, {
        when: 'never',
      }],
    },
  },
)
