import { test, expect } from '../../fixtures/pageObjects'
import { users } from '../../data/users'

test('deberia loguearse correctamente', async ({loginPage, homePage}) => {
    await homePage.home()
    await homePage.openLogin()
    await loginPage.loginWithCredentials(process.env.USER_EMAIL!, process.env.USER_PASSWORD!)
    await expect(loginPage.checkSuccessfulLogin()).toBeVisible({ timeout: 15000 })
})

test('intento de login con constraseña incorrecta', async ({loginPage, homePage}) => {
    await homePage.home()
    await homePage.openLogin()
    await loginPage.loginWithCredentials(users.invalidPassword.email,users.invalidPassword.password)
    await expect(loginPage.checkInvalidLogin()).toBeVisible()
})

test('intento de login con un correo que no existe', async ({loginPage,homePage}) => {
    await homePage.home()
    await homePage.openLogin()
    await loginPage.loginWithCredentials(users.invalidEmail.email, users.invalidEmail.password)
    await expect(loginPage.checkInvalidLogin()).toBeVisible()
})

test('intento de login dejando los campos vacios', async ({loginPage, homePage}) => {
    await homePage.home()
    await homePage.openLogin()
    await loginPage.loginWithCredentials('','')
    await expect(loginPage.emailRequiredVisible()).toBeVisible()
    await expect(loginPage.passwordRequiredVisible()).toBeVisible()
})
