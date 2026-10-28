import { expect, test } from '../../fixtures/pageObjects'

test('deberia ordenar productos por precio de menor a mayor', async ({ homePage }) =>{
    await homePage.home()
    await homePage.sortBy('price,asc')
    
    await expect.poll(async () => {
        const prices = await homePage.getVisiblePrices()
        return prices.length > 1 && prices[0] <= prices[1]
    }).toBe(true)
})

test('deberia filtrar por categoria', async ({ homePage }) => {
    await homePage.home()
    const checkbox = await homePage.selectRandomSubcategory()
    await expect(checkbox).toBeChecked()
})

test('deberia filtrar por marca', async ({ homePage }) => {
    await homePage.home()
    const checkbox = await homePage.selectRandomSubBrand()
    await expect(checkbox).toBeChecked()
    await expect(homePage.productCards.first()).toBeVisible()
})

test('deberia filtrar por sustentabilidad', async ({ homePage }) => {
    await homePage.home()
    await homePage.selectSustainability()
    await expect(homePage.productCards.first()).toBeVisible()
})