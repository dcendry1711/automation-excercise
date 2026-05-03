import { test, expect } from "../fixtures/automationExcercises.fixture";
import { RegistrationFlow } from "../flow/registration.flow";
import { accountInformationFormUserData } from "../data/registeredUserData.data";

test.describe("Automation excercises test cases", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
    await page.waitForLoadState("domcontentloaded");
  });

  test("TC01 - Register and delete new user", async ({ page }) => {
    //generate new user data for registration
    const registrationFlow = new RegistrationFlow(page);
    //registration of new user and verification of registration
    await registrationFlow.registerNewUser();
    //deletion of created account and verification of deletion
    await registrationFlow.deleteCreatedUser();
  });

  test("TC02 - Login with created user data", async ({ page }) => {
    //generate new user data for registration
    const registrationFlow = new RegistrationFlow(page);
    //registration of new user and verification of registration
    await registrationFlow.registerNewUser();
    //logout from created account and verification of logout
    await registrationFlow.logoutFromCreatedUser();
    //login with created user data and verification of login
    await registrationFlow.loginWithCreatedUserData();
    //deletion of created account and verification of deletion
    await registrationFlow.deleteCreatedUser();
  });
  //generate new user data for registration

  test("TC03 - Login with incorrect email and password", async ({ page }) => {
    const registrationFlow = new RegistrationFlow(page);
    //verification of home page loading and accepting cookies
    await registrationFlow.homePage.verificationOfHomePageLoading();
    //begin of the login proccess
    await registrationFlow.homePage.loginSignupButton.click();
    //verify of registration/signup page loading and filling the login form with incorrect email and password
    await registrationFlow.registerSignupPage.loginWithUserData(
      "incorrect@example.com",
      "incorrectpassword",
    );
    //verification of error message for incorrect email and password
    await registrationFlow.registerSignupPage.displayErrorMessageAfterLoginWithIncorrectData();
  });

  test("TC04 - Logout user", async ({ page }) => {
    const registrationFlow = new RegistrationFlow(page);
    //registration of new user and verification of registration
    await registrationFlow.registerNewUser();
    //logout from created account and verification of logout
    await registrationFlow.logoutFromCreatedUser();
    //login with created user data and verification of login
    await registrationFlow.loginWithCreatedUserData();
    //repeat of logout from created account and verification of logout
    await registrationFlow.logoutFromCreatedUser();
    await expect(registrationFlow.homePage.loggedInAsText).toBeHidden();
    await expect(registrationFlow.registerSignupPage.loginAccountHeader).toBeVisible();
  });
});
