import { Locator, Page, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { GenericSCLPage } from '../pages/genericSCLPage';
import testData_SCL_FF from '../test-data/testData_SCL_FF.json';
import { attachment } from 'allure-js-commons';
import { HierarchySearchPage } from '../pages/hierarchySearchPage'
import { allure } from 'allure-playwright';

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
    generateRandomFeatureCode: (length: number) => Promise<string>;
}
export class EditFeatureSCLSteps {
    private page: Page;
    private testInfo: TestInfo;
    private helper: StepHelper;
    private homePage: HomePage;
    private genericSCLPage: GenericSCLPage;
    private hierarchySearchPage: HierarchySearchPage;



    //constructor to initialize the objects
    constructor(page: Page, testInfo: TestInfo, stepHelper: StepHelper) {
        this.page = page;
        this.testInfo = testInfo;
        this.helper = stepHelper;
        this.homePage = new HomePage(page);
        this.genericSCLPage = new GenericSCLPage(page);
        this.hierarchySearchPage = new HierarchySearchPage(page);

    }

    async searchHierarchySCLStructureEdit() {

        //navigate to Generic Dictionary
        await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
        await this.helper.clickElement(this.homePage.genericDict, 'genericDict');

        //navigate to search tab
        await this.helper.assertElementVisible(this.homePage.search, 'searchTab');
        await this.helper.clickElement(this.homePage.search, 'searchTab');

        //select hierarchy radio
        await this.helper.assertElementVisible(this.hierarchySearchPage.hierarchyRadio, "Hierarchy Radio");
        await this.helper.clickElement(this.hierarchySearchPage.hierarchyRadio, "Hierarchy Radio");

        //click on structure dropdown
        await this.helper.assertElementVisible(this.hierarchySearchPage.structureDropdown, "Structure dropdown");
        await this.helper.clickElement(this.hierarchySearchPage.structureDropdown, "Structure dropdown");

        //uncheck wpc, stv structures
        await this.helper.assertElementVisible(this.hierarchySearchPage.stvStructure, "STV structure");
        await this.helper.clickElement(this.hierarchySearchPage.stvStructure, "STV structure");
        await this.helper.clickElement(this.hierarchySearchPage.wpcStructure, "WPC structure");

        await this.page.keyboard.press("Tab");

        //enter description
        await this.helper.assertElementVisible(this.hierarchySearchPage.displayArrowDown, "displayArrowDown");
        await this.helper.clickElement(this.hierarchySearchPage.displayArrowDown, "displayArrowDown");

        // this.page.waitForTimeout(5000);
        await this.helper.assertElementVisible(this.hierarchySearchPage.multiStructurePanel, "multiStructurePanel");
        await this.helper.clickElement(this.hierarchySearchPage.multiStructurePanel, "multiStructurePanel");

        await this.helper.assertElementVisible(this.hierarchySearchPage.description, "Description");
        await this.helper.clickElement(this.hierarchySearchPage.description, "Description");
        await this.helper.enterText(this.hierarchySearchPage.description, "Test", "Description");

        await this.page.keyboard.press("Enter");

        //click on search
        await this.helper.assertElementVisible(this.hierarchySearchPage.searchIcon, "Search icon");
        await this.helper.clickElement(this.hierarchySearchPage.searchIcon, "Search icon");

        //get text from 1st row
        let featureValue = await this.hierarchySearchPage.featureValue.textContent();
        console.log("SCL Feature Value : ", featureValue);
        attachment("SCL Feature Value", `${featureValue}`, "text/plain");

        //fetch description
        let description = await this.hierarchySearchPage.firstRowDescription.textContent();
        console.log("SCL Feature Description : ", description);
        attachment("SCL Feature Description ", `${description}`, "text/plain");

        const hasTest = description?.toLowerCase().includes("test");

        //verify description
        if (hasTest) {
            console.log("The description contains 'test'.");
            attachment("Description", "The description contains 'test'.", "text/plain");
        }

        // Click first row from table
        await this.helper.assertElementVisible(this.hierarchySearchPage.featureValue, "Feature Value of first row");
        await this.helper.clickElement(this.hierarchySearchPage.featureValue, "Feature Value of first row");

        // Wait for buttons to appear
        await this.page.waitForTimeout(5000);

        // Get count of buttons
        const count = await this.hierarchySearchPage.countOfButton.count();
        
        if (count === 0) {
            throw new Error("No buttons found. Check if the locator is correct or if the page has loaded properly.");
        }

        // Get a random button index
        const randomBtn = await this.helper.getRandomNumber(1, count); 
        
        // Click the randomly selected button
        const button = this.page.locator(`(//mat-icon[text()='edit_outline'])[${randomBtn}]`);
        await this.helper.clickElement(button, "Random Edit Button");

        // Verify feature code
        const actualValue = await this.hierarchySearchPage.featureFamilyCode.inputValue();
        if (featureValue == actualValue) {
            console.log("Feature value", featureValue, "Verified");
            attachment("Feature Value", `Feature value ${featureValue} Verified`, "text/plain");
        } else {
            console.log("Feature value", featureValue, "is mismatched!");
            
            console.log("Expected:", featureValue, "Actual:", actualValue);
            attachment("Feature Value Expected and Actual",`Expected: ${featureValue} Actual: ${actualValue}`,"text/plain");
        }
    }
}