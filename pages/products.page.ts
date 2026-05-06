import {Page, Locator} from "@playwright/test";

export class ProductsPage {

    productsPageHeader: Locator;
    productsList: Locator;
    viewProductButtonOf1stProduct: Locator;
    addToCartBtnOf1stProduct: Locator;
    addToCartBtnOf2ndProduct: Locator;
    searchProductInput: Locator;
    submitSearchProductButton: Locator;
    searchedProductsHeader: Locator;
    searchedProductsList: Locator;
    addedProductToCartDialog: Locator;
    continueShoppingButton: Locator;
    viewCartBtn: Locator;

    constructor(private page: Page) {
        this.productsPageHeader = page.getByRole('heading', { name: 'All Products' });
        this.productsList = page.getByText('All Products  Added! Your');
        this.viewProductButtonOf1stProduct = page.getByRole('link', { name: ' View Product' }).first();
        this.addToCartBtnOf1stProduct = page.locator('a[data-product-id="1"]').first();
        this.addToCartBtnOf2ndProduct = page.locator('a[data-product-id="2"]').first();
        this.searchProductInput = page.getByRole('textbox', { name: 'Search Product' });
        this.submitSearchProductButton = page.locator('#submit_search');
        this.searchedProductsHeader = page.getByRole('heading', { name: 'Searched Products' });
        this.searchedProductsList = page.getByText('Searched Products  Added!');
        this.addedProductToCartDialog = page.getByText(' Added! Your product has')
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
        this.viewCartBtn = page.getByRole('link', { name: 'View Cart' });
    }
}