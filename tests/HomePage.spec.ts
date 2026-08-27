import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test('Verify home page', async ({ page }) => {

    await page.goto('/');

    const homePage = new HomePage(page);

    await homePage.isLoaded();
});