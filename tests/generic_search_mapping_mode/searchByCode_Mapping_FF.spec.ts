import { test, expect } from '@playwright/test';
import { LoginSteps } from '../../steps/loginSteps';
import { SearchByCodeSteps } from '../../steps/searchByCodeSteps_Mapping_FF';
import credentials from '../../test-data/credentials.json';
import { StepHelper } from '../../utils/StepHelper';
 
test('Search Mapping SCL by Code', async ({ page }, testInfo) => {
    const helper = new StepHelper(page, testInfo);
    const stepLogin = new LoginSteps(page, testInfo, helper);
    const searchByCodeSteps_Mapping_FF = new SearchByCodeSteps(page, testInfo, helper);
 
    await stepLogin.navigate();
    await stepLogin.login(credentials.validUser.username, credentials.validUser.password);
    await expect(page).toHaveTitle("GCM");
    await searchByCodeSteps_Mapping_FF.search_by_code_initial_steps();
   
});