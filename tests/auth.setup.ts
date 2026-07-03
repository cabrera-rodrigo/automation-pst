import { test as setup } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { CheckoutPage } from '../pages/CheckoutPage'

const authFile = 'playwright/.auth/user.json'

setup('authenticate', async ({page}) =>{
    const loginPage = new LoginPage(page)
    await page.goto('https://practicesoftwaretesting.com/')
    await loginPage.loginWithCredentials(process.env.USER_EMAIL!, process.env.USER_PASSWORD!)
    await page.waitForURL('https://practicesoftwaretesting.com/account')
    await page.context().storageState({ path: authFile })
})