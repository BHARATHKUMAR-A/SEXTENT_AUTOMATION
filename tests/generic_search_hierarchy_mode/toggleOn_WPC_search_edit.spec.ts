import { test, expect } from '@playwright/test';
import { LoginSteps } from '../../steps/loginSteps';
import credentials from '../../test-data/credentials.json';
import { StepHelper } from '../../utils/StepHelper';
import { EditSearchWPCPage } from '../../pages/editSearchWPCPage';
import { EditSearchWPCSteps } from '../../steps/editSearchWPCSteps';
 
test('edit WPS feature value', async ({ page }, testInfo) => {
    const helper = new StepHelper(page, testInfo);
    const stepLogin = new LoginSteps(page, testInfo, helper);
    const editSearchWPC = new EditSearchWPCSteps(page, testInfo, helper);
 
    await stepLogin.navigate();
    await stepLogin.login(credentials.validUser.username, credentials.validUser.password);
    await expect(page).toHaveTitle("GCM");
    await editSearchWPC.toggleOn_search_edit_wpc();
   
   
});