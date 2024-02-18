module.exports = {
  root: true,
  env: { 
    browser: true, 
    es2020: true,
    node: true,
    jest: true,
    "es6": true
   },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true
    }
  },
  settings: { react: { version: '18.2' } },
  plugins: ['react'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    "react/jsx-uses-react": "error",   
     "react/jsx-uses-vars": "error" ,
  },
}
