import { expect, test } from '@playwright/test';
test('mark camo, persists after reload, no horizontal scroll', async ({ page }) => {
  await page.goto('/tracker');
  await page.getByRole('button', { name: /M4/ }).first().click();
  await page.getByRole('button', { name: /Military 1/ }).click();
  await page.getByRole('button', { name: 'CLOSE' }).click();
  await page.reload();
  await expect(page.getByText('1/11 camos').first()).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
test('search filters', async ({ page }) => { await page.goto('/tracker'); await page.getByLabel('Search').fill('kastov'); await expect(page.getByRole('button', { name: /Kastov 762/ })).toBeVisible(); });
