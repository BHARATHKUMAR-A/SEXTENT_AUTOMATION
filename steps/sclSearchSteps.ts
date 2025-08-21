import { Locator, Page, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { SearchSCLPage } from '../pages/searchSCLPage';
import testData_SCL_FF from '../test-data/testData_SCL_FF.json';
import searchData_SCL_FF from '../test-data/searchData_SCL_FF.json';
import { FeatureSCLPage } from '../pages/featureSCLPage';
import { GenericWPCPage } from "../pages/WPC_Mapping_page";
import { SearchMappingPage } from '../pages/searchMappingPage';
import { GenericSCLHierarchyOffPage } from "../pages/genericSCLHierarchyOffPage";
 
interface TestInfo {
    [key: string]: any;
}
 
//common function imported from step helper
interface StepHelper {
    clickElement: (locator: any, name: string) => Promise<void>;
    clickElementForcefully: (locator: any, name: string) => Promise<void>;
    enterText: (locator: any, value: string, name: string) => Promise<void>;
    assertElementHasText: (locator: any, expectedText: string, message: string) => Promise<void>;
    assertElementVisible: (locator: any, name: string) => Promise<void>;
    assertElementEnabled: (locator: any, name: string) => Promise<void>;
    assertElementDisabled: (locator: any, name: string) => Promise<boolean>;
    getRandomNumber: (locator: any, name: any) => Promise<number>;
    generateRandomManualCode: (length: number) => Promise<string>;
    checkLocators: (locator1: any, locator2: any, locator3: any) => Promise<boolean>;
    clearText: (locator: any, text: string) => Promise<void>;
    codeLength: () => Promise<number>;
    assertTextboxValue: (locator: Locator, expectedValue: string, label: string) => Promise<void>;
    assertElementTextContainedIn: (locator: any, expectedText: string, message: string) => Promise<void>;
    checkDateInRange(datelocator: Locator, startDateData: string, endDateData: string): Promise<void>
    toggleButtonAction: (locator: Locator, element: string) => Promise<void>;
}
export class SCLSearchSteps {
    private page: Page;
    private testInfo: TestInfo;
    private helper: StepHelper;
    private homePage: HomePage;
    private searchSCLPage: SearchSCLPage;
    private featureSCLPage: FeatureSCLPage;
    private genericWPCPage: GenericWPCPage;
    private searchMappingPage: SearchMappingPage;
    private genericSCLHierarchyOffPage: GenericSCLHierarchyOffPage;
 
    private selectRandomCode: Locator;
    private classCode: string;
    private code: string;
    private rankingOptionLocator: Locator;
    private rankingOption: string;
    private sclManualCode: string;
    private salesCode: string;
    private value: string;
    // private verifiedData : Locator;
    private verifiedSalesData: Locator;
 
    //constructor to initialize the objects
    constructor(page: Page, testInfo: TestInfo, stepHelper: StepHelper) {
        this.page = page;
        this.testInfo = testInfo;
        this.helper = stepHelper;
        this.homePage = new HomePage(page);
        this.searchSCLPage = new SearchSCLPage(page);
         this.searchMappingPage=new SearchMappingPage(page);
         this.genericSCLHierarchyOffPage = new GenericSCLHierarchyOffPage(page);
    }
 
    //Creating SCL class code flow
    async scl_search_initial_steps() {
 
        //navigate to Generic Dictionary
        await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
        await this.helper.clickElement(this.homePage.genericDict, 'genericDict');
 
        //navigate to search tab
        await this.helper.assertElementVisible(this.homePage.search, 'searchTab');
        await this.helper.clickElement(this.homePage.search, 'searchTab');
 
        //check is toggel and single button is enabled
        await this.helper.assertElementEnabled(this.searchSCLPage.isToggelOn, 'isToggelOn');
        await this.helper.assertElementEnabled(this.searchSCLPage.singleValue, 'singleValue');
 
        //selecetong scl option from dropdown
        await this.helper.assertElementVisible(this.searchSCLPage.searchDropdown, 'searchDropdown');
        await this.helper.clickElement(this.searchSCLPage.searchDropdown, 'searchDropdown');
 
        await this.helper.assertElementVisible(this.searchSCLPage.searchOption, 'searchOption');
        await this.helper.clickElement(this.searchSCLPage.searchOption, 'searchOption');
 
        //clicking arrows to open form structure
        await this.helper.assertElementVisible(this.searchSCLPage.arrowDown, 'arrowDown');
        await this.helper.clickElement(this.searchSCLPage.arrowDown, 'arrowDown');
 
        await this.helper.assertElementVisible(this.searchSCLPage.specificCriteriaDropdown, 'specificCriteriaDropdown');
        await this.helper.clickElement(this.searchSCLPage.specificCriteriaDropdown, 'specificCriteriaDropdown')
 
    }
 
    //feature family code...
    async feature_family_code_tab() {
 
        //enter familly code
        await this.helper.assertElementVisible(this.searchSCLPage.featureFamilyCode, 'featureFamilyCode');
        await this.helper.enterText(this.searchSCLPage.featureFamilyCode, testData_SCL_FF.testDataForSearch.familycode, 'featureFamilyCode')
 
        //click on search icon
        await this.helper.assertElementVisible(this.searchSCLPage.searchIcon, 'searchIcon');
        await this.helper.clickElement(this.searchSCLPage.searchIcon, 'searchIcon');
        await this.page.waitForTimeout(5000);
 
        if (await this.searchSCLPage.searchResultTable.isVisible()) {
            await this.helper.assertElementHasText(this.searchSCLPage.firstCell, testData_SCL_FF.testDataForSearch.familycode, 'comparing')
        }
        else {
            console.log("error");
        }
 
 
    }
 
    //feature family description...
    async feature_family_description_tab() {
 
        //enter familly code
        await this.helper.assertElementVisible(this.searchSCLPage.familyDescription, 'familydescription');
        await this.helper.enterText(this.searchSCLPage.familyDescription, testData_SCL_FF.testDataForSearch.familydescription, 'familydescription')
 
        //click on search icon
        await this.helper.assertElementVisible(this.searchSCLPage.searchIcon, 'searchIcon');
        await this.helper.clickElement(this.searchSCLPage.searchIcon, 'searchIcon');
        await this.page.waitForTimeout(5000);
 
        if (await this.searchSCLPage.searchResultTable.isVisible()) {
            await this.helper.assertElementTextContainedIn(this.searchSCLPage.secondCell, testData_SCL_FF.testDataForSearch.familydescription, 'comparing familydescription')
        }
        else {
            console.log("error");
        }
    }
 
    //language...
    async language_tab() {
 
        //enter familly code
        await this.helper.assertElementVisible(this.searchSCLPage.languagetab, 'languageTab');
        await this.helper.clickElement(this.searchSCLPage.languagetab, 'languageTab')
 
        //enter familly code
        await this.helper.assertElementVisible(this.searchSCLPage.languageOption, 'natureOption');
        await this.helper.clickElement(this.searchSCLPage.languageOption, 'natureOption')
        await this.page.keyboard.press('Tab');
 
        //click on search icon
        await this.helper.assertElementVisible(this.searchSCLPage.searchIcon, 'searchIcon');
        await this.helper.clickElement(this.searchSCLPage.searchIcon, 'searchIcon');
        await this.page.waitForTimeout(5000);
 
         if (await this.searchSCLPage.searchResultTable.isVisible()) {
 
            await this.helper.assertElementTextContainedIn(this.searchSCLPage.thirdCell, testData_SCL_FF.testDataForSearch.language, 'comparing language')
        }
 
    }
 
    //type...
    async nature_tab() {
 
        //enter nature tab
        await this.helper.assertElementVisible(this.searchSCLPage.naturetab, 'naturetab');
        await this.helper.clickElement(this.searchSCLPage.naturetab, 'naturetab')
 
        //enter nature option
        await this.helper.assertElementVisible(this.searchSCLPage.natureOption, 'natureOption');
        await this.helper.clickElement(this.searchSCLPage.natureOption, 'natureOption')
        await this.page.keyboard.press('Tab');
 
        //click on search icon
        await this.helper.assertElementVisible(this.searchSCLPage.searchIcon, 'searchIcon');
        await this.helper.clickElement(this.searchSCLPage.searchIcon, 'searchIcon');
        await this.page.waitForTimeout(5000);
 
        if (await this.searchSCLPage.searchResultTable.isVisible()) {
 
            // console.log("1: "+this.searchSCLPage.fourthCell);
            // console.log("2: "+testData_SCL_FF.testDataForSearch.nature);
            await this.helper.assertElementVisible(this.searchSCLPage.fourthCell, 'search SCL first row');
        }
        else {
            console.log("error");
        }
    }
 
    //mandatory structure
     async mandatory_structure() {
       
        //enter familly code
        await this.helper.assertElementVisible(this.searchSCLPage.manStructuretab, 'manStructuretab');
        await this.helper.clickElement(this.searchSCLPage.manStructuretab, 'manStructuretab')
 
        //enter familly code
        await this.helper.assertElementVisible(this.searchSCLPage.manStructureOption, 'manStructureOption');
        await this.helper.clickElement(this.searchSCLPage.manStructureOption, 'manStructureOption')
        await this.page.keyboard.press('Tab');
 
        //click on search icon
        await this.helper.assertElementVisible(this.searchSCLPage.searchIcon, 'searchIcon');
        await this.helper.clickElement(this.searchSCLPage.searchIcon, 'searchIcon');
        await this.page.waitForTimeout(5000);
 
        if (await this.searchSCLPage.searchResultTable.isVisible()) {
 
            await this.helper.assertElementVisible(this.searchSCLPage.moreVert, 'moreVert');
            await this.helper.clickElement(this.searchSCLPage.moreVert, 'moreVert');
 
            await this.helper.assertElementVisible(this.searchSCLPage.ManStrucvisBTN, 'ManStrucvisBTN');
            await this.helper.clickElement(this.searchSCLPage.ManStrucvisBTN, 'ManStrucvisBTN');
            await this.page.keyboard.press('Tab');
 
            let languages = "C - x-FCA NA";
            await this.helper.assertElementTextContainedIn(this.searchSCLPage.mandStrucCell, languages, 'comparing mandatory structure')
        }
        else {
            console.log("error");
        }
    }
 
 
    //mandatory responce
    async mandatory_response() {
 
        //enter familly code
        await this.helper.assertElementVisible(this.searchSCLPage.manResponcetab, 'manResponcetab');
        await this.helper.clickElement(this.searchSCLPage.manResponcetab, 'manResponcetab')
 
        //enter familly code
        await this.helper.assertElementVisible(this.searchSCLPage.manResponceOption, 'manResponceOption');
        await this.helper.clickElement(this.searchSCLPage.manResponceOption, 'manResponceOption')
        await this.page.keyboard.press('Tab');
 
        //click on search icon
        await this.helper.assertElementVisible(this.searchSCLPage.searchIcon, 'searchIcon');
        await this.helper.clickElement(this.searchSCLPage.searchIcon, 'searchIcon');
        await this.page.waitForTimeout(5000);
 
        if (await this.searchSCLPage.searchResultTable.isVisible()) {
 
            await this.helper.assertElementVisible(this.searchSCLPage.moreVert, 'moreVert');
            await this.helper.clickElement(this.searchSCLPage.moreVert, 'moreVert');
 
            await this.helper.assertElementVisible(this.searchSCLPage.ManRanvisBTN, 'ManRanvisBTN');
            await this.helper.clickElement(this.searchSCLPage.ManRanvisBTN, 'ManRanvisBTN');
            await this.page.keyboard.press('Tab');
 
            await this.helper.assertElementHasText(this.searchSCLPage.mandResponceCell, testData_SCL_FF.testDataForSearch.manResponce, 'comparing manResponce')
        }
        else {
            console.log("error");
        }
    }
 
     async nature_fields() {
 
        //click nature tab
        await this.helper.assertElementVisible(this.searchSCLPage.naturetab, 'naturetab');
        await this.helper.clickElement(this.searchSCLPage.naturetab, 'naturetab')
 
        //enter nature option
        await this.helper.assertElementVisible(this.searchSCLPage.natureOption, 'natureOption');
        await this.helper.clickElement(this.searchSCLPage.natureOption, 'natureOption')
        await this.page.keyboard.press('Tab');
 
        //click on search icon
        await this.helper.assertElementVisible(this.searchSCLPage.searchIcon, 'searchIcon');
        await this.helper.clickElement(this.searchSCLPage.searchIcon, 'searchIcon');
        await this.page.waitForTimeout(5000);
 
        if (await this.searchSCLPage.searchResultTable.isVisible()) {
 
            // console.log("1: "+this.searchSCLPage.fourthCell);
            // console.log("2: "+testData_SCL_FF.testDataForSearch.nature);
            await this.helper.assertElementVisible(this.searchSCLPage.fourthCell, 'Search SCL first row')
        }
        else {
            console.log("error");
        }
    }
 
        async SiExclusive_fields() {
            //search by Si exclusion
        await this.helper.assertElementVisible(this.searchSCLPage.siExclusion, 'siExclusionDropdown');
        await this.helper.clickElement(this.searchSCLPage.siExclusion, 'siExclusionDropdown');
        await this.helper.clickElement(this.searchSCLPage.siExclusionOption, 'siExclusionDropdownOption');
        await this.page.keyboard.press('Tab');
        //search button
        await this.helper.assertElementVisible(this.searchSCLPage.searchBtn, 'searchButton');
        await this.helper.clickElement(this.searchSCLPage.searchBtn, 'searchButton');
        //data visibility check
        await this.searchSCLPage.data.waitFor({ state: 'visible' });
        //await this.page.waitForTimeout(5000);
        if (await this.searchSCLPage.data.isVisible()) {
            console.log(`${searchData_SCL_FF.Searching.structure} data is available`);
        } else {
            console.log(`${searchData_SCL_FF.Searching.structure} data is not available`);
        }
 
       // await this.helper.clickElement(this.searchMappingPage.sclColumn, 'sclColumn');
        //shown specific column
        let availablibility = 0;
        const countColumn = await this.searchSCLPage.columnAvailable.count();
        for (let i = 0; i < countColumn; i++) {
            let coloumtext = await this.searchSCLPage.columnAvailable.nth(i).textContent();
            if (coloumtext?.includes(searchData_SCL_FF.moreColumn.SiExclusion)) {
                availablibility = 1;
                break;
            }
        }
        if (availablibility == 0) {
            await this.helper.assertElementVisible(this.searchSCLPage.morecolumn, 'Extracoloum');
            await this.helper.clickElement(this.searchSCLPage.morecolumn, 'ExtraColoum');
            await this.helper.clickElement(this.searchMappingPage.sclColumn, 'sclColumn');
            const count = await this.searchSCLPage.morecolumnOption.count();
            for (let i = 1; i <= count; i++) {
                let coloumtext = await this.searchSCLPage.morecolumnOption.nth(i).textContent();
                if (coloumtext?.includes(searchData_SCL_FF.moreColumn.SiExclusion)) {
                    await this.helper.assertElementVisible(this.searchSCLPage.visibilitybutton.nth(i), 'visibilityBtn');
                    await this.helper.clickElement(this.searchSCLPage.visibilitybutton.nth(i), 'visibilityBtn');
                    await this.page.keyboard.press('Tab');
                    break;
                }
            }
        } else {
            console.log(`${searchData_SCL_FF.moreColumn.SiExclusion} is already visible`);
        }
 
    }
 
    async SiExplicit_Field(){
         // search by Si explicit
        await this.helper.assertElementVisible(this.searchSCLPage.siExplicit, 'siExplicitDropdown');
        await this.helper.clickElement(this.searchSCLPage.siExplicit, 'siExplicitDropdown');
        await this.helper.clickElement(this.searchSCLPage.siExplicitOption, 'siExplicitDropdownOption');
        await this.page.keyboard.press('Tab');
        //search button
        await this.helper.assertElementVisible(this.searchSCLPage.searchBtn, 'searchButton');
        await this.helper.clickElement(this.searchSCLPage.searchBtn, 'searchButton');
        //data visibility check
        await this.searchSCLPage.data.waitFor({ state: 'visible' });
        //await this.page.waitForTimeout(5000);
        if (await this.searchSCLPage.data.isVisible()) {
            console.log(`${searchData_SCL_FF.Searching.structure} data is available`);
        } else {
            console.log(`${searchData_SCL_FF.Searching.structure} data is not available`);
        }
        //shown specific coloum
        let availablibility = 0;
        const countColumn = await this.searchSCLPage.columnAvailable.count();
        for (let i = 0; i < countColumn; i++) {
            let coloumtext = await this.searchSCLPage.columnAvailable.nth(i).textContent();
            if (coloumtext?.includes(searchData_SCL_FF.moreColumn.Siexplicit)) {
                availablibility = 1;
                break;
            }
        }
        if (availablibility == 0) {
            await this.helper.assertElementVisible(this.searchSCLPage.morecolumn, 'Extracoloum');
            await this.helper.clickElement(this.searchSCLPage.morecolumn, 'ExtraColoum');
            await this.helper.clickElement(this.searchMappingPage.sclColumn, 'sclColumn');
            const count = await this.searchSCLPage.morecolumnOption.count();
            for (let i = 1; i <= count; i++) {
                let coloumtext = await this.searchSCLPage.morecolumnOption.nth(i).textContent();
                if (coloumtext?.includes(searchData_SCL_FF.moreColumn.Siexplicit)) {
                    await this.helper.assertElementVisible(this.searchSCLPage.visibilitybutton.nth(i), 'visibilityBtn');
                    await this.helper.clickElement(this.searchSCLPage.visibilitybutton.nth(i), 'visibilityBtn');
                    await this.page.keyboard.press('Tab');
                    break;
                }
            }
        } else {
            console.log(`${searchData_SCL_FF.Searching.Si_Explicit} is already visible`);
        }
 
    }
 
    async Transversal_field(){
          //search by transversal description
        await this.helper.assertElementVisible(this.searchSCLPage.transversalDropdown,'transversalDropdown');
        await this.helper.clickElement(this.searchSCLPage.transversalDropdown,'transversalDropdown');
        await this.helper.clickElement(this.searchSCLPage.transversalDropdownOption,'transversalDropdownOption');
        await this.page.keyboard.press('Tab');
        //search button
        await this.helper.assertElementVisible(this.searchSCLPage.searchBtn,'searchButton');
        await this.helper.clickElement(this.searchSCLPage.searchBtn,'searchButton');
        //data visibility check
        await this.searchSCLPage.data.waitFor({state:'visible'});
        //await this.page.waitForTimeout(10000);
        if(await this.searchSCLPage.data.isVisible()){
            console.log(`${searchData_SCL_FF.Searching.structure} data is available`);
        }else{
            console.log(`${searchData_SCL_FF.Searching.structure} data is not available`);
        }
        //shown specific coloum
        let availablibility =0;
        const countColumn = await this.searchSCLPage.columnAvailable.count();
        for(let i=0;i<countColumn;i++){
            let coloumtext = await this.searchSCLPage.columnAvailable.nth(i).textContent();
            if(coloumtext?.includes(searchData_SCL_FF.moreColumn.Transversal)){
                availablibility=1;
                break;
            }
        }
        if(availablibility==0){
        await this.helper.assertElementVisible(this.searchSCLPage.morecolumn,'Extracoloum');
        await this.helper.clickElement(this.searchSCLPage.morecolumn,'ExtraColoum');
        await this.helper.clickElement(this.searchMappingPage.sclColumn, 'sclColumn');
        const count = await this.searchSCLPage.morecolumnOption.count();
        for(let i=1;i<= count;i++){
            let coloumtext = await this.searchSCLPage.morecolumnOption.nth(i).textContent();
            if(coloumtext?.includes(searchData_SCL_FF.moreColumn.Transversal)){
                await this.helper.assertElementVisible(this.searchSCLPage.visibilitybutton.nth(i),'visibilityBtn');
                await this.helper.clickElement(this.searchSCLPage.visibilitybutton.nth(i),'visibilityBtn');
                await this.page.keyboard.press('Tab');
                break;
 
            }
        }
        }else{
            console.log(`${searchData_SCL_FF.moreColumn.Transversal} is already visible`);
        }
    }
 
    async language_field(){
 
         //enter familly code
        await this.helper.assertElementVisible(this.searchSCLPage.languagetab, 'languageTab');
        await this.helper.clickElement(this.searchSCLPage.languagetab, 'languageTab')
 
        //enter familly code
        await this.helper.assertElementVisible(this.searchSCLPage.languageOption, 'natureOption');
        await this.helper.clickElement(this.searchSCLPage.languageOption, 'natureOption')
        await this.page.keyboard.press('Tab');
 
        //click on search icon
        await this.helper.assertElementVisible(this.searchSCLPage.searchIcon, 'searchIcon');
        await this.helper.clickElement(this.searchSCLPage.searchIcon, 'searchIcon');
        await this.page.waitForTimeout(5000);
 
         if (await this.searchSCLPage.searchResultTable.isVisible()) {
 
            await this.helper.assertElementTextContainedIn(this.searchSCLPage.thirdCell, testData_SCL_FF.testDataForSearch.language, 'comparing language')
        }
 }
 
    async type_field(){
 
       await this.helper.assertElementVisible(this.searchSCLPage.type, 'Type');
        await this.helper.clickElement(this.searchSCLPage.type, 'Type');
        await this.helper.clickElement(this.searchSCLPage.typeOption, 'Type Option');
        await this.page.mouse.click(100, 100);
 
        await this.helper.assertElementVisible(this.searchSCLPage.searchIcon, 'SearchIcon');
        await this.helper.clickElement(this.searchSCLPage.searchIcon, 'SearchIcon');
        await this.page.waitForTimeout(2000)
        if (await this.searchSCLPage.zeroRecord.isVisible()) {
            console.log("No records Found!")
        }
        else {
            if (await this.searchSCLPage.tableHeaderColumnType.isVisible()) {
                //assert if that location has the same searched value
                await this.helper.assertElementHasText(this.searchSCLPage.firstRowType, testData_SCL_FF.testData.typeOptionValue, 'First Row Type');
                console.log("Search Successful!")
            }
            else {
                //click on toggle button
                await this.helper.assertElementVisible(this.searchSCLPage.openCustomizeColumnBtn, 'openCustomizeColumnBtn');
                await this.helper.clickElement(this.searchSCLPage.openCustomizeColumnBtn, 'openCustomizeColumnBtn');
                await this.helper.clickElement(this.searchMappingPage.sclColumn, 'sclColumn');
 
                //find for that column name and click the toggle button and enable it
                await this.helper.assertElementVisible(this.searchSCLPage.toggleBtnType, 'toggleBtnType');
                await this.helper.clickElement(this.searchSCLPage.toggleBtnType, 'toggleBtnType');
 
                //close the customixe column button
                await this.helper.assertElementVisible(this.searchSCLPage.closeCustomizeColumnBtn, 'closeCustomizeColumnBtn');
                await this.helper.clickElement(this.searchSCLPage.closeCustomizeColumnBtn, 'closeCustomizeColumnBtn');
 
                await this.helper.assertElementVisible(this.searchSCLPage.tableHeaderColumnType, 'tableHeaderColumnType');
                await this.helper.assertElementHasText(this.searchSCLPage.firstRowType, testData_SCL_FF.testData.typeOptionValue, 'First Row Type');
                console.log("Search Successful!")
            }
        }
 
    }
 
    async category_field() {
        //generic dict
        await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
        await this.helper.clickElement(this.homePage.genericDict, 'genericDict');
 
        //search option
        await this.helper.assertElementVisible(this.genericSCLHierarchyOffPage.search, 'search_option');
        await this.helper.clickElement(this.genericSCLHierarchyOffPage.search, 'search_option_clicked');
 
        //hierarchy button
        await this.helper.assertElementVisible(this.genericSCLHierarchyOffPage.hierarchyButton, 'hierarchy');
        await this.helper.clickElement(this.genericSCLHierarchyOffPage.hierarchyButton, 'hierarchy_button');
 
        // checking advance dropdown
        await this.helper.assertElementVisible(this.searchSCLPage.arrowDown, 'arrowDown');
        await this.helper.clickElement(this.searchSCLPage.arrowDown, 'arrowDown');
 
         //SCL Advance search Dropdown
        await this.helper.assertElementVisible(this.searchMappingPage.arrowDownSCL,'SCLSpeificCriteria');
        await this.helper.clickElement(this.searchMappingPage.arrowDownSCL,'SCLSpeificCriteria');
 
        //search by category
        await this.helper.assertElementVisible(this.searchSCLPage.categoryDropdown, 'categoryDropdown');
        await this.helper.clickElement(this.searchSCLPage.categoryDropdown, 'categoryDropdown');
        await this.helper.clickElement(this.searchSCLPage.categoryDropdownOption, 'categoryDropdownOption');
        await this.page.keyboard.press('Tab');
        //search button
        await this.helper.assertElementVisible(this.searchSCLPage.searchBtn, 'searchButton');
        await this.helper.clickElement(this.searchSCLPage.searchBtn, 'searchButton');
        //data visibility check
        await this.searchSCLPage.data1.waitFor({ state: 'visible' });
        //await this.page.waitForTimeout(5000);
        if (await this.searchSCLPage.data1.isVisible()) {
            console.log(`data is available`);
        } else {
            console.log(`data is not available`);
        }
 
    }
 
    async navigateTo_SCL_Specific_Criteria() {
 
        await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
        await this.helper.clickElement(this.homePage.genericDict, 'genericDict');
 
        //go to search SCL Feature
        await this.helper.assertElementVisible(this.homePage.search,'search');
        await this.helper.clickElement(this.homePage.search, 'search');
       
        //Mapping Button
        await this.helper.assertElementVisible(this.searchMappingPage.mappingBtn,'MappingButton');
        await this.helper.clickElement(this.searchMappingPage.mappingBtn,'MappingButton');
 
        //Advance Search Dropdown
        await this.helper.assertElementVisible(this.searchMappingPage.arrowDown,'arrowDown');
        await this.helper.clickElement(this.searchMappingPage.arrowDown,'arrowDown');
 
        //SCL Advance search Dropdown
        await this.helper.assertElementVisible(this.searchMappingPage.arrowDownSCL,'SCLSpeificCriteria');
        await this.helper.clickElement(this.searchMappingPage.arrowDownSCL,'SCLSpeificCriteria');
    }
}
 
 