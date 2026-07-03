import { test as base } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'
import { CartPage } from '../pages/CartPage'
import { CheckoutPage } from '../pages/CheckoutPage'
import { ProductPage } from '../pages/ProductPage'

// Definimos los tipos de nuestras paginas
type MyFixtures = {
    homePage: HomePage
    loginPage: LoginPage
    cartPage: CartPage
    checkoutPage: CheckoutPage
    productPage: ProductPage
}

// Exportamos un nuevo "test" personalizado que inyecta los POM automaticamente
export const test = base.extend<MyFixtures>({
    homePage: async ({page}, use)=> {
        await use(new HomePage(page))
    },
    loginPage: async ({page}, use) => {
        await use(new LoginPage(page))
    },
    cartPage: async ({page}, use) => {
        await use(new CartPage(page))
    },
    checkoutPage: async ({page}, use) => {
        await use(new CheckoutPage(page))
    },
    productPage: async ({page}, use) => {
        await use(new ProductPage(page))
    }
})

export { expect } from '@playwright/test'