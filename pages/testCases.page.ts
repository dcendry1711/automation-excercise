import {Page, Locator} from "@playwright/test";

export class TestCasesPage {

    testCasesPageHeader: Locator;

    constructor(private page: Page) {
        this.testCasesPageHeader = page.locator('b');
    }
}