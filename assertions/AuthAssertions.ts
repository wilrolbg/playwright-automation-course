import {expect, Page} from '@playwright/test';

export class AuthAssertions {
  constructor(private readonly page: Page) {
    
  }

    async assertAtUrl(url: string): Promise<void> {
    await expect(this.page).toHaveURL(url);
  }

    async assertAtTittelDashboard(tittle: string): Promise<void> {
    await expect(this.page.getByText(tittle)).toBeVisible();
  }

    async assertAtFailedMsg(message: string): Promise<void> {
    await expect(this.page.getByText(message)).toBeVisible();
  }
}