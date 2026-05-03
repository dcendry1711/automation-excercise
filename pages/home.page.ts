import { Locator, Page, expect } from "@playwright/test";
import { registerSignupFormUserData } from "../data/registeredUserData.data";

export class HomePage {
  consentAcceptButton: Locator;
  leftSidebar: Locator;
  loginSignupButton: Locator;
  loggedInAsText: Locator;
  deleteAccountButton: Locator;

  async verificationOfHomePageLoading() {
    await this.consentAcceptButton.click();
    await expect(this.leftSidebar).toBeVisible();
    await expect(this.loginSignupButton).toBeVisible();
  }

  async verificationOfCreatedAccount() {
    await expect(this.loggedInAsText).toBeVisible();
    await expect(this.loggedInAsText).toContainText(
      `Logged in as ${registerSignupFormUserData.name}`,
    );
  }

  async deleteCreatedAccount() {
    await this.deleteAccountButton.click();
  }

  async verificationOfDeletedAccount() {
    await expect(this.loggedInAsText).not.toBeVisible();
    await expect(this.loginSignupButton).toBeVisible();
    await expect(this.leftSidebar).toBeVisible();
  }

  constructor(private page: Page) {
    this.consentAcceptButton = page.locator(
      ".fc-button.fc-cta-consent.fc-primary-button",
    );
    this.leftSidebar = page.locator(".left-sidebar");
    this.loginSignupButton = page.locator("a", { hasText: "Signup / Login" });
    this.loggedInAsText = page.getByText(
      `Logged in as ${registerSignupFormUserData.name}`,
    );
    this.deleteAccountButton = page.getByRole("link", {
      name: " Delete Account",
    });
  }
}
