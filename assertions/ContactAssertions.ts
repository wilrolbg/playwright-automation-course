import {expect, Page} from '@playwright/test';

export class ContactAssertions {
  constructor(private readonly page: Page) {
    
  }
    async assertSuccessMsg(message: string): Promise<void> {
    await expect(this.page.getByText(message)).toBeVisible();
  }  
}