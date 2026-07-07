import { products } from '../../data/products'
import { test } from '../../fixtures/pageObjects'

test('deberia buscar un producto existente', async ({page, homePage}) =>{
    await homePage.home()
    await homePage.searchProduct(products.pliers)
    // await page.pause()
})

test('intentar buscar un producto inexistente', async ({page, homePage}) => {
    await homePage.home()
    await homePage.searchProduct('abc123')
    await homePage.checkNoResult()
})