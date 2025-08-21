import { test, expect } from '@playwright/test';
import { LoginSteps } from '../../steps/loginSteps';
import credentials from '../../test-data/credentials.json';
import { StepHelper } from '../../utils/StepHelper';
import { GenericSearch_HierarchySteps } from '../../steps/genericSearch_HierarchySteps';
import { HomepageSteps } from '../../steps/homepageSteps';
 
test('Create STV search value', async ({ page }, testInfo) => {
    const helper = new StepHelper(page, testInfo);
    const stepLogin = new LoginSteps(page, testInfo, helper);
    const stepSTVFeatureSearch = new GenericSearch_HierarchySteps(page, testInfo, helper);
    const stepHomepage = new HomepageSteps(page, testInfo, helper);
 
 
    await stepLogin.navigate();
    await stepLogin.login(credentials.validUser.username, credentials.validUser.password);
    await expect(page).toHaveTitle("GCM");
    await stepSTVFeatureSearch.navigateTo_search_STV_hierarchy_ff();
   
});