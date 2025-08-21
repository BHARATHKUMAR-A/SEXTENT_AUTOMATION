import { test, expect } from '@playwright/test';
import { LoginSteps } from '../../steps/loginSteps';
import { FeatureWPCSteps } from '../../steps/featureWPCSteps';
import credentials from '../../test-data/credentials.json';
import { StepHelper } from '../../utils/StepHelper';

import testData_WPC_FF from '../../test-data/testData_WPC_FF.json';

let val = ""
test('Create WPS feature value', async ({ page }, testInfo) => {
    const helper = new StepHelper(page, testInfo);
    const stepLogin = new LoginSteps(page, testInfo, helper);
    const stepWPSFeature = new FeatureWPCSteps(page, testInfo, helper);

    await stepLogin.navigate();
    await stepLogin.login(credentials.validUser.username, credentials.validUser.password);
    await expect(page).toHaveTitle("GCM");
    await stepWPSFeature.navigateTo_create_WPC_family_code(testData_WPC_FF.testData.category_WPS_options);

});