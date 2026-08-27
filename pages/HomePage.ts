import { expect, Locator, Page } from '@playwright/test';

export class HomePage {

    constructor(private readonly page: Page) {}

    get banner(): Locator {
        return this.page.getByAltText('Banner');
    }

    async isLoaded(): Promise<void> {
        await expect(this.banner).toBeVisible();
    }
}