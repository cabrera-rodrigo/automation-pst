import { test } from '../../fixtures/pageObjects'

test('deberia verse un producto', async ({page, homePage, productPage}) =>{
    await homePage.home()
    await productPage.getProduct()
    // await page.pause()
})