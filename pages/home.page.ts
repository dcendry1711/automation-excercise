import {Locator, Page} from "@playwright/test";

export class HomePage {

    consentAcceptButton: Locator;
    leftSidebar: Locator;
    loginSignupButton: Locator;
    loggedInAsText: Locator;
    deleteAccountButton: Locator;

    constructor(private page: Page) {
        this.consentAcceptButton = page.locator(".fc-button.fc-cta-consent.fc-primary-button");
        this.leftSidebar = page.locator(".left-sidebar");
        this.loginSignupButton = page.locator("a", { hasText: "Signup / Login" });
        this.loggedInAsText = page.getByText('Logged in as Daniel')
        this.deleteAccountButton = page.getByRole('link', { name: ' Delete Account' });
    }
}

