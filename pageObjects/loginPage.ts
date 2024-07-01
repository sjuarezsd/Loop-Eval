import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput = 'input[name="e"]';
  readonly continueButton = '"Continue"';
  readonly passwordInput = 'input[name="p"]';
  readonly loginButton = '"Log in"';

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://app.asana.com/-/login');
  }

  async login(email: string, password: string) {
    await this.page.fill(this.emailInput, email);
    await this.page.click(this.continueButton);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }
}
