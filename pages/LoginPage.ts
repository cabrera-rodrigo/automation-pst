import { expect, Locator, Page } from "@playwright/test";

export class LoginPage{
    // private readonly loginNavigation: Locator

    private readonly usernameTextbox: Locator
    private readonly passwordTextbox: Locator
    private readonly loginButton: Locator
    private readonly successfulLogin: Locator
    private readonly signinLink: Locator
    private readonly invalidLogin: Locator
    private readonly emailAlert: Locator
    private readonly passwordAlert: Locator
    private readonly page:Page

    constructor(page:Page){
        this.page = page
        this.usernameTextbox = page.getByRole('textbox', {name:'Email address'})
        this.passwordTextbox = page.getByRole('textbox', {name:'Password'})
        this.loginButton = page.getByRole('button', {name:'Login'})
        this.successfulLogin = page.getByText('My account');
        this.signinLink = page.getByRole('link', {name:'Sign in'})
        this.invalidLogin = page.getByText('Invalid email or password')
        this.emailAlert = page.getByText('Email is required')
        this.passwordAlert = page.getByText('Password is required')
    }
    async navigateTo(){
        await this.signinLink.click()
    }

    async fillUsername(username:string){
        await this.usernameTextbox.fill(username)
    }
    async fillPassword(password:string){
        await this.passwordTextbox.fill(password)
    }
    async clickOnLogin(){
        await this.loginButton.click()
    }
    checkSuccessfulLogin(){
        return this.successfulLogin
    }

    checkInvalidLogin(){
        return this.invalidLogin
    }

    emailRequiredVisible(){
        return this.emailAlert
    }
    passwordRequiredVisible(){
        return this.passwordAlert
    }

    async loginWithCredentials(username:string, password:string){
        await this.navigateTo()
        await this.fillUsername(username)
        await this.fillPassword(password)
        await this.clickOnLogin()
    }
}