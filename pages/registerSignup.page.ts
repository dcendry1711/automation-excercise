import { Locator, Page, expect } from "@playwright/test";
import { accountInformationFormUserData } from "../data/registeredUserData.data";

export class RegisterSignupPage {
  signupForm: Locator;
  signupNameInput: Locator;
  signupEmailInput: Locator;
  signupButton: Locator;
  loginAccountHeader: Locator;
  loginEmailInput: Locator;
  loginPasswordInput: Locator;
  loginButton: Locator;

  async verificationOfRegisterSignupPageLoadingAndFillingForm(name: string, email: string) {
    await expect(this.signupForm).toContainText("New User Signup!");
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupButton.click();
  }

  async loginWithCreatedUserData(email: string, password: string) {
    await expect(this.loginAccountHeader).toContainText("Login to your account");
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
  }

  constructor(private page: Page) {
    this.signupForm = page.locator(".signup-form");
    this.signupNameInput = page.locator("input[data-qa='signup-name']");
    this.signupEmailInput = page.locator("input[data-qa='signup-email']");
    this.signupButton = page.locator("button[data-qa='signup-button']");
    this.loginAccountHeader = page.getByRole('heading', { name: 'Login to your account' });
    this.loginEmailInput = page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
    this.loginPasswordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }
}
