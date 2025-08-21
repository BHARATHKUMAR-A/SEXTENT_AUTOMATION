import { test, expect } from '@playwright/test';
import { LoginSteps } from '../../steps/loginSteps';
import { SearchMappingSteps } from '../../steps/searchMappingSteps';
import credentials from '../../test-data/credentials.json';
import { StepHelper } from '../../utils/StepHelper';
import { allure } from 'allure-playwright';


test('Search mapping SCL feature ', async ({ page }, testInfo) => {
    const helper = new StepHelper(page, testInfo);
    const stepLogin = new LoginSteps(page, testInfo, helper);
    const searchMapping = new SearchMappingSteps(page, testInfo, helper);

    await stepLogin.navigate();
    await stepLogin.login(credentials.validUser.username, credentials.validUser.password);
    await expect(page).toHaveTitle("GCM");
    await searchMapping.navigateTo_search_Mapping_SCL_ToggleOff_STV_Mapping();
    
});