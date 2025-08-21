import { test, expect } from '@playwright/test';
import { LoginSteps } from '../../steps/loginSteps';
import { SearchByCodeStepsToggleOn } from '../../steps/searchByCodeSteps_Mapping_FF_FV';
import credentials from '../../test-data/credentials.json';
import { StepHelper } from '../../utils/StepHelper';
 
test('Search Mapping SCL by Code to check Mappig date', async ({ page }, testInfo) => {
    const helper = new StepHelper(page, testInfo);
    const stepLogin = new LoginSteps(page, testInfo, helper);
    const searchByCodeSteps_Mapping_FF = new SearchByCodeStepsToggleOn(page, testInfo, helper);
 
    await stepLogin.navigate();
    await stepLogin.login(credentials.validUser.username, credentials.validUser.password);
    await expect(page).toHaveTitle("GCM");
    await searchByCodeSteps_Mapping_FF.creation_date_in_table();
   
});