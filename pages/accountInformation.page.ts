import { Locator, Page, expect } from "@playwright/test";
import { accountInformationFormUserData } from "../data/registeredUserData.data";

export class AccountInformationPage {
  accountInformationForm: Locator;
  userGenderRadioButton: Locator;
  userPasswordInput: Locator;
  dateOfBirthDaySelect: Locator;
  dateOfBirthMonthSelect: Locator;
  dateOfBirthYearSelect: Locator;
  newsletterCheckbox: Locator;
  specialOffersCheckbox: Locator;
  firstNameInput: Locator;
  lastNameInput: Locator;
  companyInput: Locator;
  address1Input: Locator;
  address2Input: Locator;
  countrySelect: Locator;
  stateInput: Locator;
  cityInput: Locator;
  zipcodeInput: Locator;
  mobileNumberInput: Locator;
  createAccountButton: Locator;

  async verificationOfAccountInformationPageLoadingAndFillingForm() {
    await expect(this.accountInformationForm).toBeVisible();
    await this.userGenderRadioButton.click();
    await this.userPasswordInput.fill(accountInformationFormUserData.password);
    await this.dateOfBirthDaySelect.selectOption(
      accountInformationFormUserData.dayOfBirth,
    );
    await this.dateOfBirthMonthSelect.selectOption(
      accountInformationFormUserData.monthOfBirth,
    );
    await this.dateOfBirthYearSelect.selectOption(
      accountInformationFormUserData.yearOfBirth,
    );
    await this.newsletterCheckbox.check();
    await this.specialOffersCheckbox.check();
    await this.firstNameInput.fill(accountInformationFormUserData.firstName);
    await this.lastNameInput.fill(accountInformationFormUserData.lastName);
    await this.companyInput.fill(accountInformationFormUserData.company);
    await this.address1Input.fill(accountInformationFormUserData.address);
    await this.address2Input.fill(accountInformationFormUserData.address2);
    await this.countrySelect.selectOption(
      accountInformationFormUserData.country,
    );
    await this.stateInput.fill(accountInformationFormUserData.state);
    await this.cityInput.fill(accountInformationFormUserData.city);
    await this.zipcodeInput.fill(accountInformationFormUserData.zipcode);
    await this.mobileNumberInput.fill(
      accountInformationFormUserData.mobileNumber,
    );
    await this.createAccountButton.click();
  }

  constructor(private page: Page) {
    this.accountInformationForm = page
      .locator("div")
      .filter({ hasText: "Enter Account Information" })
      .nth(2);
    this.userGenderRadioButton = page.locator("#uniform-id_gender1");
    this.userPasswordInput = page.getByRole("textbox", {
      name: "Password *",
      exact: true,
    });
    this.dateOfBirthDaySelect = page.locator("#days");
    this.dateOfBirthMonthSelect = page.locator("#months");
    this.dateOfBirthYearSelect = page.locator("#years");
    this.newsletterCheckbox = page.getByRole("checkbox", {
      name: "Sign up for our newsletter!",
    });
    this.specialOffersCheckbox = page.getByRole("checkbox", {
      name: "Receive special offers from",
    });
    this.firstNameInput = page.getByRole("textbox", { name: "First name *" });
    this.lastNameInput = page.getByRole("textbox", { name: "Last name *" });
    this.companyInput = page.getByRole("textbox", {
      name: "Company",
      exact: true,
    });
    this.address1Input = page.getByRole("textbox", {
      name: "Address * (Street address, P.",
    });
    this.address2Input = page.getByRole("textbox", { name: "Address 2" });
    this.countrySelect = page.getByLabel("Country *");
    this.stateInput = page.getByRole("textbox", { name: "State *" });
    this.cityInput = page.getByRole("textbox", { name: "City * Zipcode *" });
    this.zipcodeInput = page.locator("#zipcode");
    this.mobileNumberInput = page.getByRole("textbox", {
      name: "Mobile Number *",
    });
    this.createAccountButton = page.getByRole("button", {
      name: "Create Account",
    });
  }
}
