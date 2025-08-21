import { Locator, Page, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { SearchSCLPage } from '../pages/searchSCLPage';
import searchData_SCL_FF from '../test-data/searchData_SCL_FF.json';
import testData_SCL_FF from '../test-data/testData_SCL_FF.json';
import { FeatureSCLPage } from '../pages/featureSCLPage';

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
    getRandomNumber: (locator: any, name: any) => Promise<number>;
    assertElementDisabled: (element: any, elementName: string) => Promise<boolean>;
    toggleButtonAction: (locator: Locator, element: string) => Promise<void>;
    checkDateInRange(datelocator: Locator, startDateData: string, endDateData: string): Promise<void>
}

export class SearchSCLSteps {
    private page: Page;
    private testInfo: TestInfo;
    private helper: StepHelper;
    private homePage: HomePage;
    private searchSCLPage: SearchSCLPage;
    private featureSCLPage: FeatureSCLPage;


    constructor(page: Page, testInfo: TestInfo, stepHelper: StepHelper) {
        this.page = page;
        this.testInfo = testInfo;
        this.helper = stepHelper;
        this.homePage = new HomePage(page);
        this.searchSCLPage = new SearchSCLPage(page);
        this.featureSCLPage = new FeatureSCLPage(page);
    }

    async navigateTo_search_SCL_Feature_By_Category() {

        await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
        await this.helper.clickElement(this.homePage.genericDict, 'genericDict');

        //go to search SCL Feature
        await this.helper.assertElementVisible(this.homePage.search, 'search');
        await this.helper.clickElement(this.homePage.search, 'search');

        //Single Button
        await this.helper.assertElementVisible(this.searchSCLPage.SingleButton, 'singleButton');
        await this.helper.clickElement(this.searchSCLPage.SingleButton, 'single');
        // structure dropdwon
        await this.helper.assertElementVisible(this.searchSCLPage.structureDropdown, 'structureDropdown');
        await this.helper.clickElement(this.searchSCLPage.structureDropdown, 'structureDropdown');
        await this.helper.clickElement(this.searchSCLPage.structureDropdownOptions, 'structureDropdownOption');
        // checking advance dropdown
        await this.helper.assertElementVisible(this.searchSCLPage.arrowDown, 'arrowDown');
        await this.helper.clickElement(this.searchSCLPage.arrowDown, 'arrowDown');
        await this.helper.assertElementVisible(this.searchSCLPage.advanceDropdownSearch, 'advancedropdown');
        await this.helper.clickElement(this.searchSCLPage.advanceDropdownSearch, 'advancedropdown');
        //search by category
        await this.helper.assertElementVisible(this.searchSCLPage.categoryDropdown, 'categoryDropdown');
        await this.helper.clickElement(this.searchSCLPage.categoryDropdown, 'categoryDropdown');
        await this.helper.clickElement(this.searchSCLPage.categoryDropdownOption, 'categoryDropdownOption');
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

        // closer of toggle button
        await this.helper.toggleButtonAction(this.searchSCLPage.toggleButton, 'toggleButton');
        await this.helper.clickElement(this.searchSCLPage.searchBtn, 'searchButton');
        await this.page.waitForTimeout(5000);

        //check for feature value visibility
        if (await this.searchSCLPage.featureValueVisibility.isVisible()) {
            console.log("feature value is visible");
        } else {
            console.log("feature value is hidden");
        }

    }

