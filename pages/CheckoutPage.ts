import { expect, Locator, Page } from "@playwright/test";

export class CheckoutPage{

    private readonly checkoutButton: Locator
    private readonly confirmButton: Locator
    private readonly countryCombobox: Locator
    private readonly postalTextbox: Locator
    private readonly numberTextbox: Locator
    private readonly streetTextbox: Locator
    private readonly cityTextbox: Locator
    private readonly stateTextbox: Locator
    private readonly paymentCombobox: Locator
    private readonly navMenuUser: Locator
    readonly paymentSuccessAlert: Locator
    readonly proceedToCheckoutStep3Button: Locator
    //private readonly login:Locator

    constructor(page:Page){
        this.checkoutButton = page.getByRole('button', {name:'Proceed to checkout'})
        this.proceedToCheckoutStep3Button = page.locator('[data-test="proceed-3"]')
        this.confirmButton = page.locator('[data-test="finish"]')
        this.countryCombobox = page.getByRole('combobox', {name:'Country'})
        this.postalTextbox = page.getByRole('textbox', {name:'Postal code'})
        this.numberTextbox = page.getByRole('textbox', {name:'House number'})
        this.streetTextbox = page.getByRole('textbox', {name:'Street'})
        this.cityTextbox = page.getByRole('textbox', {name:'City'})
        this.stateTextbox = page.getByRole('textbox', {name:'State'})
        this.paymentCombobox = page.getByRole('combobox', {name:'Payment Method'})
        this.navMenuUser = page.locator('[data-test="nav-menu"]')
        this.paymentSuccessAlert = page.locator('[data-test="payment-success-message"]')
        
        //this.login = page.getByRole('button', {name: 'Bob Smith'})
    }
    verifiedLogin(){
        return this.navMenuUser
    }

    async clickOnCheckout(){
        await this.checkoutButton.click()
    }

    async fillAdress(postalCode: string, houseNumber:string, street: string, city:string, state:string){
        await expect(this.streetTextbox).not.toHaveValue('')
        await this.countryCombobox.selectOption({ index: 1 })
        await this.postalTextbox.fill(postalCode)
        await this.numberTextbox.fill(houseNumber)
        await this.streetTextbox.fill(street)
        await this.cityTextbox.fill(city)
        await this.stateTextbox.fill(state)
    }
    
    async selectPaymentMethod(method: string = 'cash-on-delivery'){
        await this.paymentCombobox.selectOption(method)
    }

    async confirmOrder(){
        await this.confirmButton.click()
    }

    
    
    async checkoutFinal(postalCode:string, houseNumber:string, street:string, city:string, state:string){
        await this.clickOnCheckout()
        await this.clickOnCheckout()
        await this.fillAdress(postalCode, houseNumber, street, city, state)
        await this.clickOnCheckout()
        await this.selectPaymentMethod('cash-on-delivery')
        await this.confirmOrder()
    }

    // async fillPostalCode(postalCode:string){
    //     await this.postalTextbox.fill(postalCode)
    // }
    // async fillNumber(houseNumber:string){
    //     await this.numberTextbox.fill(houseNumber)
    // }
    // async fillStreet(street:string){
    //     await this.streetTextbox.fill(street)
    // }
    // async fillCity(city:string){
    //     await this.cityTextbox.fill(city)
    // }
    // async fillState(state:string){
    //     await this.stateTextbox.fill(state)
    // }
}