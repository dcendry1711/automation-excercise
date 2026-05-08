import { Page, expect } from "@playwright/test"
import { HomePage } from "../pages/home.page"
import { CartPage } from "../pages/cart.page";
import { CheckoutPage } from "../pages/checkout.page";
import { PaymentPage } from "../pages/payment.page";
import { PaymentDonePage } from "../pages/paymentDone.page";

export class PurchaseProcess {

    homePage: HomePage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    paymentPage: PaymentPage;
    paymentDonePage: PaymentDonePage;

    async addProductsToCart(){
        await this.homePage.addProcutsToCart();
    }

    async moveToCartPage(){
        await this.homePage.moveToCartPage();
    }

    async proceedToCheckout(){
        await this.cartPage.proceedToCheckoutBtn.click();
    }

    async beginRegisterProcessOnCartPage(){
        await this.cartPage.registerLoginBtn.click();
    }

    async goToCartPage(){
        await this.homePage.moveToCartPageByMenuBtn();
    }

    async checkAddressDataAndVerifyOrder(){
        await this.checkoutPage.verifyAddressData();
        await this.checkoutPage.reviewUserOrder();
    }

    async fillDescriptionContainer(){
        await this.checkoutPage.orderCommentTextArea.fill('Test description');
    }

    async placeOrder(){
        await this.checkoutPage.placeOrderBtn.click();
    }

    async fillPaymentFormAndConfirmOrder(){
        await this.paymentPage.fillPaymentForm();
        await this.paymentPage.payAndConfirmOrderBtn.click();
    }

    async checkSuccessMessageAfterPurchase(){
        await this.paymentDonePage.verifyAndFinishOrderProcess();
    }

    async fullPurchaseflowAfterRegisterNewUser(){
        await this.addProductsToCart();
        await this.moveToCartPage();
        await this.proceedToCheckout();
        await this.checkAddressDataAndVerifyOrder();
        await this.fillDescriptionContainer();
        await this.placeOrder();
        await this.fillPaymentFormAndConfirmOrder();
        await this.checkSuccessMessageAfterPurchase();
    }

    constructor(private page: Page){
        this.homePage = new HomePage(page);
        this.cartPage = new CartPage(page);
        this.checkoutPage = new CheckoutPage(page);
        this.paymentPage = new PaymentPage(page);
        this.paymentDonePage = new PaymentDonePage(page);
    }
}

