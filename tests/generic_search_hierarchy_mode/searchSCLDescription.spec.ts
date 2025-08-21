import { LoginSteps } from '../../steps/loginSteps';
import credentials from '../../test-data/credentials.json';
import { StepHelper } from '../../utils/StepHelper';
import { test,expect } from '@playwright/test';
import { GenericSearchHierarchySCLStep } from '../../steps/genericSearchHierarchySCLStep';


test('generic Hierarchy search of SCL',async ({ page }, testInfo) =>{
    const helper = new StepHelper(page,testInfo);
    const stepLogin = new LoginSteps(page, testInfo, helper);
    const genericSCLStep = new GenericSearchHierarchySCLStep(page,testInfo,helper);

    await stepLogin.navigate();
    await stepLogin.login(credentials.validUser.username, credentials.validUser.password);
    await expect(page).toHaveTitle("GCM");

    await genericSCLStep.generic_search_hierarchy_SCL();
});