import { Locator, Page, expect } from "@playwright/test";

export class DeletedAccountPage {
  deletedAccountMessage: Locator;
  finishDeletingAccountButton: Locator;

  async deleteAccountProccessAndVerification() {
    await expect(this.deletedAccountMessage).toContainText("Account Deleted!");
    await this.finishDeletingAccountButton.click();
  }

  constructor(private page: Page) {
    this.deletedAccountMessage = page.getByText("Account Deleted!");
    this.finishDeletingAccountButton = page
      .locator("div")
      .filter({ hasText: /^Continue$/ });
  }
}
