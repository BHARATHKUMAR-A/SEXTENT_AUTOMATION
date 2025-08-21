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
    assertElementVisible: (locator: any, name: string) => Promise<void>;
    assertElementEnabled: (locator: any, name: string) => Promise<void>;
    getRandomNumber: (locator: any, name: any) => Promise<number>;
    generateRandomManualCode: (length: number) => Promise<string>;
    generateRandomFeatureCode: (length: number) => Promise<string>;
    checkLocators: (formatLocator: Locator, availabilityLocator: any, validLocator: any) => Promise<boolean>
    clearText: (locator: Locator, label: string) => Promise<void>;
}

export class EditWPCSteps {
    private page: Page;
    private testInfo: TestInfo;
    private helper: StepHelper;
    private homePage: HomePage;
    private featureWPSPage: FeatureWPCPage;
    private selectRandomCode: Locator;
    private classCode: string;
    private code: string;
    private verifyEditMessage: Locator;
    private featureCode: string;
    private firstCodeFromList: Locator;

    constructor(page: Page, testInfo: TestInfo, stepHelper: StepHelper) {
        this.page = page;
        this.testInfo = testInfo;
        this.helper = stepHelper;
        this.homePage = new HomePage(page);
        this.featureWPSPage = new FeatureWPCPage(page);
        this.classCode = '';
        this.code = '';
        this.featureCode = '';
    }

