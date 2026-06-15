import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';

import * as testCredentials from '../test-data/test-credentials.json';

const username = testCredentials.username;
const password = testCredentials.password;

let loginPage: LoginPage;

test.describe('login', () => {
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);

        await loginPage.goto();
    });

    test('valid credentials', async () => {
        await loginPage.login(username, password);

        const message = loginPage.getSuccessMessage();
        await expect(message).toHaveText(/You logged into a secure area!/);
    });

    test('invalid credentials', async () => {
        await loginPage.login(username, 'incorrectpassword');

        const message = loginPage.getErrorMessage();
        await expect(message).toHaveText(/Your password is invalid!/);
    });

    // Questionable functionality that tells the user whether a user exists.
    test('invalid username', async () => {
        await loginPage.login('doesnotexist', password);

        const message = loginPage.getErrorMessage();
        await expect(message).toHaveText(/Your username is invalid!/);
    });

    // Again, questionable functionality. Empty credentials trigger the "Your username is invalid!" message.
    // An empty form shouldn't be sent to the server, and the user should be prompted to fill in the form before submission.
    test('empty credentials', async () => {
        await loginPage.login('', '');

        const message = loginPage.getErrorMessage();
        await expect(message).toHaveText(/Your username is invalid!/);
    });
});
