import { Page, Locator } from '@playwright/test';

class LoginPage {
    page: Page;
    usernameField: Locator;
    passwordField: Locator;
    signInBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameField = page.locator("#username");
        this.passwordField = page.locator("#password");
        this.signInBtn = page.locator("#signOnButton");
    }
}

export { LoginPage };