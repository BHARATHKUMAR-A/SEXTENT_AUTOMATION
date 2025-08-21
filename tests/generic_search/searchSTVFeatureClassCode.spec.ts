import { test, expect } from '@playwright/test';
import { LoginSteps } from '../../steps/loginSteps';
import credentials from '../../test-data/credentials.json';
import { StepHelper } from '../../utils/StepHelper';
import { SearchSTVSteps} from '../../steps/searchSTVSteps';


test('Create STV search value', async ({ page }, testInfo) => {
    const helper = new StepHelper(page, testInfo);
    const stepLogin = new LoginSteps(page, testInfo, helper);
    const stepSTVFeatureSearch = new SearchSTVSteps(page, testInfo, helper);
    
    await stepLogin.navigate();
    await stepLogin.login(credentials.validUser.username, credentials.validUser.password);
    await expect(page).toHaveTitle("GCM");
    await stepSTVFeatureSearch.navigateTo_search_STV_code_specific_creteria_class_code(); 
   
});