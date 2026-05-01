import { test, expect } from "../fixtures/automationExcercises.fixture";
test.describe("E2E - Register new user process", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('');
    await page.waitForLoadState('domcontentloaded');
  });

  test("E2E TC01 - Register new user", async ({ homePage, registerSignupPage, accountInformationPage, createdAccountPage, deletedAccountPage }) => {
    await homePage.consentAcceptButton.click();
    await expect(homePage.leftSidebar).toBeVisible();
    await homePage.loginSignupButton.click();
    await expect(registerSignupPage.signupForm).toContainText("New User Signup!");
    await registerSignupPage.signupNameInput.fill("Daniel");
    await registerSignupPage.signupEmailInput.fill("dan999.cendry@gmail.com");
    await registerSignupPage.signupButton.click();
    await expect(accountInformationPage.accountInformationForm).toBeVisible();
    await accountInformationPage.userGenderRadioButton.click();
    await accountInformationPage.userPasswordInput.fill("12345678");
    await accountInformationPage.dateOfBirthDaySelect.selectOption("10");
    await accountInformationPage.dateOfBirthMonthSelect.selectOption("5");
    await accountInformationPage.dateOfBirthYearSelect.selectOption("1990");
    await accountInformationPage.newsletterCheckbox.check();
    await accountInformationPage.specialOffersCheckbox.check();
    await accountInformationPage.firstNameInput.fill("Daniel");
    await accountInformationPage.lastNameInput.fill("Cendry");
    await accountInformationPage.companyInput.fill("Test Company");
    await accountInformationPage.address1Input.fill("Test Street 123");
    await accountInformationPage.address2Input.fill("Test Street 456");
    await accountInformationPage.countrySelect.selectOption("United States");
    await accountInformationPage.stateInput.fill("California");
    await accountInformationPage.cityInput.fill("Los Angeles");
    await accountInformationPage.zipcodeInput.fill("90001");
    await accountInformationPage.mobileNumberInput.fill("+1234567890");
    await accountInformationPage.createAccountButton.click();
    await expect(createdAccountPage.createdAccountMessage).toContainText("ACCOUNT CREATED!");
    await createdAccountPage.finishCreatingAccountButton.click();
    await expect(homePage.loggedInAsText).toContainText("Logged in as Daniel");
    await homePage.deleteAccountButton.click();
    await expect(deletedAccountPage.deletedAccountMessage).toContainText("ACCOUNT DELETED!");
    await deletedAccountPage.finishDeletingAccountButton.click();
    await expect(homePage.loggedInAsText).not.toBeVisible();
    await expect(homePage.loginSignupButton).toBeVisible();
    await expect(homePage.leftSidebar).toBeVisible();
  });
});
