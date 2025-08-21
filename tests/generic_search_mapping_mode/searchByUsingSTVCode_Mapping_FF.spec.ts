import { test, expect } from '@playwright/test';
import { LoginSteps } from '../../steps/loginSteps';
import { FeatureSTVSteps } from '../../steps/featureSTVSteps';
import { FeatureSCLSteps } from '../../steps/featureSCLSteps';
import credentials from '../../test-data/credentials.json';
import { StepHelper } from '../../utils/StepHelper';
import { GenericSearch_MappingSteps } from '../../steps/genericSearch_MappingSteps';
import { HomepageSteps } from '../../steps/homepageSteps';
 
test('Create STV search value', async ({ page }, testInfo) => {
    const helper = new StepHelper(page, testInfo);
    const stepLogin = new LoginSteps(page, testInfo, helper);
    const stepSTVFeatureSearch = new GenericSearch_MappingSteps(page, testInfo, helper);
    const stepHomepage = new HomepageSteps(page, testInfo, helper);
 
 
    await stepLogin.navigate();
    await stepLogin.login(credentials.validUser.username, credentials.validUser.password);
    await expect(page).toHaveTitle("GCM");
    await stepSTVFeatureSearch.navigateTo_search_STV_code_mapping_ff();
   
});
 