import { checkoutData } from '../../data/checkoutData'
import { test, expect } from '../../fixtures/pageObjects'

test.skip(!!process.env.CI, 'Omitido en CI: Cloudflare Turnstile bloquea auth.setup desde IPs de GitHub Actions');
test('Deberia completar compra exitosamente', async ({ homePage, cartPage, checkoutPage}) => {
    await homePage.home()
    await cartPage.addProductOnCart()
    await expect(checkoutPage.verifiedLogin()).toBeVisible()
    await checkoutPage.checkoutFinal(
        checkoutData.postalCode,
        checkoutData.houseNumber,
        checkoutData.street,
        checkoutData.city,
        checkoutData.state
    )
    await expect(checkoutPage.paymentSuccessAlert).toBeVisible()
})

test.skip(!!process.env.CI, 'Omitido en CI: Cloudflare Turnstile bloquea auth.setup desde IPs de GitHub Actions');
test('no deberia permitir avanzar al pago dejando campos obligatorios vacios', async ({ homePage, cartPage, checkoutPage}) => {
    await homePage.home()
    await cartPage.addProductOnCart()
    await checkoutPage.clickOnCheckout()
    await checkoutPage.clickOnCheckout()
    await checkoutPage.fillAdress('','','Avenida siempre viva','Berazategui','')
    await expect(checkoutPage.proceedToCheckoutStep3Button).toBeDisabled()
})