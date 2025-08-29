
/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  use: {
    baseURL: 'http://3.8.242.61',
    storageState: 'auth.json',
    headless: true,
  },
};

module.exports = config;