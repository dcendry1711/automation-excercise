import { test, expect } from "../fixtures/automationExcercises.fixture";
import { registeredUserData } from "../data/registeredUserData.data";
import { UserLifecycle } from "../flow/userLifecycle.flow";
import { handleDialog } from "../utils/handleDialog";
import { contactUsFormData } from "../data/contactUsForm.data";

test.describe("Automation excercises test cases", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
    await page.waitForLoadState("domcontentloaded");
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
  //generate new user data for registration

  test("TC03 - Login with incorrect email and password", async ({ page }) => {
    const userLifecycle = new UserLifecycle(page);
    //verification of home page loading and accepting cookies
    await userLifecycle.homePage.verificationOfHomePageLoading();
    //begin of the login proccess
    await userLifecycle.homePage.loginSignupButton.click();
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
    await userLifecycle.homePage.verificationOfHomePageLoading();
    await userLifecycle.homePage.loginSignupButton.click();
    await userLifecycle.registerSignupPage.signupNameInput.fill(registeredUserData.name);
    await userLifecycle.registerSignupPage.signupEmailInput.fill(registeredUserData.email);
    await userLifecycle.registerSignupPage.signupButton.click();
    //verification of error message for existing email
    await expect(userLifecycle.registerSignupPage.errorRegistrationMessage).toBeVisible();
    await userLifecycle.registerSignupPage.displayErrorMessageForExistingEmail();
  });

  test("TC06 - Contact us form", async ({ page, homePage, contactUsPage }) => {
    //verification of home page loading and accepting cookies
    await homePage.verificationOfHomePageLoading();
    //navigation to contact us page and verification of loading
    await homePage.contactUsButton.click();
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
});