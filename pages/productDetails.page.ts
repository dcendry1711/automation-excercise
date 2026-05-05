import {Page, Locator, expect} from "@playwright/test";

export class ProductDetailsPage {

    productName: Locator;
    productCategory: Locator;
    productPrice: Locator;
    productAvailability: Locator;
    productCondition: Locator;
    productBrand: Locator;

    async verifyProductDetailsVisibility() {
        await expect(this.productName).toBeVisible();
        await expect(this.productCategory).toBeVisible();
        await expect(this.productPrice).toBeVisible();
        await expect(this.productAvailability).toBeVisible();
        await expect(this.productCondition).toBeVisible();
        await expect(this.productBrand).toBeVisible();
    }

    constructor(private page: Page) {
        this.productName = page.getByRole('heading', { name: 'Blue Top' });
        this.productCategory = page.getByRole('heading', { name: 'Blue Top' });
        this.productPrice = page.getByText('Rs.');
        this.productAvailability = page.getByText('Availability: In Stock');
        this.productCondition = page.getByText('Condition: New');
        this.productBrand = page.getByText('Brand: Polo');
    }
}