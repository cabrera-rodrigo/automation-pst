import { test as setup } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'

const authFile = 'playwright/.auth/user.json'

setup('authenticate' , async ({page}) =>{
    setup.skip(!!process.env.CI, 'Omitido en CI: Cloudflare Turnstile bloquea el login desde IPs de GitHub Actions');
    const loginPage = new LoginPage(page)
    await page.goto('/')
    await loginPage.loginWithCredentials(process.env.USER_EMAIL!, process.env.USER_PASSWORD!)
    await page.waitForURL('**/account')
    await page.context().storageState({ path: authFile })
})