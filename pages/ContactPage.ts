import { Page, Locator } from '@playwright/test';

export class ContactPage {
  readonly page: Page;

    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly email: Locator;
    private readonly listCombo: Locator;
    private readonly message: Locator;
    private readonly attachment: Locator;
    private readonly btnContactSubmit: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.locator('[data-test="first-name"]');
    this.lastName = page.locator('[data-test="last-name"]');
    this.email = page.locator('[data-test="email"]');
    this.listCombo = page.locator('#subject'); // o page.locator('[data-test="subject"]')
    this.message = page.locator('[data-test="message"]');
    this.attachment = page.locator('[data-test="attachment"]');
    this.btnContactSubmit = page.locator('[data-test="contact-submit"]');    
    
  }

  async open() {
    await this.page.goto('/');
  }

    async openContactPage() {
    await this.page.goto('/contact');
  }
  // Método pasando la función del fixture
  async readSelector(selectRandomFn: (locator: Locator) => Promise<string>) {
    return await selectRandomFn(this.listCombo);
  }

  async fillContactForm(
    firstName: string,
    LastName: string,
    Email: string,
    Subject: string,
    Message: string,
  )
    {
        await this.firstName.fill(firstName);
        await this.lastName.fill(LastName);
        await this.email.fill(Email);
        await this.listCombo.selectOption(Subject);
        await this.message.fill(Message);
       /* await this.attachment.setInputFiles({
                                                name: 'adjunto-prueba.txt',
                                                mimeType: 'text/plain',
                                                buffer: Buffer.from('Esto es una simple prueba')
                                            });*/
        await this.btnContactSubmit.click();
    }
}