import { checkoutData } from '../../data/checkoutData'
import { test, expect } from '../../fixtures/pageObjects'

test('Deberia completar compra exitosamente', async ({page,homePage, cartPage, checkoutPage}) => {
    await homePage.home()
    //  await page.pause()
    // await homePage.clickOnHome()
    // await page.pause()
    await cartPage.addProductOnCart()
    await expect(checkoutPage.verifiedLogin()).toBeVisible()
    await checkoutPage.checkoutFinal(
        checkoutData.postalCode,
        checkoutData.houseNumber,
        checkoutData.street,
        checkoutData.city,
        checkoutData.state)
    await page.pause()
})

test('intentar avanzar dejando campos obligatorios vacios', async ({page, homePage, cartPage, checkoutPage}) => {
    await homePage.home()
    await homePage.clickOnHome()
    await cartPage.addProductOnCart()
    await checkoutPage.checkoutFinal('','','Avenida siempre viva','Berazategui','')
    // await page.pause()
})