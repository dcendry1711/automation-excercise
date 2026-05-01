import {Locator, Page} from "@playwright/test";

export class RegisterSignupPage {

    signupForm: Locator;
    signupNameInput: Locator;
    signupEmailInput: Locator
    signupButton: Locator;

    constructor(private page: Page) {
        this.signupForm = page.locator(".signup-form");
        this.signupNameInput = page.locator("input[data-qa='signup-name']");
        this.signupEmailInput = page.locator("input[data-qa='signup-email']");
        this.signupButton = page.locator("button[data-qa='signup-button']");
    }
}