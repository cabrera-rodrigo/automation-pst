import { expect, Locator, Page } from "@playwright/test";
import { CartPage } from "./CartPage";

export class ProductPage{
    private readonly page:Page
    private readonly itemsContainer: Locator

    constructor(page:Page){
        this.page = page
        this.itemsContainer = page.locator('div.container[data-test=""] a.card')

    }
    async getProduct(){
        await this.itemsContainer.first().waitFor({ state: 'visible', timeout: 5000 });
        const allItems = await this.itemsContainer.all()
        const randomIndex = Math.floor(Math.random() *allItems.length)
        const randomItem = allItems[randomIndex]

        await randomItem.locator('.card-title').click()
    }

}