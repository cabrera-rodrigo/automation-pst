import { expect, test } from '../../fixtures/pageObjects'

test('deberia filtrar productos', async ({page, homePage}) =>{
    await homePage.home()
    await homePage.sortBy('price,asc')
    await homePage.setPriceRange(30,150)
    // await page.pause()
})

test('deberia filtrar por categoria', async ({page, homePage}) => {
    await homePage.home()
    await homePage.selectRandomSubcategory()
    // await page.pause()
})

test('deberia filtrar por marca', async ({page, homePage}) => {
    await homePage.home()
    await homePage.selectRandomSubBrand()
    // await page.pause()
})

test('deberia filtrar por sustentabilidad', async ({page, homePage}) => {
    await homePage.home()
    await homePage.selectSustainability()
    // await page.pause()
})