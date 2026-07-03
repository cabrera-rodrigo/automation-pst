import { Locator, Page } from "@playwright/test";
import { HomePage } from "./HomePage";

export class CheckoutPage{

    private readonly checkoutButton: Locator
    private readonly countryCombobox: Locator
    private readonly postalTextbox: Locator
    private readonly numberTextbox: Locator
    private readonly streetTextbox: Locator
    private readonly cityTextbox: Locator
    private readonly stateTextbox: Locator
    private readonly paymentCombobox: Locator
    private readonly login:Locator

    constructor(page:Page){
        this.checkoutButton = page.getByRole('button', {name:'Proceed to checkout'})
        this.countryCombobox = page.getByRole('combobox', {name:'Country'})
        this.postalTextbox = page.getByRole('textbox', {name:'Postal code'})
        this.numberTextbox = page.getByRole('textbox', {name:'House number'})
        this.streetTextbox = page.getByRole('textbox', {name:'Street'})
        this.cityTextbox = page.getByRole('textbox', {name:'City'})
        this.stateTextbox = page.getByRole('textbox', {name:'State'})
        this.paymentCombobox = page.getByRole('combobox', {name:'Payment Method'})
        this.login = page.getByRole('button', {name: 'Bob Smith'})
    }
    verifiedLogin(){
        return this.login
    }

    async clickOnCheckout(){
        await this.checkoutButton.click()
    }
    async selectRandomCountry(): Promise<string>{
        const optionsLocator = this.countryCombobox.locator('option')

        const totalOptions = await optionsLocator.count()

        const randomIndex = Math.floor(Math.random() * totalOptions)

        await this.countryCombobox.selectOption({index: randomIndex})

        const selectedValue = await this.countryCombobox.inputValue()
        console.log(`Pais seleccionado aleatoriamente con exito. ${selectedValue}`)

        return selectedValue
    }
    async fillPostalCode(postalCode:string){
        await this.postalTextbox.fill(postalCode)
    }
    async fillNumber(houseNumber:string){
        await this.numberTextbox.fill(houseNumber)
    }
    async fillStreet(street:string){
        await this.streetTextbox.fill(street)
    }
    async fillCity(city:string){
        await this.cityTextbox.fill(city)
    }
    async fillState(state:string){
        await this.stateTextbox.fill(state)
    }

    async selectPayment(){
        const optionsLocator = this.paymentCombobox.locator('option')
        const totalOptions = await optionsLocator.count()
        const randomIndex = Math.floor(Math.random() * totalOptions)

        await this.paymentCombobox.selectOption({index: randomIndex})
        const selectedValue = await this.paymentCombobox.inputValue()
        console.log(`Metodo de pago elegido con exito. ${selectedValue}`)

        return selectedValue
    }

    async checkoutFinal(postalCode:string, houseNumber:string, street:string, city:string, state:string){
        await this.clickOnCheckout()
        await this.clickOnCheckout()
        await this.selectRandomCountry()
        await this.fillPostalCode(postalCode)
        await this.fillNumber(houseNumber)
        await this.fillStreet(street)
        await this.fillCity(city)
        await this.fillState(state)
        await this.clickOnCheckout()
        await this.selectPayment()
    }

}