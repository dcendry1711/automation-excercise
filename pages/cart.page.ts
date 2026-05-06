import { Page, Locator } from "@playwright/test";

export class CartPage {

    shoppingCartHeader: Locator;
    shopingCartContainer: Locator;
    subscriptionFooterHeaderOnCartPage: Locator;
    subscriptionEmailInputOnCartPage: Locator;
    subscriptionSubmitButtonOnCartPage: Locator
    subscriptionSuccessMessageOnCartPage: Locator;
    firstProductInCart: Locator;
    secondProductInCart: Locator;

    constructor(private page: Page) {
        this.shoppingCartHeader = page.getByText('Shopping Cart');
        this.shopingCartContainer = page.getByText('Home Shopping Cart Proceed To');
        this.subscriptionFooterHeaderOnCartPage = page.getByRole('heading', { name: 'Subscription' });
        this.subscriptionEmailInputOnCartPage = page.getByRole('textbox', { name: 'Your email address' });
        this.subscriptionSubmitButtonOnCartPage = page.locator('#subscribe');
        this.subscriptionSuccessMessageOnCartPage = page.getByText('You have been successfully');
        this.firstProductInCart = page.getByRole('row', { name: 'Product Image Blue Top Women' });
        this.secondProductInCart = page.getByRole('row', { name: 'Product Image Men Tshirt Men' });
    }
}