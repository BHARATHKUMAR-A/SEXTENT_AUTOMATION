import { LoginSteps } from '../../steps/loginSteps';
import credentials from '../../test-data/credentials.json';
import { StepHelper } from '../../utils/StepHelper';
import { test,expect } from '@playwright/test';
import {GenericSearchMappingSTVStep} from "../../steps/genericSearchMappingSTVSteps";
 
 
 
test('generic Mapping search of STV',async ({ page, }, testInfo) =>{
 
    const helper = new StepHelper(page, testInfo);
    const stepLogin = new LoginSteps(page, testInfo, helper);
    const StepGenericMappingSTV = new GenericSearchMappingSTVStep(page, testInfo, helper);

    await stepLogin.navigate();
    await stepLogin.login(credentials.validUser.username, credentials.validUser.password);
    await expect(page).toHaveTitle("GCM");
 
    await StepGenericMappingSTV.stv_mapping_search_by_code();
 
});