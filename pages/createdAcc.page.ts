import { Locator, Page } from "@playwright/test";

export class CreatedAccountPage {

    createdAccountMessage: Locator;
    finishCreatingAccountButton: Locator;

    constructor(private page: Page) {
        this.createdAccountMessage = page.getByText('Account Created! Congratulations! Your new account has been successfully')
        this.finishCreatingAccountButton = page.getByRole('link', { name: 'Continue' });
    }
}