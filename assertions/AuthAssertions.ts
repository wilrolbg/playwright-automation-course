import {expect, Page} from '@playwright/test';

export class AuthAssertions {
  constructor(private readonly page: Page) {
    
  }

    async assertAtUrl(url: string): Promise<void> {
    await expect(this.page).toHaveURL(url, {timeout: 10000});
  }

    async assertAtTittelDashboard(tittle: string): Promise<void> {
     //console.log(await this.page.locator('body').innerText()); //verifica el contenido de la pagina
    await expect(this.page.getByText(tittle, {exact: true})).toBeVisible();
  }

    async assertAtFailedMsg(message: string): Promise<void> {
    await expect(this.page.getByText(message)).toBeVisible();
  }

    async assertAtLogOut(): Promise<void>{
      await expect(this.page.getByRole('heading', { name: 'Login', exact: true })).toBeVisible();
      await expect(this.page.locator('[data-test="login-submit"]')).toBeVisible();
  }
}