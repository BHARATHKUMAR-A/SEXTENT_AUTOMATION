import { test, expect } from '@playwright/test';
import { LoginSteps } from '../../steps/loginSteps';
import { SearchWPCSteps } from '../../steps/searchWPCSteps';
import credentials from '../../test-data/credentials.json';
import { StepHelper } from '../../utils/StepHelper';

test('Search WPC features', async ({ page }, testInfo) => {
    const helper = new StepHelper(page, testInfo);
    const stepWPCSearch = new SearchWPCSteps(page, testInfo, helper);
    const stepLogin = new LoginSteps(page, testInfo, helper);

    await stepLogin.navigate();
    await stepLogin.login(credentials.validUser.username, credentials.validUser.password);
    await expect(page).toHaveTitle("GCM");
    await stepWPCSearch.navigateTo_search_WPC_feature();
    await stepWPCSearch.searchByFamilyCode();
});