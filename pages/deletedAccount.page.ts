import {Locator, Page} from "@playwright/test";

export class DeletedAccountPage {

    deletedAccountMessage: Locator;
    finishDeletingAccountButton: Locator;

    constructor(private page: Page) {
        this.deletedAccountMessage = page.getByText('Account Deleted!')
        this.finishDeletingAccountButton = page.locator('div').filter({ hasText: /^Continue$/ });
    }
}