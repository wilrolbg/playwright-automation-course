import {expect, Page} from '@playwright/test';

export class ContactAssertions {
  constructor(private readonly page: Page) {
    
  }
    async assertSuccessMsg(message: string): Promise<void> {
    await expect(this.page.getByText(message)).toBeVisible();
  }  
  
  async assertValidationError(message: string): Promise<void> {
    await expect(this.page.getByText(message)).toBeVisible();
  }

  async assertValidationVisibleBySelector(selector: string): Promise<void> {
    await expect(this.page.locator(selector)).toBeVisible();
  }
}