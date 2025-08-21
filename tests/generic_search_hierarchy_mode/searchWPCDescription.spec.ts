import { LoginSteps } from '../../steps/loginSteps';
import credentials from '../../test-data/credentials.json';
import { StepHelper } from '../../utils/StepHelper';
import { test,expect } from '@playwright/test';
import { GenericSearchHierarchyWPCStep } from '../../steps/genericSearchHierarchyWPCStep';


test('generic Hierarchy search of WPC',async ({ page }, testInfo) =>{
    const helper = new StepHelper(page,testInfo);
    const stepLogin = new LoginSteps(page, testInfo, helper);
    const genericWPCStep = new GenericSearchHierarchyWPCStep(page,testInfo,helper);

    await stepLogin.navigate();
    await stepLogin.login(credentials.validUser.username, credentials.validUser.password);
    await expect(page).toHaveTitle("GCM");

    await genericWPCStep.generic_search_hierarchy_wpc();
});