   async navigateTo_search_SCL_Feature_By_Transversal(){
        await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
        await this.helper.clickElement(this.homePage.genericDict, 'genericDict');
 
        //go to search SCL Feature
        await this.helper.assertElementVisible(this.homePage.search,'search');
        await this.helper.clickElement(this.homePage.search, 'search');
 
        //Single Button
        await this.helper.assertElementVisible(this.searchSCLPage.SingleButton,'singleButton');
        await this.helper.clickElement(this.searchSCLPage.SingleButton,'single');
        // structure dropdwon
        await this.helper.assertElementVisible(this.searchSCLPage.structureDropdown,'structureDropdown');
        await this.helper.clickElement(this.searchSCLPage.structureDropdown, 'structureDropdown');
        await this.helper.clickElement(this.searchSCLPage.structureDropdownOptions,'structureDropdownOption');
        // checking advance dropdown
        await this.helper.assertElementVisible(this.searchSCLPage.arrowDown,'arrowDown');
        await this.helper.clickElement(this.searchSCLPage.arrowDown,'arrowDown');
        await this.helper.assertElementVisible(this.searchSCLPage.advanceDropdownSearch,'advancedropdown');
        await this.helper.clickElement(this.searchSCLPage.advanceDropdownSearch,'advancedropdown');
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
       
        // closer of toggle button
        // await this.helper.toggleButtonAction(this.searchSCLPage.toggleButton,'toggleButton');
        // await this.helper.clickElement(this.searchSCLPage.searchBtn,'searchButton');
        // await this.page.waitForTimeout(5000);
       
        // //check for feature value visibility
        // if(await this.searchSCLPage.featureValueVisibility.isVisible()){
        //     console.log("feature value is visible");
        // }else{
        //     console.log("feature value is hidden");
        // }
    }

