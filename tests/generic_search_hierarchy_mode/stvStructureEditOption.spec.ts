import { LoginSteps } from '../../steps/loginSteps';
import credentials from '../../test-data/credentials.json';
import { StepHelper } from '../../utils/StepHelper';
import { test,expect } from '@playwright/test';
import { EditFeatureSTVSteps } from '../../steps/editHierarchySTVSteps';

test('hierarchy search by STV structure edit option',async ({ page }, testInfo) =>{
    const helper = new StepHelper(page, testInfo);
    const stepLogin = new LoginSteps(page, testInfo, helper);
    const editFeatureSTVSteps = new EditFeatureSTVSteps(page,testInfo, helper);
   
    await stepLogin.navigate();
    await stepLogin.login(credentials.validUser.username, credentials.validUser.password);
    await expect(page).toHaveTitle("GCM");

    await editFeatureSTVSteps.searchHierarchySTVStructureEdit();

});
