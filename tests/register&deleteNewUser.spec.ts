import { test, expect } from "../fixtures/automationExcercises.fixture";
import {
  registerSignupFormUserData,
  accountInformationFormUserData,
} from "../data/registeredUserData.data";

test.describe("Automation excercises test cases", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
    await page.waitForLoadState("domcontentloaded");
  });

  test("TC01 - Register and delete new user", async ({
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

  test("TC02 - Login with created user data", async ({
    homePage,
    registerSignupPage,
    accountInformationPage,
    createdAccountPage,
    deletedAccountPage,
  }) => {
    await homePage.verificationOfHomePageLoading();
    await homePage.loginSignupButton.click();
    await registerSignupPage.verificationOfRegisterSignupPageLoadingAndFillingForm();
    await accountInformationPage.verificationOfAccountInformationPageLoadingAndFillingForm();
    await createdAccountPage.verificationOfCreatedAccountPageLoadingAndFinishRegistration();
    await homePage.verificationOfCreatedAccount();
    await homePage.logoutButton.click();
    await registerSignupPage.loginWithCreatedUserData();
    await homePage.verificationOfCreatedAccount();
    await homePage.deleteCreatedAccount();
    await deletedAccountPage.deleteAccountProccessAndVerification();
    await homePage.verificationOfDeletedAccount();
  });
});
