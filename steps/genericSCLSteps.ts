import { Page  } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import  testData_generic_SCL from "../test-data/testData_generic_SCL.json";
import { GenericSCLPage } from "../pages/genericSCLPage";


interface TestInfo {
    [key: string]: any;
}

interface StepHelper {
    clickElement: (locator: any, name: string) => Promise<void>;
    enterText: (locator: any, value: string, name: string) => Promise<void>;
    assertElementVisible: (locator: any, name: string) => Promise<void>
    clearText:(locator:any,text:string) => Promise<void>;
}
export class GenericSCLSteps{
    private page: Page;
    private testInfo: TestInfo;
    private helper: StepHelper;
    private homePage: HomePage;
    private genericSCLPage: GenericSCLPage;

    constructor(page: Page, testInfo: TestInfo, stepHelper: StepHelper){
        this.page = page;
        this.testInfo = testInfo;
        this.homePage = new HomePage(page);
        this.helper = stepHelper;
        this.genericSCLPage = new GenericSCLPage(page);
    }
    async generic_scl_code_by_search(){
        //genericdict 
        await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
        await this.helper.clickElement(this.homePage.genericDict, 'genericDict');

        //search option
        await this.helper.assertElementVisible(this.genericSCLPage.search, 'search_option');
        await this.helper.clickElement(this.genericSCLPage.search,'search_option_clicked');

        //structure option
        await this.helper.assertElementVisible(this.genericSCLPage.structure,'structure');
        await this.helper.clickElement(this.genericSCLPage.structure,'structure_option');
        await this.helper.clickElement(this.genericSCLPage.structureValue,'structure_value');

        //search by code option
        await this.helper.assertElementVisible(this.genericSCLPage.searchByCode,'search_by_code');
        //const classCode = 'Y2B';
        await this.helper.clickElement(this.genericSCLPage.searchByCode,'search_code');
        await this.helper.enterText(this.genericSCLPage.searchByCode,testData_generic_SCL.genericSearchData.classCode,'search_by_code_enter');

        //search icon visible
        await this.helper.assertElementVisible(this.genericSCLPage.searchIcon, 'search_icon');
        await this.helper.clickElement(this.genericSCLPage.searchIcon,'search_icon');
        await this.page.waitForTimeout(3000);


        //data validation
        if(await this.genericSCLPage.rowLine.isVisible()){
            console.log("Data is validated");
        }else{
            console.log("Data is not available");
        }
        

        // //toggle visible
        // await this.helper.assertElementVisible(this.genericSCLPage.toggleButton,'toggle button');
        // await this.helper.assertElementVisible(this.genericSCLPage.featureValueButton,'feature_value_button');
        // const val1 = await this.genericSCLPage.featureValueButton.textContent();
        // console.log(val1);

        // //toggle check
        // await this.helper.clickElement(this.genericSCLPage.toggleButton,'click_toggle_button');
        // await this.helper.clickElement(this.genericSCLPage.searchIcon,'search_icon');
        // await this.page.waitForTimeout(3000);

        // if(await this.genericSCLPage.featureValueButton.isVisible()){
        //     console.log("feature value is visible");
        // }else{
        //     console.log("feature value is hidden");
        // }

        




    }
    async generic_scl_toggle_button(){
        //generic 
        await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
        await this.helper.clickElement(this.homePage.genericDict, 'genericDict');

        //search option
        await this.helper.assertElementVisible(this.genericSCLPage.search, 'search_option');
        await this.helper.clickElement(this.genericSCLPage.search,'search_option_clicked');

        //toggle button check
        await this.helper.assertElementVisible(this.genericSCLPage.toggleButton,'toggle button');
        await this.helper.clickElement(this.genericSCLPage.toggleButton,'click_toggle_button');

        //structure option
        await this.helper.assertElementVisible(this.genericSCLPage.structure,'structure');
        await this.helper.clickElement(this.genericSCLPage.structure,'structure_option');
        await this.helper.clickElement(this.genericSCLPage.structureValue,'structure_value');

        //search by code option
        await this.helper.assertElementVisible(this.genericSCLPage.searchByCode,'search_by_code');
        await this.helper.clickElement(this.genericSCLPage.searchByCode,'search_code');
        await this.helper.enterText(this.genericSCLPage.searchByCode,testData_generic_SCL.genericSearchData.classCode,'search_by_code_enter');

        //search icon visible
        await this.helper.assertElementVisible(this.genericSCLPage.searchIcon, 'search_icon');
        await this.helper.clickElement(this.genericSCLPage.searchIcon,'search_icon');
        await this.page.waitForTimeout(3000);


        //verifying the feature button is available or not
        if(await this.genericSCLPage.featureValueButton.isVisible()){
            console.log("feature value is visible");
        }else{
            console.log("feature value is hidden");
        }

        
    }
}