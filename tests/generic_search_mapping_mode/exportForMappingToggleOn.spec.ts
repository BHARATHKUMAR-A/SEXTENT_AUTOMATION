import { test, expect } from '@playwright/test';
import { LoginSteps } from '../../steps/loginSteps';
import {ExportForMappingSteps } from '../../steps/exportForMappingSteps';
import credentials from '../../test-data/credentials.json';
import { StepHelper } from '../../utils/StepHelper';
 
test('Search and Export Mapping Excel Data when Toggle On', async ({ page }, testInfo) => {
    const helper = new StepHelper(page, testInfo);
    const stepLogin = new LoginSteps(page, testInfo, helper);
    const exportForMapping = new ExportForMappingSteps(page, testInfo, helper);
   
 
    await stepLogin.navigate();
    await stepLogin.login(credentials.validUser.username, credentials.validUser.password);
    await expect(page).toHaveTitle("GCM");
    await exportForMapping.navigate_to_search_toggle_on();
    await exportForMapping.export_For_Mapping_common_method();
});
 
 
 