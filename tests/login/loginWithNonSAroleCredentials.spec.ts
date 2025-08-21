import { test, expect } from '@playwright/test';
import { LoginSteps } from '../../steps/loginSteps';
import { HomepageSteps } from '../../steps/homepageSteps';
import credentials from '../../test-data/credentials.json';
import { StepHelper } from '../../utils/StepHelper';

test('Login Test', async ({ page },testInfo) => {
    const helper = new StepHelper(page, testInfo);
    const stepLogin = new LoginSteps(page, testInfo, helper);
    const stepHomepage = new HomepageSteps(page, testInfo, helper);

    await stepLogin.navigate();

    await stepLogin.login(credentials.nonSAroleUser.username, credentials.nonSAroleUser.password);
    
    if (credentials.nonSAroleUser.role == "Non-SA")
        console.log("Valid User with Non SA Role logged in and User with Non SA role unable to see application functionalities.");

    else
        console.log("User with Non SA role unable to see application functionalities.")
 
    await expect(page).toHaveTitle("GCM"); 
});
