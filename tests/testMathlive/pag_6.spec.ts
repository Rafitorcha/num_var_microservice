import { test, expect } from "@playwright/test";
import "dotenv/config";
test('site', async ({ page }) => {
  await page.goto(
    "http://127.0.0.1:8080/src/book/mobile/view/cap_1/pag_6.html")

  for (const math of await page.locator('math-field.show').all())
    await math.fill('1');

  for (const checkTons of await page.locator('button.check').all())
    await checkTons.click();

  for (const resetTons of await page.locator('button.reset').all())
    await resetTons.click();

})


