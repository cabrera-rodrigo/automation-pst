import {expect, test} from '../../fixtures/pageObjects'

test('deberia agregarse un producto en el carrito', async ({page, cartPage,homePage}) => {
    await homePage.home()
    await cartPage.addProductOnCart()
    await expect(cartPage.checkItem()).toBeVisible()
    await page.pause()
})

test('deberia modificar la cantidad de un producto dentro del carrito', async ({page,homePage, cartPage}) => {
    await homePage.home()
    await cartPage.addProductOnCart()
    await cartPage.modifyQuantity('add', 3)
    await page.pause()
    
})

test('deberia eliminar un producto del carrito', async ({page,homePage,cartPage}) => {
    await homePage.home()
    await cartPage.addProductOnCart()
    await cartPage.removeProduct()
    await page.pause()
})