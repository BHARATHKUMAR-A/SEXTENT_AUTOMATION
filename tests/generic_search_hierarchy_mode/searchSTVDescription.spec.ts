import { LoginSteps } from '../../steps/loginSteps';
import credentials from '../../test-data/credentials.json';
import { StepHelper } from '../../utils/StepHelper';
import { test,expect } from '@playwright/test';
import { GenericSearchHierarchySTVStep } from '../../steps/genericSearchHierarchySTVStep';


test('generic Hierarchy search of STV',async ({ page }, testInfo) =>{
    const helper = new StepHelper(page,testInfo);
    const stepLogin = new LoginSteps(page, testInfo, helper);
    const genericSTVStep = new GenericSearchHierarchySTVStep(page,testInfo,helper);

    await stepLogin.navigate();
    await stepLogin.login(credentials.validUser.username, credentials.validUser.password);
    await expect(page).toHaveTitle("GCM");

    await genericSTVStep.generic_search_hierarchy_STV();
});