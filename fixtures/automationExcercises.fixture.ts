import { test as base } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { RegisterSignupPage } from "../pages/registerSignup.page";
import { AccountInformationPage } from "../pages/accountInformation.page";
import { CreatedAccountPage } from "../pages/createdAcc.page";
import { DeletedAccountPage } from "../pages/deletedAccount.page";
import { ContactUsPage } from "../pages/contactUs.page"
import { TestCasesPage } from "../pages/testCases.page";
import { ProductsPage } from "../pages/products.page";
import { ProductDetailsPage } from "../pages/productDetails.page";
import { CartPage } from "../pages/cart.page";
import { CheckoutPage } from "../pages/checkout.page";
import { PaymentPage } from "../pages/payment.page";
import { PaymentDonePage } from "../pages/paymentDone.page";

type MyFixtures = {
  homePage: HomePage;
  registerSignupPage: RegisterSignupPage;
  accountInformationPage: AccountInformationPage;
  createdAccountPage: CreatedAccountPage;
  deletedAccountPage: DeletedAccountPage;
  contactUsPage: ContactUsPage;
  testCasesPage: TestCasesPage;
  productsPage: ProductsPage;
  productDetailsPage: ProductDetailsPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  paymentPage: PaymentPage;
  paymentDonePage: PaymentDonePage;
};

export const test = base.extend<MyFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  registerSignupPage: async ({ page }, use) => {
    await use(new RegisterSignupPage(page));
  },
  accountInformationPage: async ({ page }, use) => {
    await use(new AccountInformationPage(page));
  },
  createdAccountPage: async ({ page }, use) => {
    await use(new CreatedAccountPage(page));
  },
  deletedAccountPage: async ({ page }, use) => {
    await use(new DeletedAccountPage(page));
  },
  contactUsPage: async ({ page }, use) => {
    await use(new ContactUsPage(page));
  },
  testCasesPage: async ({ page }, use) => {
    await use(new TestCasesPage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  productDetailsPage: async ({ page }, use) => {
    await use(new ProductDetailsPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  paymentPage: async({page}, use) => {
    await use(new PaymentPage(page));
  },
  paymentDonePage: async({page}, use) => {
    await use(new PaymentDonePage(page));
  }
});

export { expect } from "@playwright/test";
