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
  cartMenuButton: Locator;
  subscriptionFooterHeader: Locator;
  subscriptionEmailInput: Locator;
  subscriptionSubmitButton: Locator;
  subscriptionSuccessMessage: Locator;
  view1stProductBtn: Locator;
  addToCart1stProductBtn: Locator;
  addToCart2ndProductBtn: Locator;
  continueShoppingBtn: Locator;
  viewCartBtn: Locator;

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

  async addProcutsToCart(){
    await this.addToCart1stProductBtn.click();
    await this.continueShoppingBtn.click();
    await this.addToCart2ndProductBtn.click();
  }

  async moveToCartPage(){
    await this.viewCartBtn.click();
    expect(this.page.url()).toContain('/view_cart');
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
    this.cartMenuButton = page.getByRole('link', { name: ' Cart' });
    this.subscriptionFooterHeader = page.getByRole('heading', { name: 'Subscription' });
    this.subscriptionEmailInput = page.getByRole('textbox', { name: 'Your email address' });
    this.subscriptionSubmitButton = page.locator('#subscribe');
    this.subscriptionSuccessMessage = page.getByText('You have been successfully');
    this.view1stProductBtn = page.getByRole('link', { name: ' View Product' }).first();
    this.addToCart1stProductBtn = page.locator('a[data-product-id="1"]').first();
    this.addToCart2ndProductBtn = page.locator('a[data-product-id="2"]').first();
    this.continueShoppingBtn = page.getByRole('button', { name: 'Continue Shopping' });
    this.viewCartBtn = page.getByRole('link', { name: 'View Cart' })
  }
}
