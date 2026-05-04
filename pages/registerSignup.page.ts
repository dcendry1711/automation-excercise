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
  errorLoginMessage: Locator;
  errorRegistrationMessage: Locator;

  async verificationOfRegisterSignupPageLoadingAndFillingForm(name: string, email: string) {
    await expect(this.signupForm).toContainText("New User Signup!");
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupButton.click();
  }

  async loginWithUserData(email: string, password: string) {
    await expect(this.loginAccountHeader).toContainText("Login to your account");
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
  }

  async displayErrorMessageAfterLoginWithIncorrectData() {
    await expect(this.errorLoginMessage).toBeVisible();
    await expect(this.errorLoginMessage).toContainText("Your email or password is incorrect!");
  }

  async displayErrorMessageForExistingEmail() {
    await expect(this.errorRegistrationMessage).toBeVisible();
    await expect(this.errorRegistrationMessage).toContainText("Email Address already exist!");
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
    this.errorLoginMessage = page.getByText('Your email or password is');
    this.errorRegistrationMessage = page.getByText('Email Address already exist!')
  }
}
