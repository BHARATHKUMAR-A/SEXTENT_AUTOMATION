import { LoginSteps } from '../../steps/loginSteps';
import credentials from '../../test-data/credentials.json';
import { StepHelper } from '../../utils/StepHelper';
import { test,expect } from '@playwright/test';
import { GenericSearchMappingStep } from '../../steps/genericSearchMappingStep';
 
 
test('generic Mapping search of SCL',async ({ page }, testInfo) =>{
    const helper = new StepHelper(page,testInfo);
    const stepLogin = new LoginSteps(page, testInfo, helper);
    const StepGenericMappingSCL = new GenericSearchMappingStep(page, testInfo, helper);
   
 
 
    await stepLogin.navigate();
    await stepLogin.login(credentials.validUser.username, credentials.validUser.password);
    await expect(page).toHaveTitle("GCM");
 
    await StepGenericMappingSCL.search_SCL_Code_using_Mapping();
   
 
});