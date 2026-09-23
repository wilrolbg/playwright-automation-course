import { Page, Locator } from '@playwright/test';

export class ContactPage {
  readonly page: Page;

  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly email: Locator;
  private readonly listCombo: Locator;
  private readonly message: Locator;
  private readonly firstNameError: Locator;
  private readonly lastNameError: Locator;
  private readonly emailError: Locator;
  private readonly messageError: Locator;
  private readonly attachment: Locator;
  private readonly btnContactSubmit: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.locator('[data-test="first-name"]');
    this.lastName = page.locator('[data-test="last-name"]');
    this.email = page.locator('[data-test="email"]');
    // Prefer `data-test` attributes but fall back to id selectors
    this.listCombo = page.locator('[data-test="subject"], #subject');
    this.message = page.locator('[data-test="message"]');
    // Error locators — use the exact data-test attributes from the frontend
    this.firstNameError = page.locator('[data-test="first-name-error"]');
    this.lastNameError = page.locator('[data-test="last-name-error"]');
    this.emailError = page.locator('[data-test="email-error"]');
    this.messageError = page.locator('[data-test="message-error"]');
    this.attachment = page.locator('[data-test="attachment"]');
    this.btnContactSubmit = page.locator('[data-test="contact-submit"]');
  }

  // Navigation
  async gotoHome() {
    await this.page.goto('/');
  }

  async gotoContact() {
    await this.page.goto('/contact');
    await this.firstName.waitFor({ state: 'visible' });
  }

  // Small action methods
  async enterFirstName(value: string) {
    await this.firstName.fill(value);
  }

  async enterLastName(value: string) {
    await this.lastName.fill(value);
  }

  async enterEmail(value: string) {
    await this.email.fill(value);
  }

  async selectSubject(value: string) {
    await this.listCombo.selectOption(value);
  }

  async enterMessage(value: string) {
    await this.message.fill(value);
  }

  async attachFile(pathOrFile: string) {
    await this.attachment.setInputFiles(pathOrFile);
  }

  async submit() {
    await this.btnContactSubmit.click();
  }

  // Helper that uses the dropdown fixture function passed from tests
  async readSelector(selectRandomFn: (locator: Locator) => Promise<string>) {
    return await selectRandomFn(this.listCombo);
  }

  // Error helpers
  async hasFirstNameError(): Promise<boolean> {
    return (await this.firstNameError.count()) > 0;
  }

  async hasLastNameError(): Promise<boolean> {
    return (await this.lastNameError.count()) > 0;
  }

  async hasEmailError(): Promise<boolean> {
    return (await this.emailError.count()) > 0;
  }

  async hasMessageError(): Promise<boolean> {
    return (await this.messageError.count()) > 0;
  }

  async getFirstNameErrorText(): Promise<string> {
    return await this.firstNameError.first().innerText();
  }

  // Composite action using smaller methods
  async fillContactForm(
    firstName: string,
    lastName: string,
    email: string,
    subject: string,
    message: string
  ) {
    await this.enterFirstName(firstName);
    await this.enterLastName(lastName);
    await this.enterEmail(email);
    await this.selectSubject(subject);
    await this.enterMessage(message);
    await this.submit();
  }

  // Validation helpers
  async getFirstNameValidationMessage(): Promise<string> {
    return await this.firstName.evaluate((el: HTMLInputElement) => el.validationMessage || '');
  }
}