const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {

  await page.goto('/');
});

test('Homepage loads', async ({ page }) => {

  await expect(page).toHaveTitle("Home Page - Ten10TechTest");
  await expect(page.locator('h1.display-5.fw-bold')).toHaveText('Interest Calculator');
});

test('User canycle through duration list dynamically', async ({ page }) => {

  const durations = ['Daily', 'Monthly', 'Yearly'];
  for (const duration of durations) {
    const item = page.locator(`#durationList .list-group-item`, {
      hasText: duration,
    });

    await item.click();
    await expect(item).toHaveClass(/active/);

    for (const other of durations.filter(d => d !== duration)) {
      const otherItem = page.locator(`#durationList .list-group-item`, {
        hasText: other,
      });
      await expect(otherItem).not.toHaveClass(/active/);
    }
  }
});

test('User can move the slider and see the amount update', async ({ page }) => {

  const slider = page.locator('#customRange1');
  const valueDisplay = page.locator('#selectedValue');
  const box = await slider.boundingBox();
  const y = box.y + box.height / 2;

  await page.mouse.move(box.x, y);
  await page.mouse.down();
  await page.mouse.up();
  await expect(valueDisplay).toHaveText('0');

  await page.mouse.move(box.x + box.width / 2, y);
  await page.mouse.down();
  await page.mouse.up();
  await expect(valueDisplay).toHaveText('7500');
});

test('User can select 8% interest rate from dropdown', async ({ page }) => {
  await page.locator('#dropdownMenuButton').click({ force: true });
  await page.locator('.dropdown-menu.show').waitFor({ state: 'visible' });
  await page.locator('.dropdown-item:has-text("8") input[type="checkbox"]').check();
  await page.waitForTimeout(1000);
});

test('e2e journey to show figures (with base set from page load)', async ({ page }) => {
  await page.locator('#dropdownMenuButton').click({ force: true });
  await page.locator('.dropdown-menu.show').waitFor({ state: 'visible' });
  await page.locator('.dropdown-item:has-text("8") input[type="checkbox"]').check();
  await page.locator('#gridCheck1').check();
  await page.locator('button:has-text("Calculate")').click();
  await page.locator('#interestAmount').waitFor({ state: 'visible' });
  await page.locator('#totalAmount').waitFor({ state: 'visible' });

  await expect(page.locator('#interestAmount')).toHaveText('Interest Amount: 1.64');
  await expect(page.locator('#totalAmount')).toHaveText('Total Amount with Interest: 7501.64');

});

