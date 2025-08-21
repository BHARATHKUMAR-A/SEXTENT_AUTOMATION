import { test, expect } from '@playwright/test';
import { LoginSteps } from '../../steps/loginSteps';
//import { SCLSearchSteps } from '../../steps/sclSearchSteps';
import credentials from '../../test-data/credentials.json';
import { StepHelper } from '../../utils/StepHelper';
import { SCLSearchSteps } from '../../steps/sclSearchSteps';

test('SCL Search Mandatory Structure', async ({ page }, testInfo) => {
    const helper = new StepHelper(page, testInfo);
    const stepLogin = new LoginSteps(page, testInfo, helper);
    const sclSearch = new SCLSearchSteps(page, testInfo, helper);

    await stepLogin.navigate();
    await stepLogin.login(credentials.validUser.username, credentials.validUser.password);
    await expect(page).toHaveTitle("GCM");
    await sclSearch.scl_search_initial_steps();
    await sclSearch.mandatory_structure();

});