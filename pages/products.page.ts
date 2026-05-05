import {Page, Locator} from "@playwright/test";

export class ProductsPage {

    productsPageHeader: Locator;
    productsList: Locator;
    viewProductButtonOf1stProduct: Locator;
    searchProductInput: Locator;
    submitSearchProductButton: Locator;
    searchedProductsHeader: Locator;
    searchedProductsList: Locator;

    constructor(private page: Page) {
        this.productsPageHeader = page.getByRole('heading', { name: 'All Products' });
        this.productsList = page.getByText('All Products  Added! Your');
        this.viewProductButtonOf1stProduct = page.getByRole('link', { name: ' View Product' }).first();
        this.searchProductInput = page.getByRole('textbox', { name: 'Search Product' });
        this.submitSearchProductButton = page.locator('#submit_search');
        this.searchedProductsHeader = page.getByRole('heading', { name: 'Searched Products' });
        this.searchedProductsList = page.getByText('Searched Products  Added!');
    }
}