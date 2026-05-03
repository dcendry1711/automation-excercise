import { test, expect } from "../fixtures/automationExcercises.fixture";
import { accountInformationFormUserData } from "../data/registeredUserData.data";
import { generateNewUserData } from "../utils/generateNewUserData";

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
    //generate new user data for registration
    const userData = generateNewUserData();
    //verification of home page loading and accepting cookies
    await homePage.verificationOfHomePageLoading();
    //begin of the registration proccess
    await homePage.loginSignupButton.click();
    //verify of registration page loading and filling the registration form
    await registerSignupPage.verificationOfRegisterSignupPageLoadingAndFillingForm(userData.name, userData.email);
    //verification of account information page loading and filling the account information form
    await accountInformationPage.verificationOfAccountInformationPageLoadingAndFillingForm();
    //verification of account creation
    await createdAccountPage.verificationOfCreatedAccountPageLoadingAndFinishRegistration();
    await homePage.verificationOfCreatedAccount(userData.name);
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
    //generate new user data for registration
    const userData = generateNewUserData();
    //verification of home page loading and accepting cookies
    await homePage.verificationOfHomePageLoading();
    //begin of the registration proccess
    await homePage.loginSignupButton.click();
    //verify of registration page loading and filling the registration form
    await registerSignupPage.verificationOfRegisterSignupPageLoadingAndFillingForm(userData.name, userData.email);
    //verification of account information page loading and filling the account information form
    await accountInformationPage.verificationOfAccountInformationPageLoadingAndFillingForm();
    //verification of account creation
    await createdAccountPage.verificationOfCreatedAccountPageLoadingAndFinishRegistration();
    await homePage.verificationOfCreatedAccount(userData.name);
    //logout and login with created user data
    await homePage.logoutButton.click();
    await registerSignupPage.loginWithCreatedUserData(userData.email, accountInformationFormUserData.password);
    await homePage.verificationOfCreatedAccount(userData.name);
  });
});
