import { Page, Locator, expect } from "@playwright/test"
import { accountInformationFormUserData } from "../data/registeredUserData.data";

export class CheckoutPage {

    deliveryAddressContainer: Locator;
    orderContainer: Locator;
    orderCommentTextArea: Locator;
    placeOrderBtn: Locator;

    async verifyAddressData(){
        await expect(this.deliveryAddressContainer).toContainText(accountInformationFormUserData.title)
        await expect(this.deliveryAddressContainer).toContainText(accountInformationFormUserData.lastName)
        await expect(this.deliveryAddressContainer).toContainText(accountInformationFormUserData.address)
        await expect(this.deliveryAddressContainer).toContainText(accountInformationFormUserData.address2)
        await expect(this.deliveryAddressContainer).toContainText(accountInformationFormUserData.country)
        await expect(this.deliveryAddressContainer).toContainText(accountInformationFormUserData.state)
        await expect(this.deliveryAddressContainer).toContainText(accountInformationFormUserData.city)
        await expect(this.deliveryAddressContainer).toContainText(accountInformationFormUserData.zipcode)
        await expect(this.deliveryAddressContainer).toContainText(accountInformationFormUserData.mobileNumber)
        await expect(this.deliveryAddressContainer).toContainText(accountInformationFormUserData.firstName)
    }

    async reviewUserOrder(){
        await expect(this.orderContainer).toContainText('Rs. 500');
        await expect(this.orderContainer).toContainText('1');
        await expect(this.orderContainer).toContainText('Rs. 500');
        await expect(this.orderContainer).toContainText('Men Tshirt');
        await expect(this.orderContainer).toContainText('Rs. 400');
        await expect(this.orderContainer).toContainText('Blue Top');
        await expect(this.orderContainer).toContainText('1');
        await expect(this.orderContainer).toContainText('Rs. 400');
        await expect(this.orderContainer).toContainText('Rs. 900');
    }

    constructor(private page: Page){
        this.deliveryAddressContainer = page.getByText('Your delivery address Mr.');
        this.orderContainer = page.locator('#cart_info');
        this.orderCommentTextArea = page.locator('textarea[name="message"]');
        this.placeOrderBtn = page.getByRole('link', { name: 'Place Order' });
    }
}