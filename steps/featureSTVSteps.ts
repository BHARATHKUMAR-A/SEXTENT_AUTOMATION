import { Locator, Page, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { FeatureSTVPage } from '../pages/featureSTVPage';
import testData_STV_FF from '../test-data/testData_STV_FF.json';
import { log } from 'console';
import { attachment } from 'allure-js-commons';
import { text } from 'stream/consumers';
 
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
}
 
export class FeatureSTVSteps {
    private page: Page;
    private testInfo: TestInfo;
    private helper: StepHelper;
    private homePage: HomePage;
    private featureSTVPage: FeatureSTVPage;
    private selectRandomCode: Locator;
    private classCode: string;
    private salesCode: string;
 
    //constructor to initialize the objects
    constructor(page: Page, testInfo: TestInfo, stepHelper: StepHelper) {
        this.page = page;
        this.testInfo = testInfo;
        this.helper = stepHelper;
        this.homePage = new HomePage(page);
        this.featureSTVPage = new FeatureSTVPage(page);
        this.classCode = '';
        this.salesCode='';
    }
 
    //Creating STV class code flow
    async navigateTo_create_STV_class_code() {
 
        //navigate to Generic Dictionary
        await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
        await this.helper.clickElement(this.homePage.genericDict, 'genericDict');
 
        //go to create STV Class Code
        await this.helper.clickElement(this.homePage.createFamilyFeature, 'createFamilyFeature');
        await this.helper.clickElement(this.featureSTVPage.createSTVClassCode, 'createSTVClassCode');
       
        // Verify Next button is disabled
        const nextButtonDisabled = await this.helper.assertElementDisabled(this.featureSTVPage.nextButton, "Next button");
 
        while (nextButtonDisabled) {
            // Search for code
            await this.helper.assertElementEnabled(this.featureSTVPage.manualCode, 'manualCode');
            await this.helper.clickElement(this.featureSTVPage.manualCode, 'manualCode');
            await this.helper.clickElement(this.featureSTVPage.searchCode, 'searchCode');
 
            // Generate random number for row and column
            const rowNumber = await this.helper.getRandomNumber(1, 2);
            const colmNumber = await this.helper.getRandomNumber(1, 15);
 
            // Create dynamic locator
            this.selectRandomCode = this.page.locator(`//div[@class='code-suggestion-table']//table//tr[1]//td[1]`);
            // this.selectRandomCode = this.page.locator(`//div[@class='code-suggestion-table']//table//tr[${rowNumber}]//td[${colmNumber}]`);

            const classCodeText = await this.selectRandomCode.textContent();
            this.classCode = classCodeText?.trim() ?? '';
 
            let classCode1 = `STV Class code ${this.classCode} is Selected`;
            await attachment('class code',classCode1,'text/plain');

            await this.helper.clickElement(this.selectRandomCode, 'selectRandomCode');
 
            // Validate that Next button is still disabled
            const nextButtonStillDisabled = await this.helper.assertElementDisabled(this.featureSTVPage.nextButton, "Next button");
            if (!nextButtonStillDisabled) {
                break; // Exit the loop if Next button is enabled
            }
        }
 
        //click on Next button
        await this.helper.clickElement(this.featureSTVPage.nextButton_WPC, 'nextButton');
 
        // Verify Save button is disabled
        const saveButtonDisabled = await this.helper.assertElementDisabled(this.featureSTVPage.saveBtn, "Save button");
 
        while (saveButtonDisabled) {
            // Enter description control
            await this.helper.assertElementVisible(this.featureSTVPage.descriptionControl, "descriptionControl");
            await this.helper.enterText(this.featureSTVPage.descriptionControl, testData_STV_FF.testData.description, "descriptionControl");
 
            // Select typology
            await this.helper.assertElementVisible(this.featureSTVPage.typology, "typology");
            await this.helper.clickElement(this.featureSTVPage.typology, "typology");
            await this.helper.clickElement(this.featureSTVPage.typologyOptions, "typologyOptions");
 
            // Select category
            await this.helper.assertElementVisible(this.featureSTVPage.category, "category");
            await this.helper.clickElement(this.featureSTVPage.category, "category");
            await this.helper.clickElement(this.featureSTVPage.categoryOptions, "categoryOptions");
 
            // Select item type
            await this.helper.assertElementVisible(this.featureSTVPage.itemType, "itemType");
            await this.helper.clickElement(this.featureSTVPage.itemType, "itemType");
            await this.helper.clickElement(this.featureSTVPage.itemTypeOption, "itemTypeOption");
 
            // Select responsible group
            await this.helper.assertElementVisible(this.featureSTVPage.responsibleGroup, "responsibleGroup");
            await this.helper.clickElement(this.featureSTVPage.responsibleGroup, "responsibleGroup");
            await this.helper.clickElement(this.featureSTVPage.responsibleGroupOption, "responsibleGroupOption");
 
            // Select VPM if typology is "O - Only One"
            if (testData_STV_FF.testData.typology === "O - Only One") {
                await this.helper.assertElementVisible(this.featureSTVPage.vpm, "vpm");
                await this.helper.clickElement(this.featureSTVPage.vpm, "vpm");
                await this.helper.clickElement(this.featureSTVPage.vpmOption, "vpmOption");
            }
 
            // Enter explicative note
            await this.helper.assertElementVisible(this.featureSTVPage.explicativeNote, "explicativeNote");
            await this.helper.enterText(this.featureSTVPage.explicativeNote, testData_STV_FF.testData.explicativeNote, "explicativeNote");
 
            // Validate that Save button is still disabled
            const saveButtonStillDisabled = await this.helper.assertElementDisabled(this.featureSTVPage.saveBtn, "Save button");
            if (!saveButtonStillDisabled) {
                break; // Exit the loop if Save button is enabled
            }
        }
 
        //click on save and confirm
        await this.helper.clickElement(this.featureSTVPage.save, 'save');
        await this.helper.assertElementVisible(this.featureSTVPage.confirmation, 'Confirmation');
        await this.helper.clickElement(this.featureSTVPage.confirmation, 'confirmation');
 
        //verify SUCCESS message
        await this.helper.assertElementHasText(this.featureSTVPage.successMessage, 'SUCCESS', 'SUCCESS message displayed');
 
        return this.classCode;
    }
   
