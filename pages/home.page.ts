import { Locator, Page, expect } from "@playwright/test";

export class HomePage {
  consentAcceptButton: Locator;
  leftSidebar: Locator;
  loginSignupMenuButton: Locator;
  loggedInAsText: Locator;
  deleteAccountButton: Locator;
  logoutMenuButton: Locator;
  contactUsMenuButton: Locator;
  testCasesMenuButton: Locator;
  productsMenuButton: Locator;
  subscriptionFooterHeader: Locator;
  subscriptionEmailInput: Locator;
  subscriptionSubmitButton: Locator;
  subscriptionSuccessMessage: Locator;

  async verificationOfHomePageLoading() {
    await this.consentAcceptButton.click();
    await expect(this.leftSidebar).toBeVisible();
    await expect(this.loginSignupMenuButton).toBeVisible();
  }

  async verificationOfCreatedAccount(name: string) {
    await expect(this.loggedInAsText).toBeVisible();
    await expect(this.loggedInAsText).toContainText(`Logged in as ${name}`);
  }

  async deleteCreatedAccount() {
    await this.deleteAccountButton.click();
  }

  async logoutFromAccount() {
    await this.logoutMenuButton.click();
  }

  async verificationOfDeletedAccount() {
    await expect(this.loggedInAsText).not.toBeVisible();
    await expect(this.loginSignupMenuButton).toBeVisible();
    await expect(this.leftSidebar).toBeVisible();
  }

  constructor(private page: Page) {
    this.consentAcceptButton = page.locator(
      ".fc-button.fc-cta-consent.fc-primary-button",
    );
    this.leftSidebar = page.locator(".left-sidebar");
    this.loginSignupMenuButton = page.locator("a", { hasText: "Signup / Login" });
    this.loggedInAsText = page.getByText(`Logged in as`);
    this.deleteAccountButton = page.getByRole("link", {
      name: " Delete Account",
    });
    this.logoutMenuButton = page.getByRole("link", { name: " Logout" });
    this.contactUsMenuButton = page.getByRole("link", { name: " Contact us" });
    this.testCasesMenuButton = page.getByRole('link', { name: ' Test Cases' });
    this.productsMenuButton = page.getByRole('link', { name: ' Products' });
    this.subscriptionFooterHeader = page.getByRole('heading', { name: 'Subscription' });
    this.subscriptionEmailInput = page.getByRole('textbox', { name: 'Your email address' });
    this.subscriptionSubmitButton = page.locator('#subscribe');
    this.subscriptionSuccessMessage = page.getByText('You have been successfully');
  }
}
