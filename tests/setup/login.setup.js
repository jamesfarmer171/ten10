const { chromium } = require('@playwright/test');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const password = 'Qwerty12!';


  await page.goto('http://3.8.242.61/account/login');
  await page.fill('input[name="UserName"]', 'testaccount1@test.com');
  await page.fill('input#Password', password);
  await page.click('button[type="submit"]');
  await page.waitForSelector('button:has-text("Logout")', { timeout: 30000 });

  await context.storageState({ path: 'auth.json' });

  await browser.close();
})();

function updateRangeValue(val) {
    document.getElementById('rangeValue').innerText = val;
  }
