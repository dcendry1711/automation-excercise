import { Page, Locator, expect } from "@playwright/test";
import { contactUsFormData } from "../data/contactUsForm.data";

export class ContactUsPage {

    getInTouchHeader: Locator;
    formNameInput: Locator;
    formEmailInput: Locator;
    formSubjectInput: Locator;
    formMessageInput: Locator;
    selectedFileBtn: Locator;
    submitButton: Locator;
    successMessage: Locator;
    backToHomePageBtn: Locator;

    async fillContactUsForm(name: string, email: string, subject: string, message: string, filePath: string) {
        await this.formNameInput.fill(contactUsFormData.name);
        await this.formEmailInput.fill(contactUsFormData.email);
        await this.formSubjectInput.fill(contactUsFormData.subject);
        await this.formMessageInput.fill(contactUsFormData.message);
        await this.selectedFileBtn.setInputFiles(contactUsFormData.filePath);
    }

    async verifySuccessfulFormSubmission() {
        await expect(this.successMessage).toBeVisible();
        await expect(this.successMessage).toHaveText("Success! Your details have been submitted successfully.");
    }

    constructor(private page: Page) {
        this.getInTouchHeader = page.getByRole('heading', { name: 'Get In Touch' })
        this.formNameInput = page.getByRole('textbox', { name: 'Name' });
        this.formEmailInput = page.getByRole('textbox', { name: 'Email', exact: true });
        this.formSubjectInput = page.getByRole('textbox', { name: 'Subject' });
        this.formMessageInput = page.getByRole('textbox', { name: 'Your Message Here' });
        this.selectedFileBtn = page.getByRole('button', { name: 'Choose File' });
        this.submitButton = page.getByRole('button', { name: 'Submit' });
        this.successMessage = page.locator('#contact-page').getByText('Success! Your details have');
        this.backToHomePageBtn = page.getByRole('link', { name: ' Home' });
    }
}