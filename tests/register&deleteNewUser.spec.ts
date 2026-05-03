import { test, expect } from "../fixtures/automationExcercises.fixture";
test.describe("E2E - Register/delete new user process", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
    await page.waitForLoadState("domcontentloaded");
  });

  test("E2E TC01 - Register and delete new user", async ({
    homePage,
    registerSignupPage,
    accountInformationPage,
    createdAccountPage,
    deletedAccountPage,
  }) => {
    //verification of home page loading and accepting cookies
    await homePage.verificationOfHomePageLoading();
    //begin of the registration proccess
    await homePage.loginSignupButton.click();
    //verify of registration page loading and filling the registration form
    await registerSignupPage.verificationOfRegisterSignupPageLoadingAndFillingForm();
    //verification of account information page loading and filling the account information form
    await accountInformationPage.verificationOfAccountInformationPageLoadingAndFillingForm();
    //verification of account creation
    await createdAccountPage.verificationOfCreatedAccountPageLoadingAndFinishRegistration();
    await homePage.verificationOfCreatedAccount();
    //deletion of created account and verification of deletion
    await homePage.deleteCreatedAccount();
    await deletedAccountPage.deleteAccountProccessAndVerification();
    await homePage.verificationOfDeletedAccount();
  });
});
