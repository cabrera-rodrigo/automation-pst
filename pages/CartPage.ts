import { expect, Locator, Page } from "@playwright/test";

export class CartPage{
    private readonly page:Page
    private readonly itemsContainer: Locator
    private readonly addtocartButton: Locator
    private readonly cartLink: Locator
    private readonly productQuantity: Locator
    private readonly removeButton: Locator
    private readonly alertEmpty: Locator
    private readonly tableItem: Locator

    constructor(page:Page){
        this.page = page
        this.itemsContainer = page.locator('div.container[data-test=""] a.card')
        this.addtocartButton = page.getByRole('button', {name:'Add to cart'})
        this.cartLink = page.getByRole('link', {name:'cart'})
        this.productQuantity = page.getByRole('spinbutton', {name:'Quantity for Combination Pliers'})
        this.removeButton = page.locator('a.btn-danger')
        this.alertEmpty = page.getByText('The cart is empty. Nothing to display.')
        this.tableItem = page.locator('table.table-hover')
    }

    async getItem(){
        await this.itemsContainer.first().waitFor({ state: 'visible', timeout: 5000 });
        const allItems = await this.itemsContainer.all()
        const randomIndex = Math.floor(Math.random() * allItems.length)
        const randomItem = allItems[randomIndex]

        const expectedName = await randomItem.locator('.card-title').innerText()
        await console.log(`Nombre: ${expectedName}`)

        await randomItem.locator('.card-title').click()
    }
    async clickOnAddtocart(){
        await this.addtocartButton.click()
    }
    async checkCart(){
        await this.cartLink.click()
    }
    
    checkItem(){
        return this.tableItem
    }

    async modifyQuantity(action: 'add' | 'subtract', amount: number){
        const currentInputValue = await this.productQuantity.inputValue()
        const currentQuantity = parseInt(currentInputValue, 10) || 1

        let newQuantity = currentQuantity
        if (action === 'add') {
            newQuantity = currentQuantity + amount
        } else if (action === 'subtract') {
            newQuantity = currentQuantity - amount
        }

        if (newQuantity < 1) newQuantity = 1
        if (newQuantity > 99) newQuantity = 99
        
        await this.productQuantity.fill(newQuantity.toString())

        await this.productQuantity.press('Enter')

        console.log(`Cantidad actualizada de ${currentQuantity} a ${newQuantity} (${action === 'add'?'sumando' : 'restando'} ${amount})`)
    }
    
    async removeProduct(){
        await this.removeButton.click()
        await expect(this.alertEmpty).toBeVisible
    }

    async addProductOnCart(){
        await this.getItem()
        await this.clickOnAddtocart()
        await this.checkCart()
    }

}