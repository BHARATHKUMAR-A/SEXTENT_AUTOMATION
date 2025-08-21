import { LoginSteps } from '../../steps/loginSteps';
import credentials from '../../test-data/credentials.json';
import { StepHelper } from '../../utils/StepHelper';
import { test,expect } from '@playwright/test';
import { GenericWPC } from '../../steps/genericWPC';


test('generic search by SCL for MANDATORY BYPASS',async ({ page }, testInfo) =>{
    const helper = new StepHelper(page, testInfo);
    const stepLogin = new LoginSteps(page, testInfo, helper);
    const StepGenericWPC = new GenericWPC(page, testInfo, helper);
    


    await stepLogin.navigate();
    await stepLogin.login(credentials.validUser.username, credentials.validUser.password);
    await expect(page).toHaveTitle("GCM");

    await StepGenericWPC.generic_scl_search_by_bypass();
    

});