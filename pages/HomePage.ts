import { expect, Locator, Page } from "@playwright/test";

export class HomePage{
    private readonly page:Page
    private readonly searchInput: Locator
    private readonly searchButton: Locator
    private readonly signInLink: Locator
    private readonly homeLink: Locator
    private readonly filterByCategory:Locator
    private readonly filterBySubcategories:Locator
    private readonly filterByBrand: Locator
    private readonly filterBySubbrands: Locator
    private readonly filterSustainability: Locator
    private readonly filterSustainabilityCheckbox: Locator
    private readonly sortDropdown: Locator
    private readonly priceSliderMinHandle: Locator
    private readonly priceSliderMaxHandle: Locator
    private readonly alertNoResults: Locator

    constructor(page:Page){
        this.page = page
        this.searchInput = page.locator('#search-query')
        this.searchButton = page.getByRole('button', {name:'Search'})
        this.signInLink = page.getByRole('link', {name:'Sign in'})
        this.homeLink = page.getByRole('link', {name:'Home'})
        this.filterByCategory = page.getByRole('group', {name:'Categories'}).first()
        this.filterBySubcategories = this.filterByCategory.locator('ul input[type="checkbox"]')
        this.filterByBrand = page.getByRole('group', {name:'Brands'})
        this.filterBySubbrands = this.filterByBrand.locator('input[type="checkbox"]')
        this.filterSustainability = page.getByRole('group', {name:'Eco-Friendly Products'})
        this.filterSustainabilityCheckbox = this.filterSustainability.locator('input[type="checkbox"]')
        this.sortDropdown = page.getByRole('combobox', {name:'sort'})
        this.priceSliderMinHandle = page.getByRole('slider', {name:'ngx-slider', exact: true})
        this.priceSliderMaxHandle = page.getByRole('slider', {name:'ngx-slider-max'})
        this.alertNoResults = page.getByText('There are no products found.')
    }

    async sortBy(option: 'name,asc' | 'name,desc' | 'price,desc' | 'price,asc'){
        await this.sortDropdown.waitFor({state: 'visible'})

        await this.sortDropdown.selectOption(option)
        await this.page.waitForLoadState('networkidle')
    }

    async setPriceRange(targetMin:number, targetMax:number){
        //Manejo del minimo
        await this.priceSliderMinHandle.focus()
        // Leemos el valor actual desde el atributo aria-valuenow que nos da tu HTML
        let currentMin = parseInt(await this.priceSliderMinHandle.getAttribute('aria-valuenow') || '0')
        
        // Si el actual es menor al que quiero, muevo a la derecha. Si es mayor, a la izquierda.
        while (currentMin !== targetMin){
            if (currentMin < targetMin) {
                await this.page.keyboard.press('ArrowRight')
                currentMin++
            } else {
                await this.page.keyboard.press('ArrowLeft')
                currentMin--
            }
        }

        await this.priceSliderMaxHandle.focus()
        let currentMax = parseInt(await this.priceSliderMaxHandle.getAttribute('aria-valuenow') || '200')

        while (currentMax !== targetMax){
            if (currentMax < targetMax) {
                await this.page.keyboard.press('ArrowRight')
                currentMax++
            } else {
                await this.page.keyboard.press('ArrowLeft')
                currentMax--
            }
        }
        await this.page.waitForLoadState('networkidle')
    }

    async selectSustainability(){
        await this.filterSustainability.waitFor({state:'visible'})

        const checkbox = this.filterSustainabilityCheckbox

        await checkbox.check()
    }

    async selectRandomSubcategory(){
        await this.filterByCategory.waitFor({state:'visible'})

        const count = await this.filterBySubcategories.count()
        if (count === 0)throw new Error('No se encontraron checkboxes de subcategorias')

        const randomIndex = Math.floor(Math.random() * count)

        const randomCheckbox = this.filterBySubcategories.nth(randomIndex)

        await randomCheckbox.check()
        
    }
    async selectRandomSubBrand(){
        await this.filterByBrand.waitFor({state: 'visible'})

        const count = await this.filterBySubbrands.count()
        if (count === 0)throw new Error('No se encontraron checkboxes')

        const randomIndex = Math.floor(Math.random() * count)

        const randomCheckbox = this.filterBySubbrands.nth(randomIndex)

        await randomCheckbox.check()
    }

    async home(){
        await this.page.goto(process.env.BASE_URL!)
    }
    async clickOnHome(){
        await this.homeLink.click()
    }
    async openLogin(){
        await this.signInLink.click()
    }
    async fillSearch(productName:string){
        await this.searchInput.fill(productName)
    }
    async clickOnSearch(){
        await this.searchButton.click()
    }
    async checkNoResult(){
        await expect(this.alertNoResults).toBeVisible
    }
    
    async searchProduct(productName:string){
        await this.home()
        await this.fillSearch(productName)
        await this.clickOnSearch()
    }
}