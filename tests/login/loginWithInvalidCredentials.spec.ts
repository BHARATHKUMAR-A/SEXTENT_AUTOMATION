import { test, expect } from '@playwright/test';
import { LoginSteps } from '../../steps/loginSteps';
import { HomepageSteps } from '../../steps/homepageSteps';
import credentials from '../../test-data/credentials.json';
import { StepHelper } from '../../utils/StepHelper';

test('Invalid Login Test', async ({ page }, testInfo) => {
    const helper = new StepHelper(page, testInfo);
    const stepLogin = new LoginSteps(page, testInfo, helper);

    await stepLogin.navigate();

    await stepLogin.login(credentials.invalidUser.username, credentials.invalidUser.password);

    // Verify that an error message is displayed
    await stepLogin.verifyErrorMessage();
});
