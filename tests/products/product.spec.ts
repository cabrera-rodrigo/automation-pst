import { expect, test } from '../../fixtures/pageObjects'

test('deberia visualizar el detalle de un producto', async ({ homePage, productPage}) =>{
    await homePage.home()
    const selectedName = await productPage.selectRandomProduct()
    await expect(productPage.productTitle).toHaveText(selectedName)
    await expect(productPage.addToCartButton).toBeVisible()
})

test('no deberia permitir agregar al carrito un producto sin stock', async ({ homePage, productPage }) => {
    await homePage.home()
    await productPage.selectOutOfStockProduct()
    await expect(productPage.addToCartButton).toBeDisabled()
})