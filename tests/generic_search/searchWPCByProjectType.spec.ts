import { LoginSteps } from '../../steps/loginSteps';
import credentials from '../../test-data/credentials.json';
import { StepHelper } from '../../utils/StepHelper';
import { test,expect } from '@playwright/test';
import { GenericWPCStep } from '../../steps/genericWPCStep';

test('generic search by WPC for Project Type',async ({ page }, testInfo) =>{
    const helper = new StepHelper(page, testInfo);
    const stepLogin = new LoginSteps(page, testInfo, helper);
    const StepGenericWPC = new GenericWPCStep(page,testInfo,helper);


    await stepLogin.navigate();
    await stepLogin.login(credentials.validUser.username, credentials.validUser.password);
    await expect(page).toHaveTitle("GCM");


    await StepGenericWPC.generic_wpc_search_by_ProjectType();
});
