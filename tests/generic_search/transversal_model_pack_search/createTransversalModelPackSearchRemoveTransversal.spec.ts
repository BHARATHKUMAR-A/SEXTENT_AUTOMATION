import { test, expect } from '@playwright/test';
import { LoginSteps } from '../../../steps/loginSteps';
import { FeatureSCLSteps } from '../../../steps/featureSCLSteps';
import credentials from '../../../test-data/credentials.json';
import { StepHelper } from '../../../utils/StepHelper';
import { FeatureSTVSteps } from '../../../steps/featureSTVSteps';
import { FeatureWPCSteps } from '../../../steps/featureWPCSteps';
import { HomepageSteps } from '../../../steps/homepageSteps';
import { FeatureTransversalSearchSteps } from '../../../steps/featureTransversalSearchSteps';
import testData_WPC_FF from '../../../test-data/testData_WPC_FF.json';

var classCode = "";
var familyCode = "";
var scl_familyCode = "";

test('Create Transversal Model Pack Search', async ({ page }, testInfo) => {
    const helper = new StepHelper(page, testInfo);
    const stepLogin = new LoginSteps(page, testInfo, helper);
    const stepSCLFeature = new FeatureSCLSteps(page, testInfo, helper);
    const stepSTVFeature = new FeatureSTVSteps(page, testInfo, helper);
    const stepWPSFeature = new FeatureWPCSteps(page, testInfo, helper);
    const stepHomepage = new HomepageSteps(page, testInfo, helper);
    const stepTransversalSearch = new FeatureTransversalSearchSteps(page, testInfo, helper);


    await stepLogin.navigate();
    await stepLogin.login(credentials.validUser.username, credentials.validUser.password);
    await expect(page).toHaveTitle("GCM");

    //SCL family code
    // classCode = await stepSTVFeature.navigateTo_create_STV_class_code();
    // stepHomepage.close_opened_genric_dict();
    // console.log(classCode, "stv");

    // familyCode = await stepWPSFeature.navigateTo_create_WPC_family_code(testData_WPC_FF.testData.category_WPS_options) as string;
    // console.log(familyCode, "wpc");
    // stepHomepage.close_opened_genric_dict();

    const transversal = await stepTransversalSearch.create_transversal_SCL_feature_family_remove_transversal(classCode, familyCode, 4);
    // const transversal='GV017';
    await stepTransversalSearch.search_transverse_model_pack(transversal);


});
