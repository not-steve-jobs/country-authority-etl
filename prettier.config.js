/** @type {import('prettier').Config} */
const config = {
  ...require('@trading-config-pro/eslint-config/prettier.config'),
  proseWrap: 'always',
  printWidth: 120,
};

module.exports = config;
