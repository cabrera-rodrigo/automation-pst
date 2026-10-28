import {expect, test} from '../../fixtures/pageObjects'

test('deberia agregarse un producto en el carrito', async ({ cartPage,homePage }) => {
    await homePage.home()
    await cartPage.addProductOnCart()
    await expect(cartPage.checkItem()).toBeVisible()
})

test('deberia modificar la cantidad de un producto dentro del carrito', async ({ homePage, cartPage }) => {
    await homePage.home()
    await cartPage.addProductOnCart()
    const expectedQuantity = await cartPage.modifyQuantity('add', 3)
    await expect(cartPage.productQuantity).toHaveValue(expectedQuantity.toString())
    
})

test('deberia eliminar un producto del carrito', async ({ homePage,cartPage }) => {
    await homePage.home()
    await cartPage.addProductOnCart()
    await cartPage.removeProduct()
})