import { Locator, Page, expect } from "@playwright/test";

export class RegisterSignupPage {
  signupForm: Locator;
  signupNameInput: Locator;
  signupEmailInput: Locator;
  signupButton: Locator;

  async verificationOfRegisterSignupPageLoadingAndFillingForm() {
    await expect(this.signupForm).toContainText("New User Signup!");
    await this.signupNameInput.fill("Daniel");
    await this.signupEmailInput.fill("dan990.cendry@gmail.com");
    await this.signupButton.click();
  }

  constructor(private page: Page) {
    this.signupForm = page.locator(".signup-form");
    this.signupNameInput = page.locator("input[data-qa='signup-name']");
    this.signupEmailInput = page.locator("input[data-qa='signup-email']");
    this.signupButton = page.locator("button[data-qa='signup-button']");
  }
}
