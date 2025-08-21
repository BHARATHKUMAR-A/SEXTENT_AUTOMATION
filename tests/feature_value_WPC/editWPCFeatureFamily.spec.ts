import { test, expect } from '@playwright/test';
import { LoginSteps } from '../../steps/loginSteps';
import { EditWPCSteps } from '../../steps/editWPCSteps';
import credentials from '../../test-data/credentials.json';
import { StepHelper } from '../../utils/StepHelper';

test('edit WPS feature value', async ({ page }, testInfo) => {
    const helper = new StepHelper(page, testInfo);
    const stepLogin = new LoginSteps(page, testInfo, helper);
    const editWPSFeature = new EditWPCSteps(page, testInfo, helper);

    await stepLogin.navigate();
    await stepLogin.login(credentials.validUser.username, credentials.validUser.password);
    await expect(page).toHaveTitle("GCM");
    await editWPSFeature.navigateTo_edit_WPC_family_code();
});