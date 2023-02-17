// .eslintrc.js

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb', 'prettier', 'eslint:recommended'],
  rules: {
    'react/jsx-filename-extension': [
      2,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'import/no-extraneous-dependencies': 0,
  },
};
