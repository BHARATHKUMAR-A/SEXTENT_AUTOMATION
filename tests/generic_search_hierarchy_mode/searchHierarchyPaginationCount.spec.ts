import { test, expect } from '@playwright/test';
import { LoginSteps } from '../../steps/loginSteps';
import {GenericSearchHierarchySteps } from '../../steps/genericSearchHierarchySteps';
import credentials from '../../test-data/credentials.json';
import { StepHelper } from '../../utils/StepHelper';
 
test('Toggle On with Normal search and verify the pagination count', async ({ page }, testInfo) => {
    const helper = new StepHelper(page, testInfo);
    const stepLogin = new LoginSteps(page, testInfo, helper);
    const genericHierachy = new GenericSearchHierarchySteps(page, testInfo, helper);
   
 
    await stepLogin.navigate();
    await stepLogin.login(credentials.validUser.username, credentials.validUser.password);
    await expect(page).toHaveTitle("GCM");
    await genericHierachy.generic_search_hierarchy_pagination();
   
});