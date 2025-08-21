import { LoginSteps } from '../../steps/loginSteps';
import credentials from '../../test-data/credentials.json';
import { StepHelper } from '../../utils/StepHelper';
import { test,expect } from '@playwright/test';
import { GenericSCLSteps } from '../../steps/genericSCLSteps';
// import { GenericWPCStep } from '../../steps/genericWPCStep';

test('generic search by SCL',async ({ page }, testInfo) =>{
    const helper = new StepHelper(page, testInfo);
    const stepLogin = new LoginSteps(page, testInfo, helper);
    const StepGenericSCL = new GenericSCLSteps(page, testInfo, helper);
    // const StepGenericWPC = new GenericWPCStep(page,testInfo,helper);


    await stepLogin.navigate();
    await stepLogin.login(credentials.validUser.username, credentials.validUser.password);
    await expect(page).toHaveTitle("GCM");

    await StepGenericSCL.generic_scl_toggle_button();

});
