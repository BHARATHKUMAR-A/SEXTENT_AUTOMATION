import { Locator, Page, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { FeatureWPCPage } from '../pages/featureWPCPage';
import testData_WPC_FF from '../test-data/testData_WPC_FF.json';
 
interface TestInfo {
    [key: string]: any;
}
 
interface StepHelper {
    clickElement: (locator: any, name: string) => Promise<void>;
    clickElementForcefully: (locator: any, name: string) => Promise<void>;
    enterText: (locator: any, value: string, name: string) => Promise<void>;
    assertElementHasText: (locator: any, expectedText: string, message: string) => Promise<void>;
    assertElementDisabled: (locator: any, name: string) => Promise<boolean>;
    assertElementVisible: (locator: any, name: string) => Promise<void>;
    getRandomNumber: (locator: any, name: any) => Promise<number>;
}
 
export class FeatureWPCSteps {
    private page: Page;
    private testInfo: TestInfo;
    private helper: StepHelper;
    private homePage: HomePage;
    private featureWPSPage: FeatureWPCPage;
    private selectRandomCode: Locator;
    private classCode: string;
    private firstCodeFromList: Locator;
    private classCodeFeatureValue: string;
    private selectRandomCodeFeatureValue: Locator;
    private category : string;
 
    constructor(page: Page, testInfo: TestInfo, stepHelper: StepHelper) {
        this.page = page;
        this.testInfo = testInfo;
        this.helper = stepHelper;
        this.homePage = new HomePage(page);
        this.featureWPSPage = new FeatureWPCPage(page);
        this.classCode = '';
        this.classCodeFeatureValue = '';
        this.category ='';
    }
 
    async navigateTo_create_WPC_family_code(category) {
        await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
        await this.helper.clickElement(this.homePage.genericDict, 'genericDict');
 
        await this.helper.clickElement(this.homePage.createFamilyFeature, 'createFamilyFeature');
        await this.helper.clickElement(this.featureWPSPage.createWPCFamilyCode, 'createWPCFamilyCode');
 
        // Verify Next button is disabled
        const nextButtonDisabled = await this.helper.assertElementDisabled(this.featureWPSPage.nextButton, "Next button");
 
        // const selectedOption = testData_WPC_FF.testData.category_WPS_options;
        const selectedOption = category;
 
        while (nextButtonDisabled) {
            await this.helper.assertElementVisible(this.featureWPSPage.category, 'category');
            await this.helper.clickElement(this.featureWPSPage.category, 'category');
 
            await this.helper.clickElement(this.featureWPSPage.category_WPC_option, 'category_WPC_option');
 
            if (selectedOption === "CE - Enrichment") {
                await this.helper.assertElementVisible(this.featureWPSPage.businessType, 'businessType');
                await this.helper.clickElement(this.featureWPSPage.businessType, 'businessType');
                await this.helper.clickElement(this.featureWPSPage.businessType_WPS_option, 'businessType_WPS_option');
            }
            else if (selectedOption === "CC - Configuration") {
                await this.helper.assertElementVisible(this.featureWPSPage.typologyType_WPS, 'typologyType_WPS');
                await this.helper.clickElement(this.featureWPSPage.typologyType_WPS, 'typologyType_WPS');
                await this.helper.clickElement(this.featureWPSPage.typologyType_WPS_option, 'typologyType_WPS_option');
 
                await this.helper.assertElementVisible(this.featureWPSPage.businessType, 'businessType');
                await this.helper.clickElement(this.featureWPSPage.businessType, 'businessType');
                await this.helper.clickElement(this.featureWPSPage.businessType_WPS_option, 'businessType_WPS_option');
            }
 
            await this.helper.clickElement(this.featureWPSPage.manualCode_WPC, 'manualCode_WPC');
            await this.helper.clickElement(this.featureWPSPage.searchCode, 'searchCode');
 
            //generate random number for row and column
            const rowNumber = await this.helper.getRandomNumber(1, 5);
            const colmNumber = await this.helper.getRandomNumber(1, 20);
 
            //create dynamic locator
            this.selectRandomCode = this.page.locator(`//div[@class='code-suggestion-table']//table//tr[${rowNumber}]//td[${colmNumber}]`);
            const classCodeText = await this.selectRandomCode.textContent();
            this.classCode = classCodeText?.trim() ?? '';
 
            console.log("WPC family code ", this.classCode, " is Selected");
            await this.helper.clickElement(this.selectRandomCode, 'selectRandomCode');
 
            this.page.waitForTimeout(2000);
            // Validate that Next button is still disabled
            const nextButtonStillDisabled = await this.helper.assertElementDisabled(this.featureWPSPage.nextButton, "Next button");
            if (!nextButtonStillDisabled) {
                break; // Exit the loop if Next button is enabled
            }
        }
        await this.helper.clickElement(this.featureWPSPage.nextButton_WPC, 'nextButton_WPC');
 
         // Verify Save button is disabled
         const saveButtonDisabled = await this.helper.assertElementDisabled(this.featureWPSPage.saveBtn, "Save button");
 
        while (saveButtonDisabled) {
        if (selectedOption === "CI - Identification") {
            await this.helper.enterText(this.featureWPSPage.featureCodeLength, testData_WPC_FF.testData.featureCodeLength, 'featureCodeLength');
            await this.helper.enterText(this.featureWPSPage.longDescription, testData_WPC_FF.testData.longDescription, 'longDescription');
            await this.helper.clickElement(this.featureWPSPage.copyLongDescription, 'copyText');
        } else if (selectedOption === "CE - Enrichment") {
            await this.helper.enterText(this.featureWPSPage.longDescription, testData_WPC_FF.testData.longDescription, 'longDescription');
            await this.helper.clickElement(this.featureWPSPage.copyLongDescription, 'copyText');
        } else if (selectedOption === "CC - Configuration") {
            await this.helper.clickElement(this.featureWPSPage.subType, 'subType');
            await this.helper.clickElement(this.featureWPSPage.subTypeOption, 'subTypeOption');
            await this.helper.enterText(this.featureWPSPage.longDescription, testData_WPC_FF.testData.longDescription, 'longDescription');
            await this.helper.clickElement(this.featureWPSPage.copyLongDescription, 'copyText');
            await this.helper.enterText(this.featureWPSPage.shortDescription, testData_WPC_FF.testData.shortDescription, 'shortDescription');
            await this.helper.clickElement(this.featureWPSPage.copyShortDescription, 'copyDescription');
        }
 
        this.page.waitForTimeout(2000);
        // Validate that Save button is still disabled
        const saveButtonStillDisabled = await this.helper.assertElementDisabled(this.featureWPSPage.saveBtn, "Save button");
        if (!saveButtonStillDisabled) {
            break; // Exit the loop if Save button is enabled
        }
    }
 
        await this.helper.clickElement(this.featureWPSPage.save, 'save');
        await this.helper.clickElement(this.featureWPSPage.confirmation, 'confirmation');
        try {
            const failedToCreateWPCText = await this.featureWPSPage.failedToCreateWPC.isVisible({ timeout: 3000 });
            if (failedToCreateWPCText) {
                console.log("ERROR: Create WPC family failed");
                return;
            }
        }
        catch (error) {
            console.log(error);
        }
 
        try {
            const failedFeatureAlreadyExistsText = await this.featureWPSPage.failedFeatureAlreadyExists.isVisible({ timeout: 3000 });
            if (failedFeatureAlreadyExistsText) {
                console.log("ERROR: WPC Feature Code  exist");
                return;
            }
        }
        catch (error) {
            console.log(error);
        }
        await this.helper.assertElementHasText(this.featureWPSPage.successMessage, 'SUCCESS', 'SUCCESS message displayed');
 
        return this.classCode;
    }
 
    async navigateTo_create_WPC_feature(category) {
        
        await this.helper.clickElement(this.homePage.createFeatureValue, 'createFeatureValue');
        await this.helper.clickElement(this.featureWPSPage.createWPCFeature, 'createWPCFeature');
        await this.helper.clickElement(this.featureWPSPage.familyCode_WPC, 'familyCode_WPC');
        await this.helper.enterText(this.featureWPSPage.familyCode_WPC, this.classCode, 'familyCode_WPC');
        await this.page.waitForTimeout(3000);
 
        this.firstCodeFromList = this.page.locator(`//mat-option/span[text()=' ${this.classCode} ']`);
        await this.helper.clickElement(this.firstCodeFromList, "firstCodeFromList");
 
        const selectedOption = category;
 
 
        if (selectedOption === "CC - Configuration") {
            await this.helper.assertElementVisible(this.featureWPSPage.featurePackageType, 'featurePackageType');
            await this.helper.clickElementForcefully(this.featureWPSPage.featurePackageType, 'featurePackageType');
            await this.helper.clickElementForcefully(this.featureWPSPage.featurePackageTypeOption, 'featurePackageTypeOption');
 
            await this.helper.assertElementVisible(this.featureWPSPage.featureApplication, 'featureApplication');
            await this.helper.clickElementForcefully(this.featureWPSPage.featureApplication, 'featureApplication');
            await this.helper.clickElementForcefully(this.featureWPSPage.featureApplicationOption, 'featureApplicationOption');
        }
 
        await this.helper.clickElement(this.featureWPSPage.manualCode_WPC, 'manualCode_WPC');
        await this.helper.clickElement(this.featureWPSPage.searchCode, 'searchCode');
        if (selectedOption === "CI - Identification") {
            //catch  the error message
            try {
                const noSuggestionCodeText = await this.featureWPSPage.noSuggestionCode.isVisible({ timeout: 5000 });
                if (noSuggestionCodeText) {
                    console.log("ERROR: Code suggestion error");
                    return;
                }
            }
            catch (error) {
                console.log(error);
            }
        }
 
        //generate random number for row and column
        const rowNumber = await this.helper.getRandomNumber(1, 5);
        const colmNumber = await this.helper.getRandomNumber(1, 20);
 
        //create dynamic locator
        this.selectRandomCodeFeatureValue = this.page.locator(`//div[@class='code-suggestion-table']//table//tr[${rowNumber}]//td[${colmNumber}]`);
        const classCodeText = await this.selectRandomCodeFeatureValue.textContent();
        this.classCodeFeatureValue = classCodeText?.trim() ?? '';
 
        console.log("WPC Sales code ", this.classCodeFeatureValue, " is Selected");
 
        await this.helper.clickElement(this.selectRandomCodeFeatureValue, 'selectRandomCode');
        await this.helper.clickElement(this.featureWPSPage.nextButton_WPC, 'nextButton_WPC');
 
        if (selectedOption === "CE - Enrichment") {
 
            await this.helper.assertElementVisible(this.featureWPSPage.longDescription, 'longDescription');
            await this.helper.enterText(this.featureWPSPage.longDescription, testData_WPC_FF.testData.longDescription, 'longDescription');
 
            await this.helper.assertElementVisible(this.featureWPSPage.copyLongDescription, 'copyLongDescription');
            await this.helper.clickElement(this.featureWPSPage.copyLongDescription, 'copyLongDescription');
 
        }
        if (selectedOption === "CC - Configuration") {
            await this.helper.assertElementVisible(this.featureWPSPage.featureBusinessType, 'featureBusinessType');
            await this.helper.clickElement(this.featureWPSPage.featureBusinessType, 'featureBusinessType');
            await this.helper.clickElement(this.featureWPSPage.featureBusinessTypeOption, 'featureBusinessTypeOption');
 
            await this.helper.assertElementVisible(this.featureWPSPage.longDescription, 'longDescription');
            await this.helper.enterText(this.featureWPSPage.longDescription, testData_WPC_FF.testData.longDescription, 'longDescription');
 
            await this.helper.assertElementVisible(this.featureWPSPage.copyLongDescription, 'copyLongDescription');
            await this.helper.clickElement(this.featureWPSPage.copyLongDescription, 'copyLongDescription');
 
            await this.helper.enterText(this.featureWPSPage.shortDescription, testData_WPC_FF.testData.shortDescription, 'shortDescription');
            await this.helper.clickElement(this.featureWPSPage.copyShortDescription, 'copyShortDescription');
        }
 
        await this.helper.clickElement(this.featureWPSPage.save, 'save');
        await this.helper.clickElement(this.featureWPSPage.confirmation, 'confirmation');
        try {
            const failedToCreateWPCText = await this.featureWPSPage.failedToCreateWPC.isVisible({ timeout: 5000 });
            if (failedToCreateWPCText) {
                console.log("ERROR: Create WPC family failed");
                return;
            }
        }
        catch (error) {
            console.log(error);
        }
        await this.helper.assertElementHasText(this.featureWPSPage.successMessage, 'SUCCESS', 'SUCCESS message displayed');
        return  this.classCodeFeatureValue;
    }

     async navigateTo_create_WPC_feature_new(category) {
        await this.helper.clickElement(this.homePage.createFeatureValue, 'createFeatureValue');
        await this.helper.clickElement(this.featureWPSPage.createWPCFeature, 'createWPCFeature');
        await this.helper.clickElement(this.featureWPSPage.familyCode_WPC, 'familyCode_WPC');
        await this.helper.enterText(this.featureWPSPage.familyCode_WPC, this.classCode, 'familyCode_WPC');
        //await this.helper.enterText(this.featureWPSPage.familyCode_WPC, '0Y', 'familyCode_WPC');
        //added
        await this.page.waitForTimeout(3000);      
        // await this.helper.clickElement(this.featureWPSPage.firstOption, 'firstOption');
 
        await this.page.waitForTimeout(3000);
       
 
        this.firstCodeFromList = this.page.locator(`//mat-option/span[text()=' ${this.classCode} ']`);
        await this.helper.clickElement(this.firstCodeFromList, "firstCodeFromList");
 
        const selectedOption = category;
 
 
        if (selectedOption === "CC - Configuration") {
            await this.helper.assertElementVisible(this.featureWPSPage.featurePackageType, 'featurePackageType');
            await this.helper.clickElementForcefully(this.featureWPSPage.featurePackageType, 'featurePackageType');
            await this.helper.clickElementForcefully(this.featureWPSPage.featurePackageTypeOption, 'featurePackageTypeOption');
 
            await this.helper.assertElementVisible(this.featureWPSPage.featureApplication, 'featureApplication');
            await this.helper.clickElementForcefully(this.featureWPSPage.featureApplication, 'featureApplication');
            await this.helper.clickElementForcefully(this.featureWPSPage.featureApplicationOption, 'featureApplicationOption');
        }
 
        await this.helper.clickElement(this.featureWPSPage.manualCode_WPC, 'manualCode_WPC');
        await this.helper.clickElement(this.featureWPSPage.searchCode, 'searchCode');
        if (selectedOption === "CI - Identification") {
            //catch  the error message
            try {
                const noSuggestionCodeText = await this.featureWPSPage.noSuggestionCode.isVisible({ timeout: 5000 });
                if (noSuggestionCodeText) {
                    console.log("ERROR: Code suggestion error");
                    return;
                }
            }
            catch (error) {
                console.log(error);
            }
        }
 
        //generate random number for row and column
        const rowNumber = await this.helper.getRandomNumber(1, 5);
        const colmNumber = await this.helper.getRandomNumber(1, 20);
 
        //create dynamic locator
        this.selectRandomCodeFeatureValue = this.page.locator(`//div[@class='code-suggestion-table']//table//tr[${rowNumber}]//td[${colmNumber}]`);
        const classCodeText = await this.selectRandomCodeFeatureValue.textContent();
        this.classCodeFeatureValue = classCodeText?.trim() ?? '';
 
        console.log("WPC Sales code ", this.classCodeFeatureValue, " is Selected");
 
        await this.helper.clickElement(this.selectRandomCodeFeatureValue, 'selectRandomCode');
        await this.helper.clickElement(this.featureWPSPage.nextButton_WPC, 'nextButton_WPC');
 
        if (selectedOption === "CE - Enrichment") {
 
            await this.helper.assertElementVisible(this.featureWPSPage.longDescription, 'longDescription');
            await this.helper.enterText(this.featureWPSPage.longDescription, testData_WPC_FF.testData.longDescription, 'longDescription');
 
            await this.helper.assertElementVisible(this.featureWPSPage.copyLongDescription, 'copyLongDescription');
            await this.helper.clickElement(this.featureWPSPage.copyLongDescription, 'copyLongDescription');
 
        }
        if (selectedOption === "CC - Configuration") {
            await this.helper.assertElementVisible(this.featureWPSPage.featureBusinessType, 'featureBusinessType');
            await this.helper.clickElement(this.featureWPSPage.featureBusinessType, 'featureBusinessType');
            await this.helper.clickElement(this.featureWPSPage.featureBusinessTypeOption, 'featureBusinessTypeOption');
 
            await this.helper.assertElementVisible(this.featureWPSPage.longDescription, 'longDescription');
            await this.helper.enterText(this.featureWPSPage.longDescription, testData_WPC_FF.testData.longDescription, 'longDescription');
 
            await this.helper.assertElementVisible(this.featureWPSPage.copyLongDescription, 'copyLongDescription');
            await this.helper.clickElement(this.featureWPSPage.copyLongDescription, 'copyLongDescription');
 
            await this.helper.enterText(this.featureWPSPage.shortDescription, testData_WPC_FF.testData.shortDescription, 'shortDescription');
            await this.helper.clickElement(this.featureWPSPage.copyShortDescription, 'copyShortDescription');
        }
 
        await this.helper.clickElement(this.featureWPSPage.save, 'save');
        await this.helper.clickElement(this.featureWPSPage.confirmation, 'confirmation');
        try {
            const failedToCreateWPCText = await this.featureWPSPage.failedToCreateWPC.isVisible({ timeout: 5000 });
            if (failedToCreateWPCText) {
                console.log("ERROR: Create WPC family failed");
                return;
            }
        }
        catch (error) {
            console.log(error);
        }
        await this.helper.assertElementHasText(this.featureWPSPage.successMessage, 'SUCCESS', 'SUCCESS message displayed');
 
        return this.classCodeFeatureValue;
 
       
    }
}