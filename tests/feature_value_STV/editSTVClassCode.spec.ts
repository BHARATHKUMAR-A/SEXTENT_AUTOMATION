import { test, expect } from '@playwright/test';
import { LoginSteps } from '../../steps/loginSteps';
import { EditFeatureSTVSteps } from '../../steps/editFeatureSTVSteps';
import credentials from '../../test-data/credentials.json';
import { StepHelper } from '../../utils/StepHelper';

test('Create STV class  code', async ({ page }, testInfo) => {
    const helper = new StepHelper(page, testInfo);
    const stepLogin = new LoginSteps(page, testInfo, helper);
    const stepSTVFeature = new EditFeatureSTVSteps(page, testInfo, helper);
    

    await stepLogin.navigate();
    await stepLogin.login(credentials.validUser.username, credentials.validUser.password);
    await expect(page).toHaveTitle("GCM");
    await stepSTVFeature.navigateTo_create_edit_history_STV_class_code();
   
    
});
