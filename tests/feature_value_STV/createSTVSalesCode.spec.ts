import { test, expect } from '@playwright/test';
import { LoginSteps } from '../../steps/loginSteps';
import { FeatureSTVSteps } from '../../steps/featureSTVSteps';
import credentials from '../../test-data/credentials.json';
import { StepHelper } from '../../utils/StepHelper';

test('Create STV feature value', async ({ page }, testInfo) => {
    const helper = new StepHelper(page, testInfo);
    const stepLogin = new LoginSteps(page, testInfo, helper);
    const stepSTVFeature = new FeatureSTVSteps(page, testInfo, helper);

    await stepLogin.navigate();
    await stepLogin.login(credentials.validUser.username, credentials.validUser.password);
    await expect(page).toHaveTitle("GCM");
    await stepSTVFeature.navigateTo_create_STV_class_code();
    await stepSTVFeature.navigateTo_create_STV_sales_code(); 

});
