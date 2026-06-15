import { Locator, Page } from '@playwright/test';

export class LoginPage {
    private _page: Page;
    private _usernameInput: Locator;
    private _passwordInput: Locator;
    private _loginButton: Locator;

    constructor(page: Page) {
        this._page = page;

        this._usernameInput = this._page.locator('#username');
        this._passwordInput = this._page.locator('#password');
        this._loginButton = this._page.locator('button[type="submit"]');
    }

    get page(): Page {
        return this._page;
    }

    async goto() {
        await this._page.goto('http://the-internet.herokuapp.com/login');
    }

    async login(username: string, password: string) {
        await this._usernameInput.fill(username);
        await this._passwordInput.fill(password);
        await this._loginButton.click();
    }

    async getSuccessMessage(): Promise<Locator> {
        return this._page.locator('.flash.success');
    }

    async getErrorMessage(): Promise<Locator> {
        return this._page.locator('.flash.error');
    }
}
