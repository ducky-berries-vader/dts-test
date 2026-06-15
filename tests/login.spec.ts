import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';

import * as testCredentials from '../test-data/test-credentials.json';

const username = testCredentials.username;
const password = testCredentials.password;

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);

    await loginPage.goto();
});

test('login with valid credentials', async () => {
    await loginPage.login(username, password);

    const message = await loginPage.getSuccessMessage();
    await expect(message).toBeVisible();
    await expect(message).toHaveText(/You logged into a secure area!/);
});

test('login with invalid credentials', async () => {
    await loginPage.login(username, 'incorrectpassword');

    const message = await loginPage.getErrorMessage();
    await expect(message).toBeVisible();
    await expect(message).toHaveText(/Your password is invalid!/);
});

// Questionable functionality that tells the user whether a user exists.
test('invalid username', async () => {
    await loginPage.login('doesnotexist', password);

    const message = await loginPage.getErrorMessage();
    await expect(message).toBeVisible();
    await expect(message).toHaveText(/Your username is invalid!/);
});

// Again, questionable functionality. Empty credentials trigger the "Your username is invalid!" message.
// An empty form shouldn't be sent to the server, and the user should be prompted to fill in the form before submission.
test('login with empty credentials', async () => {
    await loginPage.login('', '');

    const message = await loginPage.getErrorMessage();
    await expect(message).toBeVisible();
    await expect(message).toHaveText(/Your username is invalid!/);
});
