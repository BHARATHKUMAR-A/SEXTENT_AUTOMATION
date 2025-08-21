import { test, expect } from '@playwright/test';
import { LoginSteps } from '../../steps/loginSteps';
import { ExportdataSteps } from '../../steps/exportdataSteps';
import credentials from '../../test-data/credentials.json';
import { StepHelper } from '../../utils/StepHelper';
 
test('Search and Export Excel Data when Toggle On', async ({ page }, testInfo) => {
    const helper = new StepHelper(page, testInfo);
    const stepLogin = new LoginSteps(page, testInfo, helper);
    const stepSCLexport = new ExportdataSteps(page, testInfo, helper);
   
 
    await stepLogin.navigate();
    await stepLogin.login(credentials.validUser.username, credentials.validUser.password);
    await expect(page).toHaveTitle("GCM");

    
    await stepSCLexport.navigate_to_search_toggle_on();
    await stepSCLexport.export_common_method();

   






});
 