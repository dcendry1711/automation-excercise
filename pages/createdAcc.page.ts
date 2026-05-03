import { Locator, Page, expect } from "@playwright/test";

export class CreatedAccountPage {
  createdAccountMessage: Locator;
  finishCreatingAccountButton: Locator;

  async verificationOfCreatedAccountPageLoadingAndFinishRegistration() {
    await expect(this.createdAccountMessage).toContainText("Account Created!");
    await this.finishCreatingAccountButton.click();
  }

  constructor(private page: Page) {
    this.createdAccountMessage = page.getByText("Account Created!");
    this.finishCreatingAccountButton = page.getByRole("link", {
      name: "Continue",
    });
  }
}
