import { Locator, Page, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { attachment } from 'allure-js-commons';
import { HierarchySearchSTVPage } from '../pages/hierarchySearchSTVPage'
import { log } from 'node:console';


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
    // codeLength: () => Promise<number>;
    // assertTextboxValue: (locator: Locator, expectedValue: string, label: string) => Promise<void>;
    generateRandomFeatureCode: (length: number) => Promise<string>;
}
export class EditFeatureSTVSteps {
    private page: Page;
    private testInfo: TestInfo;
    private helper: StepHelper;
    private homePage: HomePage;
    // private genericSTVPage: GenericSTVPage;
    private hierarchySearchSTVPage: HierarchySearchSTVPage;



    //constructor to initialize the objects
    constructor(page: Page, testInfo: TestInfo, stepHelper: StepHelper) {
        this.page = page;
        this.testInfo = testInfo;
        this.helper = stepHelper;
        this.homePage = new HomePage(page);
        // this.genericSTVPage = new GenericSTVPage(page);
        this.hierarchySearchSTVPage = new HierarchySearchSTVPage(page);

    }

    async searchHierarchySTVStructureEdit() {
 
        //navigate to Generic Dictionary
        await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
        await this.helper.clickElement(this.homePage.genericDict, 'genericDict');
 
        //navigate to search tab
        await this.helper.assertElementVisible(this.homePage.search, 'searchTab');
        await this.helper.clickElement(this.homePage.search, 'searchTab');
 
        //select hierarchy radio
        await this.helper.assertElementVisible(this.hierarchySearchSTVPage.hierarchyRadio, "Hierarchy Radio");
        await this.helper.clickElement(this.hierarchySearchSTVPage.hierarchyRadio, "Hierarchy Radio");
 
        //click on structure dropdown
        await this.helper.assertElementVisible(this.hierarchySearchSTVPage.structureDropdown, "Structure dropdown");
        await this.helper.clickElement(this.hierarchySearchSTVPage.structureDropdown, "Structure dropdown");
 
        //uncheck wpc, stv structures
        await this.helper.assertElementVisible(this.hierarchySearchSTVPage.stvStructure, "STV structure");
        await this.helper.clickElement(this.hierarchySearchSTVPage.stvStructure, "STV structure");
        await this.helper.clickElement(this.hierarchySearchSTVPage.wpcStructure, "WPC structure");
 
        await this.page.keyboard.press("Tab");
        /*
                //enter description
                await this.helper.assertElementVisible(this.hierarchySearchSTVPage.displayArrowDown, "displayArrowDown");
                await this.helper.clickElement(this.hierarchySearchSTVPage.displayArrowDown, "displayArrowDown");
       
                // this.page.waitForTimeout(5000);
                await this.helper.assertElementVisible(this.hierarchySearchSTVPage.multiStructurePanel, "multiStructurePanel");
                await this.helper.clickElement(this.hierarchySearchSTVPage.multiStructurePanel, "multiStructurePanel");
       
                await this.helper.assertElementVisible(this.hierarchySearchSTVPage.description, "Description");
                await this.helper.clickElement(this.hierarchySearchSTVPage.description, "Description");
                await this.helper.enterText(this.hierarchySearchSTVPage.description, "Test", "Description");
       
                await this.page.keyboard.press("Enter");
        */
        //click on search
        await this.helper.assertElementVisible(this.hierarchySearchSTVPage.searchIcon, "Search icon");
        await this.helper.clickElement(this.hierarchySearchSTVPage.searchIcon, "Search icon");
 
        //get text from 1st row
        let featureValue = await this.hierarchySearchSTVPage.featureValue.textContent();
        console.log("STV Feature Value : ", featureValue);
        attachment("STV Feature Value", `${featureValue}`, "text/plain");
 
        //fetch description
        let description = await this.hierarchySearchSTVPage.firstRowDescription.textContent();
        console.log("STV Feature Description : ", description);
        attachment("STV Feature Description ", `${description}`, "text/plain");
 
        const hasTest = description?.toLowerCase().includes("test");
 
        //verify description
        if (hasTest) {
            console.log("The description contains 'test'.");
            attachment("Description", "The description contains 'test'.", "text/plain");
        }
 
        // Click first row from table
        await this.helper.assertElementVisible(this.hierarchySearchSTVPage.featureValue, "Feature Value of first row");
        await this.helper.clickElement(this.hierarchySearchSTVPage.featureValue, "Feature Value of first row");
 
        // Wait for buttons to appear
        await this.page.waitForTimeout(5000);
 
        // Get count of buttons
        const count = await this.hierarchySearchSTVPage.countOfButton.count();
 
        if (count == 0) {
            throw new Error("No buttons found. Check if the locator is correct or if the page has loaded properly.");
        }
 
        // Get a random button index
        const randomBtn = await this.helper.getRandomNumber(1, count);
 
        // Click the randomly selected button
        const button = this.page.locator(`(//mat-icon[text()='edit_outline'])[${randomBtn}]`);
        await this.helper.clickElement(button, "Random Edit Button");
 
        await this.page.waitForTimeout(2000);
        // Verify feature code
        const actualValue = await this.hierarchySearchSTVPage.featureFamilyCode.innerText();
        console.log(actualValue);
        attachment('Actual Value', `${actualValue}`, 'text/plain');
 
 
        const parts = actualValue.split('-');
 
        // Extract class code part and get the number
        const classCode = parts[0].split(':')[1].trim();
 
        if (featureValue == classCode) {
            console.log("Feature value", featureValue, "Verified");
            attachment("Feature Value", `Feature value ${featureValue} Verified`, "text/plain");
        } else {
            throw new Error(`Feature value mismatch: Expected ${featureValue}, but got ${classCode}`);
        }
 
    }
}