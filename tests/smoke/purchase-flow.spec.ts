import { test,expect } from "../../fixtures/pageObjects"
import { products } from "../../data/products"
import { checkoutData } from "../../data/checkoutData"

test.describe('Smoke Test - Flujo de compra E2E', () => {
    test.skip(!!process.env.CI, 'Omitido en CI: Cloudflare Turnstile bloquea auth.setup desde IPs de GitHub Actions');
    test('deberia buscar un producto especifico, agregarlo al carrito y completar el checkout', async ({
        homePage,
        productPage,
        cartPage,
        checkoutPage
    }) => {
        await test.step('1. Buscar producto en el catalogo y acceder al detalle', async () => {
            await homePage.home()
            await homePage.searchProduct(products.pliers)
            await expect(homePage.productTitles.first()).toContainText(products.pliers)
            await homePage.productCards.first().click()
            await expect(productPage.addToCartButton).toBeVisible()
        })

        await test.step('2. Agregar el producto al carrito y verificar la tabla', async () => {
            await cartPage.clickOnAddtocart()
            await cartPage.checkCart()
            await expect(cartPage.checkItem()).toBeVisible()
        })

        await test.step('3. Completar datos de envio, metodo de pago y confirmar orden', async () => {
            await expect(checkoutPage.verifiedLogin()).toBeVisible()
            await checkoutPage.checkoutFinal(
                checkoutData.postalCode,
                checkoutData.houseNumber,
                checkoutData.street,
                checkoutData.city,
                checkoutData.state
            )
            await expect(checkoutPage.paymentSuccessAlert).toBeVisible()
            await expect(checkoutPage.paymentSuccessAlert).toContainText('Payment was successful')
        })
    })
})