import { LoginSteps } from '../../steps/loginSteps';
import credentials from '../../test-data/credentials.json';
import { StepHelper } from '../../utils/StepHelper';
import { test,expect } from '@playwright/test';
import { GenericWPC_FF_FVSearch } from '../../steps/genericWPC_FF_FVSearch';
 
 
test('generic search by WPC for Mapping',async ({ page }, testInfo) =>{
    const helper = new StepHelper(page, testInfo);
    const stepLogin = new LoginSteps(page, testInfo, helper);
    const StepGenericWPC = new GenericWPC_FF_FVSearch(page, testInfo, helper);
  
 
    await stepLogin.navigate();
    await stepLogin.login(credentials.validUser.username, credentials.validUser.password);
    await expect(page).toHaveTitle("GCM");
 
    await StepGenericWPC.generic_wpc_search_by_FamCode_Mapping();
   
 
});