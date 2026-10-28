import { expect, Locator, Page } from "@playwright/test";
import { CartPage } from "./CartPage";

export class ProductPage{
    private readonly page:Page
    private readonly itemsContainer: Locator
    readonly productTitle: Locator
    readonly addToCartButton: Locator
    readonly outOfStockCard: Locator

    constructor(page:Page){
        this.page = page
        this.itemsContainer = page.locator('div.container[data-test=""] a.card')
        this.productTitle = page.locator('[data-test="product-name"]')
        this.addToCartButton = page.getByRole('button', { name: 'Add to cart' })
        this.outOfStockCard = page.locator('a.card').filter({ hasText: 'Out of stock' }).first()
    }
    async selectRandomProduct(){
        await this.itemsContainer.first().waitFor({ state: 'visible', timeout: 5000 });
        const allItems = await this.itemsContainer.all()
        const randomIndex = Math.floor(Math.random() * allItems.length)
        const randomItem = allItems[randomIndex]

        const expectedName = (await randomItem.locator('.card-title').innerText()).trim()
        await randomItem.click()
        return expectedName
    }

    async selectOutOfStockProduct() {
        await this.outOfStockCard.click()
    }

}