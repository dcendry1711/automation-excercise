import { Page, Locator } from "@playwright/test"
import { accountInformationFormUserData } from "../data/registeredUserData.data";

export class PaymentPage {
    
    nameOnCardInput: Locator;
    cardNumber: Locator;
    cvcInput: Locator;
    expirationMonth: Locator;
    expirationYear: Locator;
    payAndConfirmOrderBtn: Locator;
    

    async fillPaymentForm(){
        await this.nameOnCardInput.fill(`${accountInformationFormUserData.firstName} ${accountInformationFormUserData.lastName}`);
        await this.cardNumber.fill('1234567890');
        await this.cvcInput.fill('123');
        await this.expirationMonth.fill('12');
        await this.expirationYear.fill('2030');
    }
    
    constructor(private page: Page){
        this.nameOnCardInput = page.locator('input[name="name_on_card"]');
        this.cardNumber = page.locator('input[name="card_number"]');
        this.cvcInput = page.getByRole('textbox', { name: 'ex.' });
        this.expirationMonth = page.getByRole('textbox', { name: 'MM' });
        this.expirationYear = page.getByRole('textbox', { name: 'YYYY' });
        this.payAndConfirmOrderBtn = page.getByRole('button', { name: 'Pay and Confirm Order' });
    }
}