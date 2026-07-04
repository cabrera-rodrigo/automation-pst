import { test as setup } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'

const authFile = 'playwright/.auth/user.json'

setup('authenticate', async ({page}) =>{
    const loginPage = new LoginPage(page)
    await page.goto(process.env.BASE_URL!)
    await loginPage.loginWithCredentials(process.env.USER_EMAIL!, process.env.USER_PASSWORD!)
    await page.waitForURL('https://practicesoftwaretesting.com/account')
    await page.context().storageState({ path: authFile })
})