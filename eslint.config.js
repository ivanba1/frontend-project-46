import js from '@eslint/js'
import globals from 'globals'

export default [
  js.configs.recommended,
  {
    rules: {
      'semi': ['error', 'never'],
      'quotes': ['error', 'single'],
      'no-trailing-spaces': 'error',
      'eol-last': ['error', 'always'],
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
  },
]
