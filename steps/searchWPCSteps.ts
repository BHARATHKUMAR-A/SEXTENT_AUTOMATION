import { Locator,Page, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { FeatureWPCPage } from '../pages/featureWPCPage';
import { SearchWPCPage } from '../pages/searchWPCPage';
import testData_WPC_FF from '../test-data/testData_WPC_FF.json';
import searchData_SCL_FF from '../test-data/searchData_SCL_FF.json';
import searchData_WPC_FF from '../test-data/searchData_WPC_FF.json';
 
 
interface TestInfo {
    [key: string]: any;
}
 
interface StepHelper {
    assertElementEnabled(isToggleOn: Locator, arg1: string): unknown;
    clickElement: (locator: any, name: string) => Promise<void>;
    clickElementForcefully: (locator: any, name: string) => Promise<void>;
    enterText: (locator: any, value: string, name: string) => Promise<void>;
    assertElementHasText: (locator: any, expectedText: string, message: string) => Promise<void>;
    assertElementVisible: (locator: any, name: string)=> Promise<void>;
    getRandomNumber: (locator: any, name: any) => Promise<number>;
    selectDropdownOption: (locator: any, value: any, name: string) => Promise<void>;
    assertElementTextContainedIn: (locator: any, expectedText: string, message: string) => Promise<void>;
    toggleButtonAction: (locator: Locator,element: string)=> Promise<void>;
}
 
export class SearchWPCSteps {
    private page: Page;
    private testInfo: TestInfo;
    private helper: StepHelper;
    private featureWPSPage: FeatureWPCPage;
    private searchWPCPage: SearchWPCPage;
    private homePage: HomePage;
    //private featureWPSPage: FeatureWPCPage;
    private selectRandomCode: Locator;
    private classCode: string;
 
    constructor(page: Page, testInfo: TestInfo, stepHelper: StepHelper) {
        this.page = page;
        this.testInfo = testInfo;
        this.helper = stepHelper;
        this.homePage = new HomePage(page);
        this.searchWPCPage = new SearchWPCPage(page);
        this.classCode = '';
    }
 
    async navigateTo_search_WPC_feature() {
        //navigate to Generic Dictionary
        await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
        await this.helper.clickElement(this.homePage.genericDict, 'genericDict');
 
 
        await this.helper.assertElementVisible(this.homePage.searchSideBar, 'genericDict');
        await this.helper.clickElement(this.homePage.searchSideBar, 'genericDict');
        await this.page.waitForTimeout(8000);
 
        //check if toggle and single button is enabled
        await this.helper.assertElementEnabled(this.searchWPCPage.isToggleOn, 'isToggleOn');
        await this.helper.assertElementEnabled(this.searchWPCPage.singleValue, 'singleValue');
 
        await this.helper.assertElementVisible(this.searchWPCPage.structure, 'Structure');
        await this.helper.clickElement(this.searchWPCPage.structure, 'Structure');
 
        await this.helper.assertElementVisible(this.searchWPCPage.WPCoption, 'WPC Option');
        await this.helper.clickElement(this.searchWPCPage.WPCoption, 'WPC Option');
 
        await this.helper.assertElementVisible(this.searchWPCPage.arrowDown, 'WPC Option Arrowdown');
        await this.helper.clickElement(this.searchWPCPage.arrowDown, 'WPC Option Arrowdown');
 
        await this.helper.assertElementVisible(this.searchWPCPage.specificCriteriaDropdown, 'Specfic Criteria Dropdown');
        await this.helper.clickElement(this.searchWPCPage.specificCriteriaDropdown, 'Specific Criteria Dropdown');
    }
 
    async searchByFamilyCode() {
        await this.helper.enterText(this.searchWPCPage.familyCodeInput, testData_WPC_FF.testData.familyCode, "familyCodeInput");
        await this.helper.assertElementVisible(this.searchWPCPage.searchButton, 'searchButton');  
        await this.helper.clickElement(this.searchWPCPage.searchButton, 'searchButton');
        await this.page.waitForTimeout(8000)
       
        await this.helper.assertElementVisible(this.searchWPCPage.table, 'table');
        if( await this.searchWPCPage.tableHeaderColumn.isVisible())
       
            {  
               //assert if that location has the same searched value
               await this.helper.assertElementHasText(this.searchWPCPage.firstRow,testData_WPC_FF.testData.familyCode, 'Same value');
               console.log("true")
            }
       
        await this.helper.clickElement(this.searchWPCPage.resetButton, 'resetButton');  
       
 
    }
 
    async searchByFamilyDescription() {
        await this.helper.assertElementVisible(this.searchWPCPage.familyDescriptionInput, 'familyDescriptionInput');
        await this.helper.clickElement(this.searchWPCPage.familyDescriptionInput, 'familyDescriptionInput');
 
        await this.helper.enterText(this.searchWPCPage.familyDescriptionInput, testData_WPC_FF.testData.familyDescription, "familyDescriptionInput");
        await this.helper.assertElementVisible(this.searchWPCPage.searchButton, 'searchButton');  
        await this.helper.clickElement(this.searchWPCPage.searchButton, 'searchButton');
        await this.page.waitForTimeout(8000)
 
        await this.helper.assertElementVisible(this.searchWPCPage.table, 'table');
        if( await this.searchWPCPage.tableHeaderColumn.isVisible())
        {  
          await this.helper.assertElementTextContainedIn(this.searchWPCPage.firstRow1, testData_WPC_FF.testData.familyDescription, 'comparing familydescription')
        }
        await this.helper.clickElement(this.searchWPCPage.resetButton, 'resetButton');  
      }
 
      async searchByBusinessType(){
        await this.helper.assertElementVisible(this.searchWPCPage.businessTypeDropdown, 'businessType');
        await this.helper.clickElement(this.searchWPCPage.businessTypeDropdown, 'businessType');
 
        await this.helper.assertElementVisible(this.searchWPCPage.businessTypeOption, 'businessTypeOption');
        await this.helper.clickElement(this.searchWPCPage.businessTypeOption, 'businessTypeOption');
 
        await this.page.keyboard.press('Tab');
        await this.helper.clickElement(this.searchWPCPage.searchButton, 'searchButton');
        await this.page.waitForTimeout(8000)
 
        if (await this.searchWPCPage.zeroRecord.isVisible())
        {
            console.log("No records Found!")
        }
        else{
            if( await this.searchWPCPage.tableHeaderColumn2.isVisible())
       
            {  
               //assert if that location has the same searched value
               await this.helper.assertElementHasText(this.searchWPCPage.firstRow2,testData_WPC_FF.testData.businessType, 'Same value');
               console.log("true")
            }
        else{
 
        await this.helper.assertElementVisible(this.searchWPCPage.table, 'table');
        //click on toggle button
        await this.helper.assertElementVisible(this.searchWPCPage.openCustomizeColumnBtn, 'openCustomizeColumnBtn');
        await this.helper.clickElement(this.searchWPCPage.openCustomizeColumnBtn, 'openCustomizeColumnBtn');
 
        //find for that clm name and click the toggle button and enable it
        await this.helper.assertElementVisible(this.searchWPCPage.toggleBtnType, 'toggleBtnType');
        await this.helper.clickElement(this.searchWPCPage.toggleBtnType, 'toggleBtnType');
 
        //close the customixe colum button
        await this.helper.assertElementVisible(this.searchWPCPage.closeCustomizeColumnBtn, 'closeCustomizeColumnBtn');
        await this.helper.clickElement(this.searchWPCPage.closeCustomizeColumnBtn, 'closeCustomizeColumnBtn');
        await this.helper.assertElementVisible(this.searchWPCPage.tableHeaderColumn2, 'tableHeaderColumn');
        await this.helper.assertElementHasText(this.searchWPCPage.firstRow2,testData_WPC_FF.testData.businessType, '');
        console.log("Search successful")
    }
    }
    }
 
    async navigateTo_search_WPC_Feature(){
 
 
        await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
        await this.helper.clickElement(this.homePage.genericDict, 'genericDict');
 
        //go to search WPC Feature
        await this.helper.assertElementVisible(this.homePage.search,'search');
        await this.helper.clickElement(this.homePage.search, 'search');
        //Single Button
        await this.helper.assertElementVisible(this.searchWPCPage.SingleButton,'singleButton');
        await this.helper.clickElement(this.searchWPCPage.SingleButton,'single');
        // structure dropdwon
        await this.helper.assertElementVisible(this.searchWPCPage.structureDropdown,'structureDropdown');
        await this.helper.clickElement(this.searchWPCPage.structureDropdown, 'structureDropdown');
        await this.helper.clickElement(this.searchWPCPage.structureDropdownOptions,'structureDropdownOption');
        //search by class code
        await this.helper.assertElementVisible(this.searchWPCPage.searchByCode,'searchByCode');
        await this.helper.enterText(this.searchWPCPage.searchByCode,searchData_WPC_FF.Searching.classcode,'classcode');
        //search by keyword
        await this.helper.assertElementVisible(this.searchWPCPage.searchByKeyword,'searchByKeyword');
        await this.helper.enterText(this.searchWPCPage.searchByKeyword,searchData_WPC_FF.Searching.Keyword,'keyword');
        //search button
        await this.helper.assertElementVisible(this.searchWPCPage.searchBtn,'searchButton');
        await this.helper.clickElement(this.searchWPCPage.searchBtn,'searchButton');
        //data visibility check
        await this.page.waitForTimeout(25000);
        if(await this.searchWPCPage.data.isVisible()){
            console.log(`${searchData_WPC_FF.Searching.structure} data is available`);
        }else{
            console.log(`${searchData_WPC_FF.Searching.structure} data is not available`);
        }
 
        // closer of toggle button
        await this.helper.toggleButtonAction(this.searchWPCPage.toggleButton,'toggleButton');
        await this.helper.clickElement(this.searchWPCPage.searchBtn,'searchButton');
        await this.page.waitForTimeout(25000);
       
        //check for feature value visibility
        if(await this.searchWPCPage.featureValueVisibility.isVisible()){
            console.log("feature value is visible");
        }else{
            console.log("feature value is hidden");
        }
       
 
    }
 
   
}
 