    async navigateTo_create_STV_sales_code() {
 
        // go to create STV code
        await this.helper.clickElement(this.homePage.createFeatureValue, 'createFeatureValue');
        await this.helper.assertElementVisible(this.featureSTVPage.createSTVSalesCode, 'createSTVSalesCode');
        await this.helper.clickElement(this.featureSTVPage.createSTVSalesCode, 'createSTVSalesCode');
 
        //verify next button is disable
        const nextButtonDisabled = await this.helper.assertElementDisabled(this.featureSTVPage.nextButton, "Next button");
 
        while (nextButtonDisabled) {
            // Search for code
            await this.helper.assertElementEnabled(this.featureSTVPage.manualCode, 'manualCode');
            await this.helper.clickElement(this.featureSTVPage.manualCode, 'manualCode');
            await this.helper.clickElement(this.featureSTVPage.searchCode, 'searchCode');
 
            // Generate random number for row and column
            const rowNumber = await this.helper.getRandomNumber(1, 5);
            const colmNumber = await this.helper.getRandomNumber(1, 20);
 
            // Create dynamic locator
            this.selectRandomCode = this.page.locator(`//div[@class='code-suggestion-table']//table//tr[${rowNumber}]//td[${colmNumber}]`);
            // this.selectRandomCode = this.page.locator(`//div[@class='code-suggestion-table']//table//tr[1]//td[1]`);
            const classCodeText = await this.selectRandomCode.textContent();
            this.classCode = classCodeText?.trim() ?? '';
 
            let classCode = `STV Class code , ${this.classCode},  is Selected`
            console.log(classCode);
            attachment('Feature family column Visibility',classCode,'text/plain');
           
 
            await this.helper.clickElement(this.selectRandomCode, 'selectRandomCode');
 
            // Validate that Next button is still disabled
            const nextButtonStillDisabled = await this.helper.assertElementDisabled(this.featureSTVPage.nextButton, "Next button");
            if (!nextButtonStillDisabled) {
                break; // Exit the loop if Next button is enabled
            }
        }
 
        // Verify Validate button is disabled
        const validateButtonDisabled = await this.helper.assertElementDisabled(this.featureSTVPage.validateButton, "Validate button");
 
        while (validateButtonDisabled) {
            // Click Next button
            await this.helper.clickElement(this.featureSTVPage.nextButton_WPC, 'nextButton_WPC');
 
            // Enter sales description
            await this.helper.assertElementVisible(this.featureSTVPage.salesCodeDescription, "salesCodeDescription");
            await this.helper.enterText(this.featureSTVPage.salesCodeDescription, testData_STV_FF.testData.salesCodeDescription, "salesCodeDescription");
 
            // Select application
            await this.helper.assertElementVisible(this.featureSTVPage.application, "application");
            await this.helper.clickElement(this.featureSTVPage.application, "application");
            await this.helper.clickElement(this.featureSTVPage.applicationOption, "applicationOption");
 
            // Enter explicative note
            await this.helper.assertElementVisible(this.featureSTVPage.explicativeNote, "explicativeNote");
            await this.helper.enterText(this.featureSTVPage.explicativeNote, testData_STV_FF.testData.explicativeNote, "explicativeNote");
 
            // Validate that Validate button is still disabled
            const validateButtonStillDisabled = await this.helper.assertElementDisabled(this.featureSTVPage.validateButton, "Validate button");
            if (!validateButtonStillDisabled) {
                break; // Exit the loop if Validate button is enabled
            }
        }
 
        // Click Validate button
        await this.helper.clickElement(this.featureSTVPage.validateButton, 'Validate');
 
        // await this.helper.clickElement(this.featureSTVPage.validateBtn, 'Validate');
        await this.helper.clickElement(this.featureSTVPage.confirmation, 'confirmation');
        await this.helper.assertElementHasText(this.featureSTVPage.successMessage, 'SUCCESS', 'SUCCESS message displayed');

        return this.classCode;
    }

