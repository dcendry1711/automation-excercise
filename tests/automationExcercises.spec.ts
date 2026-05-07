import { test, expect } from "../fixtures/automationExcercises.fixture";
import { registeredUserData } from "../data/registeredUserData.data";
import { accountInformationFormUserData } from "../data/registeredUserData.data";
import { UserLifecycle } from "../flow/userLifecycle.flow";
import { handleDialog } from "../utils/handleDialog";
import { contactUsFormData } from "../data/contactUsForm.data";

test.describe("Automation excercises test cases", () => {
  test.beforeEach(async ({ page, homePage }) => {
    await page.goto("");
    await page.waitForLoadState("domcontentloaded");
    await homePage.verificationOfHomePageLoading();
  });

  test("TC01 - Register and delete new user", async ({ page }) => {
    //generate new user data for registration
    const userLifecycle = new UserLifecycle(page);
    //registration of new user and verification of registration
    await userLifecycle.registerNewUser();
    //deletion of created account and verification of deletion
    await userLifecycle.deleteCreatedUser();
  });

  test("TC02 - Login with created user data", async ({ page }) => {
    //generate new user data for registration
    const userLifecycle = new UserLifecycle(page);
    //registration of new user and verification of registration
    await userLifecycle.registerNewUser();
    //logout from created account and verification of logout
    await userLifecycle.logoutFromCreatedUser();
    //login with created user data and verification of login
    await userLifecycle.loginWithCreatedUserData();
    //deletion of created account and verification of deletion
    await userLifecycle.deleteCreatedUser();
  });

  test("TC03 - Login with incorrect email and password", async ({ page }) => {
    const userLifecycle = new UserLifecycle(page);
    //begin of the login proccess
    await userLifecycle.homePage.loginSignupMenuButton.click();
    //verify of registration/signup page loading and filling the login form with incorrect email and password
    await userLifecycle.registerSignupPage.loginWithUserData(
      "incorrect@example.com",
      "incorrectpassword",
    );
    //verification of error message for incorrect email and password
    await userLifecycle.registerSignupPage.displayErrorMessageAfterLoginWithIncorrectData();
  });

  test("TC04 - Logout user", async ({ page }) => {
    const userLifecycle = new UserLifecycle(page);
    //registration of new user and verification of registration
    await userLifecycle.registerNewUser();
    //logout from created account and verification of logout
    await userLifecycle.logoutFromCreatedUser();
    //login with created user data and verification of login
    await userLifecycle.loginWithCreatedUserData();
    //repeat of logout from created account and verification of logout
    await userLifecycle.logoutFromCreatedUser();
    await expect(userLifecycle.homePage.loggedInAsText).toBeHidden();
    await expect(
      userLifecycle.registerSignupPage.loginAccountHeader,
    ).toBeVisible();
  });

  test("TC05 - Register user with existing email", async ({ page }) => {
    const userLifecycle = new UserLifecycle(page);
    //registration of new user and verification of registration
    await userLifecycle.homePage.loginSignupMenuButton.click();
    await userLifecycle.registerSignupPage.signupNameInput.fill(registeredUserData.name);
    await userLifecycle.registerSignupPage.signupEmailInput.fill(registeredUserData.email);
    await userLifecycle.registerSignupPage.signupButton.click();
    //verification of error message for existing email
    await expect(userLifecycle.registerSignupPage.errorRegistrationMessage).toBeVisible();
    await userLifecycle.registerSignupPage.displayErrorMessageForExistingEmail();
  });

  test("TC06 - Contact us form", async ({ page, homePage, contactUsPage }) => {
    //navigation to contact us page and verification of loading
    await homePage.contactUsMenuButton.click();
    await expect(contactUsPage.getInTouchHeader).toBeVisible();
    //filling the contact us form and submitting
    await contactUsPage.fillContactUsForm(
      contactUsFormData.name,
      contactUsFormData.email,
      contactUsFormData.subject,
      contactUsFormData.message,
      contactUsFormData.filePath
    );
    await handleDialog(page,() => contactUsPage.submitButton.click(),"Press OK");
    //verification of successful submission of the contact us form
    await contactUsPage.verifySuccessfulFormSubmission();
    //navigation back to home page and verification of loading
    await contactUsPage.backToHomePageBtn.click();
    await expect(homePage.leftSidebar).toBeVisible();
  });

  test("TC07 - Verify test cases page", async ({ homePage, testCasesPage }) => {
    //navigation to test cases page and verification of loading
    await homePage.testCasesMenuButton.click();
    await expect(testCasesPage.testCasesPageHeader).toContainText("Test Cases");
  });

  test("TC08 - Verify all products and product detail page", async({ page, homePage, productsPage, productDetailsPage }) => {
    //navigation to products page and verification of loading
    await homePage.productsMenuButton.click();
    await expect(productsPage.productsPageHeader).toContainText("All Products");
    await expect(productsPage.productsList).toBeVisible();
    await productsPage.viewProductButtonOf1stProduct.click();
    expect(page.url()).toContain("/product_details");
    await productDetailsPage.verifyProductDetailsVisibility();
  });

  test("TC09 - Search product", async({ page, homePage, productsPage}) => {
    const productToSearch = "Blue Top";
    //navigation to products page and verification of loading
    await homePage.productsMenuButton.click();
    await expect(productsPage.productsPageHeader).toContainText("All Products");
    //search for product and verification of search results
    await productsPage.searchProductInput.fill(productToSearch);
    await productsPage.submitSearchProductButton.click();
    expect(page.url()).toContain("/products?search");
    await expect(productsPage.searchedProductsHeader).toContainText("Searched Products");
    await expect(productsPage.searchedProductsList).toContainText(productToSearch);
  });

  test("TC10 - Verify subscription in home page", async({ homePage }) => {
    //filling the subscription form and submitting
    await expect(homePage.subscriptionFooterHeader).toContainText("Subscription");
    await homePage.subscriptionEmailInput.fill(registeredUserData.email);
    await homePage.subscriptionSubmitButton.click();
    await expect(homePage.subscriptionSuccessMessage).toBeVisible();
    await expect(homePage.subscriptionSuccessMessage).toContainText("You have been successfully subscribed!");
  })

  test("TC11 - Verify subscription in cart page", async({homePage, cartPage}) => {
    await homePage.cartMenuButton.click();
    await expect(cartPage.shoppingCartHeader).toBeVisible();
    await expect(cartPage.subscriptionFooterHeaderOnCartPage).toContainText("Subscription");
    await cartPage.subscriptionEmailInputOnCartPage.fill(registeredUserData.email);
    await cartPage.subscriptionSubmitButtonOnCartPage.click();
    await expect(homePage.subscriptionSuccessMessage).toBeVisible();
    await expect(homePage.subscriptionSuccessMessage).toContainText("You have been successfully subscribed!");
  })

  test("TC12 - Add products in cart", async({homePage, productsPage, cartPage}) => {
    await homePage.productsMenuButton.click();
    //verification of loading products page
    await expect(productsPage.productsPageHeader).toContainText("All Products");
    await productsPage.addToCartBtnOf1stProduct.click();
    await expect(productsPage.addedProductToCartDialog).toBeVisible();
    await productsPage.continueShoppingButton.click();
    await productsPage.addToCartBtnOf2ndProduct.click();
    await expect(productsPage.addedProductToCartDialog).toBeVisible();
    await productsPage.viewCartBtn.click();
    await expect(cartPage.shopingCartContainer).toBeVisible();
    await expect(cartPage.firstProductInCart).toContainText("Blue Top")
    await expect(cartPage.firstProductInCart).toContainText("Rs. 500")
    await expect(cartPage.firstProductInCart).toContainText("1")
    await expect(cartPage.firstProductInCart).toContainText("Rs. 500")
    await expect(cartPage.secondProductInCart).toContainText("Men Tshirt")
    await expect(cartPage.secondProductInCart).toContainText("Rs. 400")
    await expect(cartPage.secondProductInCart).toContainText("1")
    await expect(cartPage.secondProductInCart).toContainText("Rs. 400")
  });

  test("TC13 - verify product quantity in cart", async({ homePage, productDetailsPage, cartPage }) => {
    await homePage.view1stProductBtn.click();
    await productDetailsPage.verifyProductDetailsVisibility();
    await productDetailsPage.quantity.fill('4');
    await productDetailsPage.addToCartBtn.click();
    await productDetailsPage.viewCartBtn.click();
    await expect(cartPage.shoppingCartHeader).toBeVisible();
    await expect(cartPage.firstProductInCart).toContainText("Blue Top")
    await expect(cartPage.firstProductInCart).toContainText("Rs. 500")
    await expect(cartPage.firstProductInCart).toContainText("4")
    await expect(cartPage.firstProductInCart).toContainText("Rs. 2000")
  })

  test("TC14 - Place Order: Register while Checkout", async({ page, homePage, cartPage, checkoutPage, paymentPage, paymentDonePage }) =>{
    const userLifecycle = new UserLifecycle(page);
    //add products to cart on home page
    await homePage.addProcutsToCart();
    //move to cart page and proceed checkout
    await homePage.moveToCartPage();
    await cartPage.proceedToCheckoutBtn.click();
    await cartPage.registerLoginBtn.click();
    //register new user
    await userLifecycle.registerNewUser();
    //move to cart page
    await homePage.cartMenuButton.click();
    //proceed to chceckout
    await cartPage.proceedToCheckoutBtn.click();
    //verify address data on checkout page
    await checkoutPage.verifyAddressData();
    //review of user order
    await checkoutPage.reviewUserOrder();
    //fill comment text area below review order section and place order
    await checkoutPage.orderCommentTextArea.fill('Test description');
    await checkoutPage.placeOrderBtn.click();
    //fill form on payment page
    await paymentPage.fillPaymentForm();
    await paymentPage.payAndConfirmOrderBtn.click();
    //verify succes message and finish order process
    await paymentDonePage.verifyAndFinishOrderProcess();
    //delete user account
    await userLifecycle.deleteCreatedUser();
  })
});