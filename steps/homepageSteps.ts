import { HomePage } from '../pages/homePage';
import testData_WPC_FF from '../test-data/testData_WPC_FF.json';

interface StepHelper {
    clickElement(selector: any, description: string): Promise<void>;
    enterText(selector: any, text: string, description: string): Promise<void>;
}

class HomepageSteps {
    private page: any;
    private testInfo: any;
    private helper: StepHelper;
    private homePage: HomePage;

    constructor(page: any, testInfo: any, stepHelper: StepHelper) {
        this.page = page;
        this.testInfo = testInfo;
        this.helper = stepHelper;
        this.homePage = new HomePage(page);
    }

    async changeLanguauge(): Promise<void> {
        await this.homePage.languageBtn.click();
        await this.homePage.language.click();
    }

    async navigateTo_create_SCL_family(): Promise<void> {
        await this.homePage.genericDict.click();
        await this.homePage.createFamilyFeature.click();
        await this.homePage.createSCLFamilyFeature.click();
    }

    async create_SCL_feature_family(): Promise<void> {
        // Select nature
        await this.homePage.nature_SCL.click();
        await this.homePage.nature_SCL_option.click();

        // Select language
        await this.homePage.language_SCL.click();
        await this.homePage.language_SCL_option.click();

        // Select Specific range sale
        await this.homePage.spcificSalesRange_SCL.click();

        // Enter manual code
        await this.homePage.manualCode_SCL.fill("ABC");

    }

      async close_opened_genric_dict(){
        await this.helper.clickElement(this.homePage.genericDict, 'genericDict');
        await this.helper.clickElement(this.homePage.createFamilyFeature, 'createFamilyFeature');
   
    }

     async close_opened_feature_value(){
        await this.helper.clickElement(this.homePage.genericDict, 'genericDict');
        await this.helper.clickElement(this.homePage.createFeatureValue, 'createFeatureValue');
   
    }
}

export { HomepageSteps };