    async navigateTo_create_STV_sales_code_new() {
 
        // go to create STV code
        await this.helper.clickElement(this.homePage.createFeatureValue, 'createFeatureValue');
        await this.helper.assertElementVisible(this.featureSTVPage.createSTVSalesCode, 'createSTVSalesCode');
        await this.helper.clickElement(this.featureSTVPage.createSTVSalesCode, 'createSTVSalesCode');
 
        //verify next button is disable
        const nextButtonDisabled = await this.helper.assertElementDisabled(this.featureSTVPage.nextButton, "Next button");
 
        while (nextButtonDisabled) {
 
            //chryselle added
            await this.helper.enterText(this.featureSTVPage.salesCode_STV,this.classCode,'STVSalesCode')
           
            await this.page.waitForTimeout(3000);      
            await this.helper.clickElement(this.featureSTVPage.firstOption, 'firstOption');
 
            // Search for code
            await this.helper.assertElementEnabled(this.featureSTVPage.manualCode, 'manualCode');
            await this.helper.clickElement(this.featureSTVPage.manualCode, 'manualCode');
            await this.helper.clickElement(this.featureSTVPage.searchCode, 'searchCode');
 
            // Generate random number for row and column
            const rowNumber = await this.helper.getRandomNumber(1, 5);
            const colmNumber = await this.helper.getRandomNumber(1, 20);
 
            // Create dynamic locator
            this.selectRandomCode = this.page.locator(`//div[@class='code-suggestion-table']//table//tr[${rowNumber}]//td[${colmNumber}]`);
            // this.selectRandomCode = this.page.locator(`//div[@class='code-suggestion-table']//table//tr[1]//td[1]`);

            const classCodeText = await this.selectRandomCode.textContent();
            this.classCode = classCodeText?.trim() ?? '';
 
           let classCode1 = `STV Class code , ${this.classCode}, is Selected`
           console.log(classCode1);
           attachment("class code",classCode1,"text/plain");
           
 
            await this.helper.clickElement(this.selectRandomCode, 'selectRandomCode');
 
            // Validate that Next button is still disabled
            const nextButtonStillDisabled = await this.helper.assertElementDisabled(this.featureSTVPage.nextButton, "Next button");
            if (!nextButtonStillDisabled) {
                break; // Exit the loop if Next button is enabled
            }
        }
 
        // Verify Validate button is disabled
        const validateButtonDisabled = await this.helper.assertElementDisabled(this.featureSTVPage.validateButton, "Validate button");
 
        while (validateButtonDisabled) {
            // Click Next button
            await this.helper.clickElement(this.featureSTVPage.nextButton_WPC, 'nextButton_WPC');
 
            // Enter sales description
            await this.helper.assertElementVisible(this.featureSTVPage.salesCodeDescription, "salesCodeDescription");
            await this.helper.enterText(this.featureSTVPage.salesCodeDescription, testData_STV_FF.testData.salesCodeDescription, "salesCodeDescription");
 
            // Select application
            await this.helper.assertElementVisible(this.featureSTVPage.application, "application");
            await this.helper.clickElement(this.featureSTVPage.application, "application");
            await this.helper.clickElement(this.featureSTVPage.applicationOption, "applicationOption");
 
            // Enter explicative note
            await this.helper.assertElementVisible(this.featureSTVPage.explicativeNote, "explicativeNote");
            await this.helper.enterText(this.featureSTVPage.explicativeNote, testData_STV_FF.testData.explicativeNote, "explicativeNote");
 
            // Validate that Validate button is still disabled
            const validateButtonStillDisabled = await this.helper.assertElementDisabled(this.featureSTVPage.validateButton, "Validate button");
            if (!validateButtonStillDisabled) {
                break; // Exit the loop if Validate button is enabled
            }
        }
 
        // Click Validate button
        await this.helper.clickElement(this.featureSTVPage.validateButton, 'Validate');
 
        // await this.helper.clickElement(this.featureSTVPage.validateBtn, 'Validate');
        await this.helper.clickElement(this.featureSTVPage.confirmation, 'confirmation');
        await this.helper.assertElementHasText(this.featureSTVPage.successMessage, 'SUCCESS', 'SUCCESS message displayed');
 
        return this.classCode;
    }
 
}