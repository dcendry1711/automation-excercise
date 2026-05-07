import { Page, Locator, expect } from "@playwright/test"

export class PaymentDonePage {

    orderConfirmedMessage: Locator;
    continueBtn: Locator;

    async verifyAndFinishOrderProcess(){
        await expect(this.orderConfirmedMessage).toContainText("Congratulations! Your order has been confirmed!");
        await this.continueBtn.click();
    }

    constructor(private page: Page){
        this.orderConfirmedMessage = page.getByText('Congratulations! Your order');
        this.continueBtn = page.getByRole('link', { name: 'Continue' })
    }
}