    async navigateTo_edit_WPC_family_code() {
        await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
        await this.helper.clickElement(this.homePage.genericDict, 'genericDict');

        await this.helper.clickElement(this.homePage.createFamilyFeature, 'createFamilyFeature');
        await this.helper.clickElement(this.featureWPSPage.createWPCFamilyCode, 'createWPCFamilyCode');

        await this.helper.assertElementVisible(this.featureWPSPage.category, 'category');
        await this.helper.clickElement(this.featureWPSPage.category, 'category');

        await this.helper.clickElement(this.featureWPSPage.category_WPC_option, 'category_WPC_option');

        const selectedOption = testData_WPC_FF.testData.category_WPS_options;

        if (selectedOption === "CE - Enrichment") {
            await this.helper.assertElementVisible(this.featureWPSPage.businessType, '-businessType');
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

        const length = await this.helper.getRandomNumber(2, 3);
        const manualCode = await this.helper.generateRandomManualCode(length);
        this.code = manualCode;
        console.log(`Generated code: ${manualCode}`);
        await this.helper.enterText(this.featureWPSPage.manualCodeText, manualCode, 'manualCode');
       
        await this.helper.clickElement(this.featureWPSPage.checkCode, 'checkCode');

        await this.page.waitForTimeout(2000);

        while (true) {
            const result = await this.helper.checkLocators(this.featureWPSPage.format, this.featureWPSPage.availability, this.featureWPSPage.valid);
            if (result) {
                break;
            }
            else {
                this.featureCode = await this.helper.generateRandomManualCode(3);
                await this.helper.enterText(this.featureWPSPage.manualCodeText, this.featureCode, 'manualCode');
                await this.helper.clickElement(this.featureWPSPage.checkCode, 'checkManualCodeIcon');
                await this.page.waitForTimeout(5000);
            }
        }
        await this.helper.assertElementEnabled(this.featureWPSPage.nextButton_WPC, 'next button');
        await this.helper.clickElement(this.featureWPSPage.nextButton_WPC, 'next button');

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

        await this.helper.clickElement(this.featureWPSPage.save, 'save');
        await this.helper.clickElement(this.featureWPSPage.confirmation, 'confirmation');
        await this.helper.assertElementHasText(this.featureWPSPage.successMessage, 'SUCCESS', 'SUCCESS message displayed');

        if (selectedOption === "CI - Identification") {
            await this.helper.enterText(this.featureWPSPage.editLongDescription, testData_WPC_FF.editTestData.editLongDescription, 'editLongDescription');
            await this.helper.clickElement(this.featureWPSPage.copyLongDescription, 'copyText');
            await this.helper.enterText(this.featureWPSPage.editDescription, testData_WPC_FF.editTestData.editLongDescription, 'editLongDescription');
            await this.helper.clickElement(this.featureWPSPage.copyLongDescriptionIT, 'copyLongDescriptionIT');
        } else if (selectedOption === "CE - Enrichment") {
            await this.helper.enterText(this.featureWPSPage.editLongDescription, testData_WPC_FF.editTestData.editLongDescription, 'editLongDescription');
            await this.helper.clickElement(this.featureWPSPage.copyLongDescription, 'copyText');
            await this.helper.enterText(this.featureWPSPage.editDescription, testData_WPC_FF.editTestData.editLongDescription, 'editLongDescription');
            await this.helper.clickElement(this.featureWPSPage.copyLongDescriptionIT, 'copyLongDescriptionIT');
        } else if (selectedOption === "CC - Configuration") {
            await this.helper.enterText(this.featureWPSPage.editLongDescription, testData_WPC_FF.editTestData.editLongDescription, 'editLongDescription');
            await this.helper.clickElement(this.featureWPSPage.copyLongDescription, 'copyText');
            await this.helper.enterText(this.featureWPSPage.editDescription, testData_WPC_FF.editTestData.editLongDescription, 'editLongDescription');
            await this.helper.clickElement(this.featureWPSPage.copyLongDescriptionIT, 'copyLongDescriptionIT');
            await this.helper.enterText(this.featureWPSPage.editShortDesEN, testData_WPC_FF.editTestData.editShortDescription, 'editShortDesEN');
            await this.helper.clickElement(this.featureWPSPage.copyShortDescription, 'copyDescription');
        }

        await this.helper.clickElement(this.featureWPSPage.save, 'save');
        await this.helper.clickElement(this.featureWPSPage.confirmation, 'confirmation');

        const expectedEditMessage = `Edit WPC family ${manualCode} with success`;
        console.log(expectedEditMessage)
        this.verifyEditMessage = this.page.locator(`//p[contains(text(), 'Edit WPC family ${manualCode} with success')]`);

        await this.helper.assertElementHasText(this.verifyEditMessage, expectedEditMessage, "verifyEditMessage");

        await this.helper.clickElement(this.featureWPSPage.historyIcon, "historyIcon");

        const userId = this.featureWPSPage.editedUser.textContent();
        const date = this.featureWPSPage.editedDate.textContent();
        console.log("User Id : ", userId);
        console.log("Date : ", date);

        if (selectedOption === "CE - Enrichment") {
            await this.helper.assertElementHasText(this.featureWPSPage.oldMedDesIT, testData_WPC_FF.testData.longDescription, "oldMediumDescriptionIT");
            await this.helper.assertElementHasText(this.featureWPSPage.newMedDesIT, testData_WPC_FF.editTestData.editLongDescription, "newMediumDescriptionIT");
            await this.helper.assertElementHasText(this.featureWPSPage.oldLongDesIT, testData_WPC_FF.testData.longDescription, "oldLongDescriptionIT");
            await this.helper.assertElementHasText(this.featureWPSPage.newMedDesIT, testData_WPC_FF.editTestData.editLongDescription, "newLongDescriptionIT");

            await this.helper.assertElementHasText(this.featureWPSPage.oldMedDesEN, testData_WPC_FF.testData.longDescription, "oldMediumDescriptionEN");
            await this.helper.assertElementHasText(this.featureWPSPage.newMedDesEN, testData_WPC_FF.editTestData.editLongDescription, "newMediumDescriptionEN");
            await this.helper.assertElementHasText(this.featureWPSPage.oldLongDesEN, testData_WPC_FF.testData.longDescription, "oldLongDescriptionEN");
            await this.helper.assertElementHasText(this.featureWPSPage.newLongDesEN, testData_WPC_FF.editTestData.editLongDescription, "newLongDescriptionEN");
        }

        else if (selectedOption === "CI - Identification") {
            await this.helper.assertElementHasText(this.featureWPSPage.oldMedDesIT, testData_WPC_FF.testData.longDescription, "oldMediumDescriptionIT");
            await this.helper.assertElementHasText(this.featureWPSPage.newMedDesIT, testData_WPC_FF.editTestData.editLongDescription, "newMediumDescriptionIT");
            await this.helper.assertElementHasText(this.featureWPSPage.oldLongDesIT, testData_WPC_FF.testData.longDescription, "oldLongDescriptionIT");
            await this.helper.assertElementHasText(this.featureWPSPage.newMedDesIT, testData_WPC_FF.editTestData.editLongDescription, "newLongDescriptionIT");

            await this.helper.assertElementHasText(this.featureWPSPage.oldMedDesEN, testData_WPC_FF.testData.longDescription, "oldMediumDescriptionEN");
            await this.helper.assertElementHasText(this.featureWPSPage.newMedDesEN, testData_WPC_FF.editTestData.editLongDescription, "newMediumDescriptionEN");
            await this.helper.assertElementHasText(this.featureWPSPage.oldLongDesEN, testData_WPC_FF.testData.longDescription, "oldLongDescriptionEN");
            await this.helper.assertElementHasText(this.featureWPSPage.newLongDesEN, testData_WPC_FF.editTestData.editLongDescription, "newLongDescriptionEN");
        }

        else if (selectedOption === "CC - Configuration") {
            await this.helper.assertElementHasText(this.featureWPSPage.oldMedDesIT, testData_WPC_FF.testData.longDescription, "oldMediumDescriptionIT");
            await this.helper.assertElementHasText(this.featureWPSPage.newMedDesIT, testData_WPC_FF.editTestData.editLongDescription, "newMediumDescriptionIT");
            await this.helper.assertElementHasText(this.featureWPSPage.oldLongDesIT, testData_WPC_FF.testData.longDescription, "oldLongDescriptionIT");
            await this.helper.assertElementHasText(this.featureWPSPage.newMedDesIT, testData_WPC_FF.editTestData.editLongDescription, "newLongDescriptionIT");

            await this.helper.assertElementHasText(this.featureWPSPage.oldMedDesEN, testData_WPC_FF.testData.longDescription, "oldMediumDescriptionEN");
            await this.helper.assertElementHasText(this.featureWPSPage.newMedDesEN, testData_WPC_FF.editTestData.editLongDescription, "newMediumDescriptionEN");
            await this.helper.assertElementHasText(this.featureWPSPage.oldLongDesEN, testData_WPC_FF.testData.longDescription, "oldLongDescriptionEN");
            await this.helper.assertElementHasText(this.featureWPSPage.newLongDesEN, testData_WPC_FF.editTestData.editLongDescription, "newLongDescriptionEN");

            await this.helper.assertElementHasText(this.featureWPSPage.oldShortDesEN, testData_WPC_FF.testData.shortDescription, "oldShortDesEN");
            await this.helper.assertElementHasText(this.featureWPSPage.newShortDesEN, testData_WPC_FF.editTestData.editShortDescription, "newShortDesEN");
            await this.helper.assertElementHasText(this.featureWPSPage.oldShortDesIT, testData_WPC_FF.testData.shortDescription, "oldShortDesIT");
            await this.helper.assertElementHasText(this.featureWPSPage.newShortDesIT, testData_WPC_FF.editTestData.editShortDescription, "newShortDesIT");

        }

        await this.helper.clickElement(this.featureWPSPage.historyClose, "historyClose");
    }

    async navigateTo_edit_WPC_feature() {
        await this.helper.clickElement(this.homePage.createFeatureValue, 'createFeatureValue');
        await this.helper.clickElement(this.featureWPSPage.createWPCFeature, 'createWPCFeature');
        await this.helper.clickElement(this.featureWPSPage.familyCode_WPC, 'familyCode_WPC');
        await this.helper.enterText(this.featureWPSPage.familyCode_WPC, this.code, 'familyCode_WPC');
        await this.page.waitForTimeout(3000);

        this.firstCodeFromList = this.page.locator(`//mat-option/span[text()=' ${this.code} ']`);
        await this.helper.clickElement(this.firstCodeFromList, "firstCodeFromList");

        const selectedOption = testData_WPC_FF.testData.category_WPS_options;

        if (selectedOption === "CC - Configuration") {
            await this.helper.assertElementVisible(this.featureWPSPage.featurePackageType, 'featurePackageType');
            await this.helper.clickElementForcefully(this.featureWPSPage.featurePackageType, 'featurePackageType');
            await this.helper.clickElementForcefully(this.featureWPSPage.featurePackageTypeOption, 'featurePackageTypeOption');

            await this.helper.assertElementVisible(this.featureWPSPage.featureApplication, 'featureApplication');
            await this.helper.clickElementForcefully(this.featureWPSPage.featureApplication, 'featureApplication');
            await this.helper.clickElementForcefully(this.featureWPSPage.featureApplicationOption, 'featureApplicationOption');
        }

        while (true) {
            const result = await this.helper.checkLocators(this.featureWPSPage.format, this.featureWPSPage.availability, this.featureWPSPage.valid);
            if (result) {
                break;
            }
            else {
                this.featureCode = await this.helper.generateRandomFeatureCode(3);
                await this.helper.enterText(this.featureWPSPage.featureCodeTextbox, this.featureCode, 'manualCodeInput')
                await this.helper.clickElement(this.featureWPSPage.checkCode, 'checkManualCodeIcon');
                await this.page.waitForTimeout(5000);
            }
        }
        await this.helper.clickElement(this.featureWPSPage.nextButton_WPC, 'next button');

        if (selectedOption === "CC - Configuration") {
            await this.helper.assertElementVisible(this.featureWPSPage.featureBusinessType, 'featureBusinessType');
            await this.helper.clickElement(this.featureWPSPage.featureBusinessType, 'featureBusinessType');
            await this.helper.clickElement(this.featureWPSPage.featureBusinessTypeOption, 'featureBusinessTypeOption');

            await this.helper.assertElementVisible(this.featureWPSPage.longDescription, 'longDescription');
            await this.helper.enterText(this.featureWPSPage.longDescription, testData_WPC_FF.testData.longDescription, 'longDescription');

            await this.helper.assertElementVisible(this.featureWPSPage.copyLongDescription, 'copyLongDescription');
            await this.helper.clickElement(this.featureWPSPage.copyLongDescription, 'copyLongDescription');

            await this.helper.enterText(this.featureWPSPage.shortDescription, testData_WPC_FF.testData.shortDescription, 'shortDescription');
            await this.helper.clickElement(this.featureWPSPage.shortDescription, 'shortDescription');

            await this.helper.assertElementVisible(this.featureWPSPage.copyShortDescription, 'copyShortDescription');
            await this.helper.clickElement(this.featureWPSPage.copyShortDescription, 'copyShortDescription');

        }

        if (selectedOption === "CI - Identification") {
            // catch No suggestion code message
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
        if (selectedOption === "CE - Enrichment") {
            await this.helper.assertElementVisible(this.featureWPSPage.longDescription, 'longDescription');
            await this.helper.enterText(this.featureWPSPage.longDescription, testData_WPC_FF.testData.longDescription, 'longDescription');
            await this.helper.clickElement(this.featureWPSPage.copyLongDescription, 'copyLongDescription');

        }

        await this.helper.clickElement(this.featureWPSPage.save, 'save');
        await this.helper.clickElement(this.featureWPSPage.confirmation, 'confirmation');
        await this.helper.assertElementHasText(this.featureWPSPage.successMessage, 'SUCCESS', 'SUCCESS message displayed');

        if (selectedOption === "CI - Identification") {
            // await this.helper.enterText(this.featureWPSPage.editFeatureLongDescriptionIT, testData_WPC_FF.editTestData.editLongDescription, 'editLongDescription');
            // await this.helper.clickElement(this.featureWPSPage.copyLongDescription, 'copyLongDescription');

            // await this.helper.enterText(this.featureWPSPage.editFeatureLongDescriptionEN, testData_WPC_FF.editTestData.editLongDescription, 'editLongDescription');
            // await this.helper.clickElement(this.featureWPSPage.copyLongDescriptionIT, 'copyLongDescriptionIT');

        } else if (selectedOption === "CE - Enrichment") {
            await this.helper.enterText(this.featureWPSPage.editFeatureLongDescriptionIT, testData_WPC_FF.editTestData.editLongDescription, 'editLongDescription');
            await this.helper.clickElement(this.featureWPSPage.copyLongDescription, 'copyLongDescription');

            await this.helper.enterText(this.featureWPSPage.editFeatureLongDescriptionEN, testData_WPC_FF.editTestData.editLongDescription, 'editLongDescription');
            await this.helper.clickElement(this.featureWPSPage.copyLongDescriptionIT, 'copyLongDescriptionIT');

        }
        else if (selectedOption === "CC - Configuration") {
            await this.helper.enterText(this.featureWPSPage.editFeatureLongDescriptionIT, testData_WPC_FF.editTestData.editLongDescription, 'editLongDescription');
            await this.helper.clickElement(this.featureWPSPage.copyLongDescription, 'copyLongDescription');

            await this.helper.enterText(this.featureWPSPage.editFeatureLongDescriptionEN, testData_WPC_FF.editTestData.editLongDescription, 'editLongDescription');
            await this.helper.clickElement(this.featureWPSPage.copyLongDescriptionIT, 'copyLongDescriptionIT');

            await this.helper.enterText(this.featureWPSPage.editFeatureShortDescriptionEN, testData_WPC_FF.editTestData.editShortDescription, 'editShortDescription');
            await this.helper.clickElement(this.featureWPSPage.copyShortDescription, 'copyShortDescription');
        }

        await this.helper.clickElement(this.featureWPSPage.save, 'save');
        await this.helper.clickElement(this.featureWPSPage.confirmation, 'confirmation');

        const expectedEditMessage = `Edit WPC feature ${this.featureCode} with success`;
        console.log("Expected message - ", expectedEditMessage);
        this.verifyEditMessage = this.page.locator(`//p[contains(text(), 'Edit WPC feature ${this.featureCode} with success')]`);

        await this.helper.assertElementHasText(this.verifyEditMessage, expectedEditMessage, "verifyEditMessage");

        await this.helper.clickElement(this.featureWPSPage.historyIcon, "historyIcon");

        const userId = this.featureWPSPage.editedUser.textContent();
        const date = this.featureWPSPage.editedDate.textContent();
        console.log("User Id : ", userId);
        console.log("Date : ", date);

        if (selectedOption === "CE - Enrichment") {
            await this.helper.assertElementHasText(this.featureWPSPage.oldMedDesIT, testData_WPC_FF.testData.longDescription, "oldMediumDescriptionIT");
            await this.helper.assertElementHasText(this.featureWPSPage.newMedDesIT, testData_WPC_FF.editTestData.editLongDescription, "newMediumDescriptionIT");
            await this.helper.assertElementHasText(this.featureWPSPage.oldLongDesIT, testData_WPC_FF.testData.longDescription, "oldLongDescriptionIT");
            await this.helper.assertElementHasText(this.featureWPSPage.newMedDesIT, testData_WPC_FF.editTestData.editLongDescription, "newLongDescriptionIT");

            await this.helper.assertElementHasText(this.featureWPSPage.oldMedDesEN, testData_WPC_FF.testData.longDescription, "oldMediumDescriptionEN");
            await this.helper.assertElementHasText(this.featureWPSPage.newMedDesEN, testData_WPC_FF.editTestData.editLongDescription, "newMediumDescriptionEN");
            await this.helper.assertElementHasText(this.featureWPSPage.oldLongDesEN, testData_WPC_FF.testData.longDescription, "oldLongDescriptionEN");
            await this.helper.assertElementHasText(this.featureWPSPage.newLongDesEN, testData_WPC_FF.editTestData.editLongDescription, "newLongDescriptionEN");
        }

        else if (selectedOption === "CC - Configuration") {
            await this.helper.assertElementHasText(this.featureWPSPage.oldMedDesIT, testData_WPC_FF.testData.longDescription, "oldMediumDescriptionIT");
            await this.helper.assertElementHasText(this.featureWPSPage.newMedDesIT, testData_WPC_FF.editTestData.editLongDescription, "newMediumDescriptionIT");
            await this.helper.assertElementHasText(this.featureWPSPage.oldLongDesIT, testData_WPC_FF.testData.longDescription, "oldLongDescriptionIT");
            await this.helper.assertElementHasText(this.featureWPSPage.newMedDesIT, testData_WPC_FF.editTestData.editLongDescription, "newLongDescriptionIT");

            await this.helper.assertElementHasText(this.featureWPSPage.oldMedDesEN, testData_WPC_FF.testData.longDescription, "oldMediumDescriptionEN");
            await this.helper.assertElementHasText(this.featureWPSPage.newMedDesEN, testData_WPC_FF.editTestData.editLongDescription, "newMediumDescriptionEN");
            await this.helper.assertElementHasText(this.featureWPSPage.oldLongDesEN, testData_WPC_FF.testData.longDescription, "oldLongDescriptionEN");
            await this.helper.assertElementHasText(this.featureWPSPage.newLongDesEN, testData_WPC_FF.editTestData.editLongDescription, "newLongDescriptionEN");

            await this.helper.assertElementHasText(this.featureWPSPage.oldShortDesEN, testData_WPC_FF.testData.shortDescription, "oldShortDesEN");
            await this.helper.assertElementHasText(this.featureWPSPage.newShortDesEN, testData_WPC_FF.editTestData.editShortDescription, "newShortDesEN");
            await this.helper.assertElementHasText(this.featureWPSPage.oldShortDesIT, testData_WPC_FF.testData.shortDescription, "oldShortDesIT");
            await this.helper.assertElementHasText(this.featureWPSPage.newShortDesIT, testData_WPC_FF.editTestData.editShortDescription, "newShortDesIT");
        }

        await this.helper.clickElement(this.featureWPSPage.historyClose, "historyClose");

    }
}