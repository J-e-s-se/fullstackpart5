/* global module */

module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'jest': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:cypress/recommended'
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'plugins': [
    'react',
    'cypress'
  ],
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': [0]
  }
}
