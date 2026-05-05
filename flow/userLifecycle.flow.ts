import { expect, Page } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { RegisterSignupPage } from "../pages/registerSignup.page";
import { AccountInformationPage } from "../pages/accountInformation.page";
import { CreatedAccountPage } from "../pages/createdAcc.page";
import { DeletedAccountPage } from "../pages/deletedAccount.page";
import { generateNewUserData } from "../utils/generateNewUserData";
import { accountInformationFormUserData } from "../data/registeredUserData.data";

export class UserLifecycle {
  homePage: HomePage;
  registerSignupPage: RegisterSignupPage;
  accountInformationPage: AccountInformationPage;
  createdAccountPage: CreatedAccountPage;
  deletedAccountPage: DeletedAccountPage;

  userDataArr: Array<{ name: string; email: string }> = [];

async registerNewUser() {
    //generate new user data for registration
    const userData = generateNewUserData();
    this.userDataArr.push(userData);
    //verification of home page loading and accepting cookies
    await this.homePage.verificationOfHomePageLoading();
    //begin of the registration proccess
    await this.homePage.loginSignupMenuButton.click();
    //verify of registration page loading and filling the registration form
    await this.registerSignupPage.verificationOfRegisterSignupPageLoadingAndFillingForm(userData.name, userData.email);
    //verification of account information page loading and filling the account information form
    await this.accountInformationPage.verificationOfAccountInformationPageLoadingAndFillingForm();
    //verification of account creation
    await this.createdAccountPage.verificationOfCreatedAccountPageLoadingAndFinishRegistration();
    await this.homePage.verificationOfCreatedAccount(userData.name);
  }

  async deleteCreatedUser() {
    //deletion of created account and verification of deletion
    await this.homePage.deleteCreatedAccount();
    await this.deletedAccountPage.deleteAccountProccessAndVerification();
    await this.homePage.verificationOfDeletedAccount();
  }

  async logoutFromCreatedUser() {
    await this.homePage.logoutFromAccount();
    await expect(this.homePage.loggedInAsText).toBeHidden();
  }

  async loginWithCreatedUserData() {
    await this.homePage.loginSignupMenuButton.click();
    //verify of registration page loading and filling the registration form
    await this.registerSignupPage.loginWithUserData(this.userDataArr[0].email, accountInformationFormUserData.password);
    //verification of account information page loading and filling the account information form
    await this.homePage.verificationOfCreatedAccount(this.userDataArr[0].name);
  }

  constructor(private page: Page) {
    this.homePage = new HomePage(page);
    this.registerSignupPage = new RegisterSignupPage(page);
    this.accountInformationPage = new AccountInformationPage(page);
    this.createdAccountPage = new CreatedAccountPage(page);
    this.deletedAccountPage = new DeletedAccountPage(page);
  }
}
