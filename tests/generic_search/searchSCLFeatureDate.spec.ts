import { test, expect } from '@playwright/test';
import { LoginSteps } from '../../steps/loginSteps';
import { SearchSCLSteps } from '../../steps/searchSCLSteps';
import credentials from '../../test-data/credentials.json';
import { StepHelper } from '../../utils/StepHelper';
 
test('Search SCL ', async ({ page }, testInfo) => {
    const helper = new StepHelper(page, testInfo);
    const stepLogin = new LoginSteps(page, testInfo, helper);
    const stepSCLsearchFeature = new SearchSCLSteps(page, testInfo, helper);
 
 
    await stepLogin.navigate();
    await stepLogin.login(credentials.validUser.username, credentials.validUser.password);
    await expect(page).toHaveTitle("GCM");
    await stepSCLsearchFeature.navigateTo_generic_search();
    await stepSCLsearchFeature.search_by_date();
 
});
 
 