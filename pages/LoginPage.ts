import { Page, Locator } from "@playwright/test";

export class LoginPage {
    private readonly signIn: Locator;
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;

  constructor(private readonly page: Page) {
    this.signIn             = this.page.locator('[data-test="nav-sign-in"]');
    this.emailInput         = this.page.locator('[data-test="email"]');
    this.passwordInput      = this.page.locator('[data-test="password"]');
    this.loginButton        = this.page.locator('[data-test="login-submit"]');
  }

    async open() {
        await this.page.goto("/");
    }
    
    async openAuth(){
        await this.signIn.click();
    }

    async login(email: string, password: string){        
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        console.log('URL después del click:', this.page.url());
        await this.page.waitForLoadState('networkidle'); //espere a que termine la carga después del click   
        console.log('URL después networkidle:', this.page.url());     
    }
}
