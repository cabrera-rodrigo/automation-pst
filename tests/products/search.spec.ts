import { products } from '../../data/products'
import { expect, test } from '../../fixtures/pageObjects'

test('deberia buscar un producto existente', async ({ homePage }) =>{
    await homePage.home()
    await homePage.searchProduct(products.pliers)
    await expect(homePage.productTitles.first()).toContainText(products.pliers)
})

test('intentar buscar un producto inexistente', async ({ homePage }) => {
    await homePage.home()
    await homePage.searchProduct('abc123')
    await homePage.checkNoResult()
})