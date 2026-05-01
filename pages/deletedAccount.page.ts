import {Locator, Page} from "@playwright/test";

export class DeletedAccountPage {

    deletedAccountMessage: Locator;
    finishDeletingAccountButton: Locator;

    constructor(private page: Page) {
        this.deletedAccountMessage = page.getByText('Account Deleted! Your account')
        this.finishDeletingAccountButton = page.getByRole('link', { name: 'Continue' })
    }
}