    async navigateTo_search_SCL_Feature_By_CreatorId() {
        await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
        await this.helper.clickElement(this.homePage.genericDict, 'genericDict');

        //go to search SCL Feature
        await this.helper.assertElementVisible(this.homePage.search, 'search');
        await this.helper.clickElement(this.homePage.search, 'search');

        //Single Button
        await this.helper.assertElementVisible(this.searchSCLPage.SingleButton, 'singleButton');
        await this.helper.clickElement(this.searchSCLPage.SingleButton, 'single');
        // structure dropdwon
        await this.helper.assertElementVisible(this.searchSCLPage.structureDropdown, 'structureDropdown');
        await this.helper.clickElement(this.searchSCLPage.structureDropdown, 'structureDropdown');
        await this.helper.clickElement(this.searchSCLPage.structureDropdownOptions, 'structureDropdownOption');
        // checking advance dropdown
        await this.helper.assertElementVisible(this.searchSCLPage.arrowDown, 'arrowDown');
        await this.helper.clickElement(this.searchSCLPage.arrowDown, 'arrowDown');
        await this.helper.assertElementVisible(this.searchSCLPage.advanceDropdownSearch, 'advancedropdown');
        await this.helper.clickElement(this.searchSCLPage.advanceDropdownSearch, 'advancedropdown');
        //search by creatorId
        await this.helper.assertElementVisible(this.searchSCLPage.creatorId, 'creatorId');
        await this.helper.clickElement(this.searchSCLPage.creatorId, 'creatorId');
        await this.helper.enterText(this.searchSCLPage.creatorId, searchData_SCL_FF.Searching.Creator_Id, 'creatorId');
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
            if (coloumtext?.includes(searchData_SCL_FF.moreColumn.Creator)) {
                availablibility = 1;
                break;
            }
        }
        if (availablibility == 0) {
            await this.helper.assertElementVisible(this.searchSCLPage.morecolumn, 'Extracoloum');
            await this.helper.clickElement(this.searchSCLPage.morecolumn, 'ExtraColoum');
            const count = await this.searchSCLPage.morecolumnOption.count();
            for (let i = 1; i <= count; i++) {
                let coloumtext = await this.searchSCLPage.morecolumnOption.nth(i).textContent();
                if (coloumtext?.includes(searchData_SCL_FF.moreColumn.Creator)) {
                    await this.helper.assertElementVisible(this.searchSCLPage.visibilitybutton.nth(i), 'visibilityBtn');
                    await this.helper.clickElement(this.searchSCLPage.visibilitybutton.nth(i), 'visibilityBtn');
                    await this.page.keyboard.press('Tab');
                    break;
                }
            }
        } else {
            console.log(`${searchData_SCL_FF.moreColumn.Creator} is already visible`);
        }

    }






    async navigateTo_search_SCL_Feature_By_SiExplicit() {
        await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
        await this.helper.clickElement(this.homePage.genericDict, 'genericDict');

        //go to search SCL Feature
        await this.helper.assertElementVisible(this.homePage.search, 'search');
        await this.helper.clickElement(this.homePage.search, 'search');

        //Single Button
        await this.helper.assertElementVisible(this.searchSCLPage.SingleButton, 'singleButton');
        await this.helper.clickElement(this.searchSCLPage.SingleButton, 'single');
        // structure dropdwon
        await this.helper.assertElementVisible(this.searchSCLPage.structureDropdown, 'structureDropdown');
        await this.helper.clickElement(this.searchSCLPage.structureDropdown, 'structureDropdown');
        await this.helper.clickElement(this.searchSCLPage.structureDropdownOptions, 'structureDropdownOption');
        // checking advance dropdown
        await this.helper.assertElementVisible(this.searchSCLPage.arrowDown, 'arrowDown');
        await this.helper.clickElement(this.searchSCLPage.arrowDown, 'arrowDown');
        await this.helper.assertElementVisible(this.searchSCLPage.advanceDropdownSearch, 'advancedropdown');
        await this.helper.clickElement(this.searchSCLPage.advanceDropdownSearch, 'advancedropdown');
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


    async navigateTo_search_SCL_Feature_By_SiExclusion() {
        await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
        await this.helper.clickElement(this.homePage.genericDict, 'genericDict');

        //go to search SCL Feature
        await this.helper.assertElementVisible(this.homePage.search, 'search');
        await this.helper.clickElement(this.homePage.search, 'search');

        //Single Button
        await this.helper.assertElementVisible(this.searchSCLPage.SingleButton, 'singleButton');
        await this.helper.clickElement(this.searchSCLPage.SingleButton, 'single');
        // structure dropdwon
        await this.helper.assertElementVisible(this.searchSCLPage.structureDropdown, 'structureDropdown');
        await this.helper.clickElement(this.searchSCLPage.structureDropdown, 'structureDropdown');
        await this.helper.clickElement(this.searchSCLPage.structureDropdownOptions, 'structureDropdownOption');
        // checking advance dropdown
        await this.helper.assertElementVisible(this.searchSCLPage.arrowDown, 'arrowDown');
        await this.helper.clickElement(this.searchSCLPage.arrowDown, 'arrowDown');
        await this.helper.assertElementVisible(this.searchSCLPage.advanceDropdownSearch, 'advancedropdown');
        await this.helper.clickElement(this.searchSCLPage.advanceDropdownSearch, 'advancedropdown');
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

    async navigateTo_search_SCL_Feature_By_Feature_Value_Code() {
        await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
        await this.helper.clickElement(this.homePage.genericDict, 'genericDict');

        //go to search SCL Feature
        await this.helper.assertElementVisible(this.homePage.search, 'search');
        await this.helper.clickElement(this.homePage.search, 'search');

        //Single Button
        await this.helper.assertElementVisible(this.searchSCLPage.SingleButton, 'singleButton');
        await this.helper.clickElement(this.searchSCLPage.SingleButton, 'single');
        // structure dropdwon
        await this.helper.assertElementVisible(this.searchSCLPage.structureDropdown, 'structureDropdown');
        await this.helper.clickElement(this.searchSCLPage.structureDropdown, 'structureDropdown');
        await this.helper.clickElement(this.searchSCLPage.structureDropdownOptions, 'structureDropdownOption');
        // checking advance dropdown
        await this.helper.assertElementVisible(this.searchSCLPage.arrowDown, 'arrowDown');
        await this.helper.clickElement(this.searchSCLPage.arrowDown, 'arrowDown');
        await this.helper.assertElementVisible(this.searchSCLPage.advanceDropdownSearch, 'advancedropdown');
        await this.helper.clickElement(this.searchSCLPage.advanceDropdownSearch, 'advancedropdown');
        //search by featureValueCode
        await this.helper.assertElementVisible(this.searchSCLPage.featureValueCode, 'FeatureValueCode');
        await this.helper.clickElement(this.searchSCLPage.featureValueCode, 'FeatureValueCode');
        await this.helper.enterText(this.searchSCLPage.featureValueCode, searchData_SCL_FF.Searching.FeatureValueCode, 'FeatureValueCode');
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
        for (let i = 1; i <= countColumn; i++) {
            let coloumtext = await this.searchSCLPage.columnAvailable.nth(i).textContent();
            if (coloumtext?.includes(searchData_SCL_FF.moreColumn.FeatureValueCode)) {
                availablibility = 1;
                break;
            }
        }
        if (availablibility == 0) {
            await this.helper.assertElementVisible(this.searchSCLPage.morecolumn, 'Extracoloum');
            await this.helper.clickElement(this.searchSCLPage.morecolumn, 'ExtraColoum');
            const count = await this.searchSCLPage.morecolumnOption.count();
            for (let i = 1; i <= count; i++) {
                let coloumtext = await this.searchSCLPage.morecolumnOption.nth(i).textContent();
                if (coloumtext?.includes(searchData_SCL_FF.moreColumn.FeatureValueCode)) {
                    await this.helper.assertElementVisible(this.searchSCLPage.visibilitybutton.nth(i), 'visibilityBtn');
                    await this.helper.clickElement(this.searchSCLPage.visibilitybutton.nth(i), 'visibilityBtn');
                    await this.page.keyboard.press('Tab');
                    break;
                }
            }
        } else {
            console.log(`${searchData_SCL_FF.moreColumn.FeatureValueCode} is already visible`)
        }

    }

    async navigateTo_search_SCL_Feature_By_Feature_Value_Description() {
        await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
        await this.helper.clickElement(this.homePage.genericDict, 'genericDict');

        //go to search SCL Feature
        await this.helper.assertElementVisible(this.homePage.search, 'search');
        await this.helper.clickElement(this.homePage.search, 'search');

        //Single Button
        await this.helper.assertElementVisible(this.searchSCLPage.SingleButton, 'singleButton');
        await this.helper.clickElement(this.searchSCLPage.SingleButton, 'single');
        // structure dropdwon
        await this.helper.assertElementVisible(this.searchSCLPage.structureDropdown, 'structureDropdown');
        await this.helper.clickElement(this.searchSCLPage.structureDropdown, 'structureDropdown');
        await this.helper.clickElement(this.searchSCLPage.structureDropdownOptions, 'structureDropdownOption');
        // checking advance dropdown
        await this.helper.assertElementVisible(this.searchSCLPage.arrowDown, 'arrowDown');
        await this.helper.clickElement(this.searchSCLPage.arrowDown, 'arrowDown');
        await this.helper.assertElementVisible(this.searchSCLPage.advanceDropdownSearch, 'advancedropdown');
        await this.helper.clickElement(this.searchSCLPage.advanceDropdownSearch, 'advancedropdown');
        //search by featureValueDescription
        await this.helper.assertElementVisible(this.searchSCLPage.featureValueDescription, 'FeatureValueDescription');
        await this.helper.clickElement(this.searchSCLPage.featureValueDescription, 'FeatureValueDescription');
        await this.helper.enterText(this.searchSCLPage.featureValueDescription, searchData_SCL_FF.Searching.FeatureValueDescription, 'FeatureValueDescription');
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
        for (let i = 1; i <= countColumn; i++) {
            let coloumtext = await this.searchSCLPage.columnAvailable.nth(i).textContent();
            if (coloumtext?.includes(searchData_SCL_FF.moreColumn.FeatureValueDescription)) {
                availablibility = 1;
                break;
            }
        }
        if (availablibility == 0) {
            await this.helper.assertElementVisible(this.searchSCLPage.morecolumn, 'Extracoloum');
            await this.helper.clickElement(this.searchSCLPage.morecolumn, 'ExtraColoum');
            const count = await this.searchSCLPage.morecolumnOption.count();
            for (let i = 1; i <= count; i++) {
                let coloumtext = await this.searchSCLPage.morecolumnOption.nth(i).textContent();
                if (coloumtext?.includes(searchData_SCL_FF.moreColumn.FeatureValueDescription)) {
                    if (!await this.searchSCLPage.visibilitybutton.isHidden()) {
                        console.log(`${searchData_SCL_FF.moreColumn.FeatureValueDescription} is already visible`)
                    } else {
                        await this.helper.assertElementVisible(this.searchSCLPage.visibilitybutton.nth(i), 'visibilityBtn');
                        await this.helper.clickElement(this.searchSCLPage.visibilitybutton.nth(i), 'visibilityBtn');
                    }
                    await this.page.keyboard.press('Tab');
                    break;
                }
            }
        } else {
            console.log(`${searchData_SCL_FF.moreColumn.FeatureValueDescription} is already visible`);
        }

    }



    async navigateTo_generic_search() {
        //navigate to Generic Dictionary
        await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
        await this.helper.clickElement(this.homePage.genericDict, 'genericDict');


        await this.helper.assertElementVisible(this.searchSCLPage.searchSideBar, 'searchSideBar');
        await this.helper.clickElement(this.searchSCLPage.searchSideBar, 'searchSideBar');
        await this.page.waitForTimeout(8000)

        //check is toggel and single button is enabled

        await this.helper.assertElementVisible(this.searchSCLPage.resetBTN, 'resetBTN');
        await this.helper.clickElement(this.searchSCLPage.resetBTN, 'resetBTN');

        await this.helper.assertElementEnabled(this.searchSCLPage.isToggelOn, 'isToggelOn');
        await this.helper.assertElementEnabled(this.searchSCLPage.singleValue, 'singleValue');

        await this.helper.assertElementVisible(this.searchSCLPage.structure, 'Structure');
        await this.helper.clickElement(this.searchSCLPage.structure, 'Structure');

        await this.helper.assertElementVisible(this.searchSCLPage.SCLoption, 'SCL Option');
        await this.helper.clickElement(this.searchSCLPage.SCLoption, 'SCL Option');

        await this.helper.assertElementVisible(this.searchSCLPage.arrowDown, 'Arrow Down');
        await this.helper.clickElement(this.searchSCLPage.arrowDown, 'Arrow Down');

        await this.helper.assertElementVisible(this.searchSCLPage.specificCriteriaDropdown, 'specificCriteriaDropdown');
        await this.helper.clickElement(this.searchSCLPage.specificCriteriaDropdown, 'specificCriteriaDropdown');


    }


    async search_by_type() {
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

    async search_by_date() {
 
        await this.helper.assertElementVisible(this.searchSCLPage.featureFamilyStartDate, 'featureFamilyStartDate');
        await this.helper.enterText(this.searchSCLPage.featureFamilyStartDate, testData_SCL_FF.testData.featureFamilyStartDateValue, 'featureFamilyStartDate');
        await this.helper.assertElementVisible(this.searchSCLPage.featureFamilyEndDate, 'featureFamilyEndDate');
        await this.helper.enterText(this.searchSCLPage.featureFamilyEndDate, testData_SCL_FF.testData.featureFamilyEndDateValue, 'featureFamilyEndDate');
 
        await this.helper.assertElementVisible(this.searchSCLPage.searchIcon, 'SearchIcon');
        await this.helper.clickElement(this.searchSCLPage.searchIcon, 'SearchIcon');
        await this.page.waitForTimeout(5000)
 
        if (await this.searchSCLPage.zeroRecord.isVisible()) {
            console.log("No records Found!")
        }
        else {
            if (await this.searchSCLPage.tableHeaderColumnDate.isVisible()) {
                //assert if that location has the same searched value
 
                const headers = await this.searchSCLPage.headerRow
                const count = await headers.count();
                let dateIndex = 0
                for (let i = 0; i < count; i++) {
                    const text = await headers.nth(i).innerText();
                    let Text = text.trim()
                    if (Text.includes('Prohibited for new use (Feature Family)')) {
                        dateIndex = i + 1
                        break;
                    }
                }
 
                await this.page.waitForTimeout(3000)
                const datelocator = await this.page.locator(`//table//mat-row[1]//mat-cell[${dateIndex}]`)
                await this.helper.checkDateInRange(datelocator, testData_SCL_FF.testData.featureFamilyStartDateValue, testData_SCL_FF.testData.featureFamilyEndDateValue)
 
 
 
 
            }
            else {
                //click on toggle button
                await this.helper.assertElementVisible(this.searchSCLPage.openCustomizeColumnBtn, 'openCustomizeColumnBtn');
                await this.helper.clickElement(this.searchSCLPage.openCustomizeColumnBtn, 'openCustomizeColumnBtn');
 
                //find for that column name and click the toggle button and enable it
                await this.helper.assertElementVisible(this.searchSCLPage.toggleBtnDate, 'toggleBtnType');
                await this.helper.clickElement(this.searchSCLPage.toggleBtnDate, 'toggleBtnType');
 
                //close the customixe colum button
                await this.helper.assertElementVisible(this.searchSCLPage.closeCustomizeColumnBtn, 'closeCustomizeColumnBtn');
                await this.helper.clickElement(this.searchSCLPage.closeCustomizeColumnBtn, 'closeCustomizeColumnBtn');
 
 
 
                await this.helper.assertElementVisible(this.searchSCLPage.tableHeaderColumnDate, 'tableHeaderColumnType');
 
                const headers = await this.searchSCLPage.headerRow
                const count = await headers.count();
                let dateIndex = 0
                for (let i = 0; i < count; i++) {
                    const text = await headers.nth(i).innerText();
                    let Text = text.trim()
                    if (Text.includes('Prohibited for new use (Feature Family)')) {
                        dateIndex = i + 1
                        break;
                    }
                }
 
                await this.page.waitForTimeout(3000)
                const datelocator = await this.page.locator(`//table//mat-row[1]//mat-cell[${dateIndex}]`)
                await this.helper.checkDateInRange(datelocator, testData_SCL_FF.testData.featureFamilyStartDateValue, testData_SCL_FF.testData.featureFamilyEndDateValue)
 
 
 
            }
        }
 
 
    }

    async search_by_rank() {
        await this.helper.assertElementVisible(this.searchSCLPage.ranking, 'ranking');
        await this.helper.clickElement(this.searchSCLPage.ranking, 'ranking');
        await this.helper.clickElement(this.searchSCLPage.rankingDropdownOption, 'rankingDropdownOption');
        await this.page.mouse.click(100, 100);

        await this.helper.assertElementVisible(this.searchSCLPage.searchIcon, 'searchIcon');
        await this.helper.clickElement(this.searchSCLPage.searchIcon, 'searchIcon');
        await this.page.waitForTimeout(5000)
        if (await this.searchSCLPage.zeroRecord.isVisible()) {
            console.log("No records Found!")
        }
        else {
            if (await this.searchSCLPage.tableHeaderColumnRanking.isVisible()) {
                //assert if that location has the same searched value
                await this.helper.assertElementHasText(this.searchSCLPage.firstRowRanking, testData_SCL_FF.testData.rankingDropdownOptionValue, 'First Row Ranking');
                console.log("Search Successful!")
            }
            else {
                //click on toggle button
                await this.helper.assertElementVisible(this.searchSCLPage.openCustomizeColumnBtn, 'openCustomizeColumnBtn');
                await this.helper.clickElement(this.searchSCLPage.openCustomizeColumnBtn, 'openCustomizeColumnBtn');

                //find for that column name and click the toggle button and enable it
                await this.helper.assertElementVisible(this.searchSCLPage.toggleBtnRanking, 'toggleBtnRanking');
                await this.helper.clickElement(this.searchSCLPage.toggleBtnRanking, 'toggleBtnRanking');

                //close the customixe colum button
                await this.helper.assertElementVisible(this.searchSCLPage.closeCustomizeColumnBtn, 'closeCustomizeColumnBtn');
                await this.helper.clickElement(this.searchSCLPage.closeCustomizeColumnBtn, 'closeCustomizeColumnBtn');

                await this.helper.assertElementVisible(this.searchSCLPage.tableHeaderColumnRanking, 'tableHeaderColumnRanking');
                await this.helper.assertElementHasText(this.searchSCLPage.firstRowRanking, testData_SCL_FF.testData.rankingDropdownOptionValue, 'First Row Ranking');
                console.log("Search Successful!")
            }
        }

    }
    async navigateTo_search_SCL_Feature_By_mandatory_for_valorization() {

        await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
        await this.helper.clickElement(this.homePage.genericDict, 'genericDict');

        await this.helper.assertElementVisible(this.homePage.search, 'search');
        await this.helper.clickElement(this.homePage.search, 'search');

        await this.helper.assertElementVisible(this.featureSCLPage.SingleButton, 'singleButton');
        await this.helper.clickElement(this.featureSCLPage.SingleButton, 'single');

        await this.helper.assertElementVisible(this.featureSCLPage.structureDropdown, 'structureDropdown');
        await this.helper.clickElement(this.featureSCLPage.structureDropdown, 'structureDropdown');
        await this.helper.clickElement(this.featureSCLPage.structureDropdownOptions, 'structureDropdownOption');

        await this.helper.assertElementVisible(this.featureSCLPage.arrowDown, 'arrowDown');
        await this.helper.clickElement(this.featureSCLPage.arrowDown, 'arrowDown');
        await this.helper.assertElementVisible(this.featureSCLPage.advanceDropdownSearch, 'advancedropdown');
        await this.helper.clickElement(this.featureSCLPage.advanceDropdownSearch, 'advancedropdown');

        await this.helper.assertElementVisible(this.featureSCLPage.mandatoryOfValorizationDropdown, 'mandatoryOfValorizationDropdown');
        await this.helper.clickElement(this.featureSCLPage.mandatoryOfValorizationDropdown, 'mandatoryOfValorizationDropdown');

        await this.helper.assertElementVisible(this.featureSCLPage.mandatoryOfValorizationOption, 'mandatoryOfValorizationOption');
        await this.helper.clickElement(this.featureSCLPage.mandatoryOfValorizationOption, 'mandatoryOfValorizationOption');
        await this.page.keyboard.press('Tab');

        await this.helper.assertElementVisible(this.featureSCLPage.searchBtn, 'searchButton');
        await this.helper.clickElement(this.featureSCLPage.searchBtn, 'searchButton');

        await this.featureSCLPage.data.waitFor({ state: 'visible' });

        if (await this.featureSCLPage.data.isVisible()) {
            console.log(`${searchData_SCL_FF.testData.structure} data is available`);
        } else {
            console.log(`${searchData_SCL_FF.testData.structure} data is not available`);
        }

        let availablibility = 0;
        const countColumn = await this.featureSCLPage.columnAvailable.count();
        for (let i = 0; i < countColumn; i++) {
            let coloumtext = await this.featureSCLPage.columnAvailable.nth(i).textContent();
            if (coloumtext?.includes(searchData_SCL_FF.moreColumn.mandatoryValorization)) {
                availablibility = 1;
                break;
            }
        }
        if (availablibility == 0) {
            await this.helper.assertElementVisible(this.featureSCLPage.morecolumn, 'Extracoloum');
            await this.helper.clickElement(this.featureSCLPage.morecolumn, 'ExtraColoum');
            const count = await this.featureSCLPage.morecolumnOption.count();
            for (let i = 0; i < count; i++) {
                let coloumtext = await this.featureSCLPage.morecolumnOption.nth(i).textContent();
                if (coloumtext?.includes(searchData_SCL_FF.moreColumn.mandatoryValorization)) {
                    await this.helper.assertElementVisible(this.featureSCLPage.visibilitybutton.nth(i), 'visibilityBtn');
                    await this.helper.clickElement(this.featureSCLPage.visibilitybutton.nth(i), 'visibilityBtn');
                    await this.page.keyboard.press('Tab');
                    break;

                }
            }
        } else {
            console.log(`${searchData_SCL_FF.moreColumn.mandatoryValorization} is already visible`);
        }
    }

}