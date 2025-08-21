import { Locator, Page, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { FeatureTransverseSearchPage } from '../pages/featureTransverseSearchPage';
import testData_SCL_FF from '../test-data/testData_SCL_FF.json';
import { FeatureSCLPage } from '../pages/featureSCLPage';
import { TIMEOUT } from 'dns/promises';
import { error } from 'console';

interface TestInfo {
    [key: string]: any;

}
var shortDescriptionText;
var otherDescShortDescText
var singleFeatureValueDescriptionText;
var localizedDescriptionText;

//common function imported from step helper
interface StepHelper {
    clickElement: (locator: any, name: string) => Promise<void>;
    clickElementForcefully: (locator: any, name: string) => Promise<void>;
    enterText: (locator: any, value: string, name: string) => Promise<void>;
    assertElementHasText: (locator: any, expectedText: string, message: string) => Promise<void>;
    assertElementHasInputValues: (locator: any, expectedText: string, message: string) => Promise<void>;
    assertElementVisible: (locator: any, name: string) => Promise<void>;
    assertElementEnabled: (locator: any, name: string) => Promise<void>;
    assertElementDisabled: (locator: any, name: string) => Promise<boolean>;
    getRandomNumber: (locator: any, name: any) => Promise<number>;
    isRadioButtonSelected: (Locator: any) => Promise<boolean>;
    doubleClickElement: (locator: any, name: string) => Promise<void>;
    clearText: (locator: any, name: string) => Promise<void>;
    generateRandomText: (value: any) => Promise<string>;
    generateRandomManualCode: (length: number) => Promise<string>;
    selectDropdownByIndex: (locator: any, index: number) => Promise<void>;
    assertElementTextContainedIn: (locator: any, expectedText: string, message: string) => Promise<void>;
    clickByJs: (page: Page, text: string) => Promise<void>
}

export class FeatureTransversalSearchSteps {
    private page: Page;
    private testInfo: TestInfo;
    private helper: StepHelper;
    private homePage: HomePage;
    private featureTransverseSearchPage: FeatureTransverseSearchPage;
    private selectRandomCode: Locator;
    private classCode: string;
    private familyCode: string;
    private rankingOptionLocator: Locator;
    private rankingOption: string;
    private scl_familyCode: string;
    private firstClassCode: Locator;
    private featureFamily: Locator;
    private featureSCLPage: FeatureSCLPage;
    private verifyEditMessage: Locator;
    private featureCode: string | null;
    private firstCodeFromList: Locator;

    //constructor to initialize the objects
    constructor(page: Page, testInfo: TestInfo, stepHelper: StepHelper) {
        this.page = page;
        this.testInfo = testInfo;
        this.helper = stepHelper;
        this.homePage = new HomePage(page);
        this.featureTransverseSearchPage = new FeatureTransverseSearchPage(page);
        this.featureSCLPage = new FeatureSCLPage(page);
        this.classCode = '';
        this.rankingOption = '';
        this.familyCode = '';
        this.scl_familyCode = '';
        this.featureCode = '';
    }

    //search transvers model pack

    async search_transverse_model_pack(transversalCode) {

        //navigate to transversal model pack
        await this.helper.assertElementVisible(this.homePage.searchTransversalModel, "searchTransversalModel");
        await this.helper.clickElement(this.homePage.searchTransversalModel, "searchTransversalModel");

        //enter transversal model pack
        await this.helper.assertElementVisible(this.featureTransverseSearchPage.transversalModelInput, "searchTransversalModelInputBox");
        await this.helper.enterText(this.featureTransverseSearchPage.transversalModelInput, transversalCode, "transversalCode");
        await this.page.keyboard.press('Enter');


        // Wait for the search results table to appear
        await this.featureTransverseSearchPage.searchTable.waitFor({ state: 'visible', timeout: 10000 });
        await this.page.waitForTimeout(6000);

        // Ensure the search icon is visible and click it
        await this.helper.assertElementVisible(this.featureTransverseSearchPage.searchIcon, "Search Icon");
        await this.helper.clickElement(this.featureTransverseSearchPage.searchIcon, "Search Icon");

        // Extract class and sales codes
        const classCode = transversalCode.slice(0, 3);
        const salesCode = transversalCode.slice(3);


        // Scroll and search logic
        let maxScrollAttempts = 50;
        let scrollAttempts = 0;
        let classCodeFound = false;

        while (scrollAttempts < maxScrollAttempts) {
            const elements = await this.page.locator("//mat-row[contains(@class,'expanded-element-row')]//mat-cell[contains(@class,'packFamilyCode ')]//div//a//span").all();

            for (const element of elements) {
                const text = await element.textContent();
                if (text && text.trim() === classCode) {
                    console.log(`${classCode} found in the list!`);
                    classCodeFound = true;
                    break;
                }

            }

            if (classCodeFound) break;

            // Scroll down slightly
            await this.page.evaluate(() => {
                const viewport = document.querySelector('#wrapper-table > cdk-virtual-scroll-viewport');
                if (viewport) {
                    viewport.scrollBy({ top: 200, behavior: 'auto' });
                }
            });

            await this.page.waitForTimeout(500);
            scrollAttempts++;
        }

        if (!classCodeFound) {
            console.log(`${classCode} not found after scrolling.`);
            throw new Error("Class code not found in the table.");
        }

    }



    async create_transversal_SCL_feature_family(classCode, familyCode, transversalModelCount) {

        //navigate to Generic Dictionary
        await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
        await this.helper.clickElement(this.homePage.genericDict, 'genericDict');

        //go to create SCL feature family 
        await this.helper.clickElement(this.homePage.createFamilyFeature, 'createFamilyFeature');
        await this.helper.assertElementVisible(this.featureSCLPage.createSCLFeature, 'createSCLFeature');
        await this.helper.clickElement(this.featureSCLPage.createSCLFeature, 'createSCLFeature');

        // Verify Next button is disabled
        const nextButtonDisabled = await this.helper.assertElementDisabled(this.featureSCLPage.nextBtn, "Next button");

        while (nextButtonDisabled) {

            // select Nature
            await this.helper.assertElementVisible(this.featureSCLPage.natureDropdown, "natureDropdown");
            await this.helper.clickElement(this.featureSCLPage.natureDropdown, "natureDropdown");
            await this.helper.clickElement(this.featureSCLPage.transversalNatureOptions, "transversalNatureOptions");

            // select feature family type
            await this.helper.assertElementVisible(this.featureSCLPage.featureFamilyType, "feature_family_type");
            await this.helper.clickElement(this.featureSCLPage.featureFamilyType, "feature_family_type");
            await this.helper.clickElement(this.featureSCLPage.transversalFeatureFamilyTypeOption, "transversalFeatureFamilyTypeOption");

            // select specific sales range
            const isRadioChecked = await this.featureSCLPage.radioChecked.isVisible();
            if (!isRadioChecked) {
                await this.helper.clickElement(this.featureSCLPage.radioSSR, "specificSalesRangeRadio");
                console.log(`Specific sales range is selected as ${testData_SCL_FF.testData.specific_sales_range}`);
            }
            else {
                console.log("Specific sales range is already selected. ");
            }

            // Search for code
            await this.helper.assertElementEnabled(this.featureSCLPage.manualCode, 'manualCode');
            await this.helper.clickElement(this.featureSCLPage.manualCode, 'manualCode');
            await this.helper.assertElementVisible(this.featureSCLPage.searchCode, 'searchCode');
            await this.helper.clickElement(this.featureSCLPage.searchCode, 'searchCode');

            // Generate random number for row and column
            const rowNumber = await this.helper.getRandomNumber(1, 2);
            const colmNumber = await this.helper.getRandomNumber(1, 10);

            // Create dynamic locator
            // this.selectRandomCode = this.page.locator(`//div[@class='code-suggestion-table']//table//tr[1]//td[1]`);
            this.selectRandomCode = this.page.locator(`//div[@class='code-suggestion-table']//table//tr[${rowNumber}]//td[${colmNumber}]`);

            const classCodeText = await this.selectRandomCode.textContent();
            this.scl_familyCode = classCodeText?.trim() ?? '';

            console.log("SCL Class code ", this.scl_familyCode, " is Selected");

            await this.helper.clickElement(this.selectRandomCode, 'selectRandomCode');

            // Validate that Next button is still disabled
            this.page.waitForTimeout(3000);
            const nextButtonStillDisabled = await this.helper.assertElementDisabled(this.featureSCLPage.nextBtn, "Next button");
            if (!nextButtonStillDisabled) {
                break; // Exit the loop if Next button is enabled
            } //if

            //non- mandatory data fields

        } //while


        // click on Next button
        await this.helper.clickElement(this.featureSCLPage.nextBtn, "Next button");

        // Verify Next button is disabled
        const isNextButtonDisabled = await this.helper.assertElementDisabled(this.featureSCLPage.secondPageNextBtn, "Next button");

        while (isNextButtonDisabled) {

            // ensure the ranking dropdown is visible and click it
            await this.helper.assertElementVisible(this.featureSCLPage.rankingDropdown, "ranking dropdown");
            await this.helper.clickElement(this.featureSCLPage.rankingDropdown, "ranking dropdown");

            // get ranking value from test data
            const ranking = testData_SCL_FF.testData.ranking;

            // handle different ranking values
            switch (ranking) {
                case 'test shali 1':
                case 'AAA':
                case '3.4':
                case 'ranking 05':
                case 'ranking 0':
                case 'Ranking 02':
                case '123':
                case '3.3':
                case 'newranking':
                case 'z':

                    // Select ranking option directly
                    await this.featureSCLPage.rankingOption.isVisible({ timeout: 3000 });
                    await this.helper.clickElement(this.featureSCLPage.rankingOption, ranking);
                    console.log(`${ranking} is selected`);
                    break;

                case 'Ranking 001':
                case '04 - test':
                case 'testRefresh':
                case 'Raking 01':

                    // Handle elements under ranking 0
                    this.rankingOption = 'ranking 0';
                    this.rankingOptionLocator = this.page.locator(`//span[text()=' ${this.rankingOption} ']//parent::mat-option//preceding-sibling::button/span/following-sibling::mat-icon`);
                    await this.helper.clickElement(this.rankingOptionLocator, "rankingOptionLocatorDropdown");
                    await this.helper.clickElement(this.featureSCLPage.rankingOption, ranking);
                    console.log(`${ranking} is selected`);
                    break;

                case 'to del':

                    // Handle elements under Ranking 02
                    this.rankingOption = 'Ranking 02';
                    this.rankingOptionLocator = this.page.locator(`//span[text()=' ${this.rankingOption} ']//parent::mat-option//preceding-sibling::button/span/following-sibling::mat-icon`);
                    await this.helper.clickElement(this.rankingOptionLocator, "rankingOptionLocatorDropdown");
                    await this.helper.clickElement(this.featureSCLPage.rankingOption, ranking);
                    console.log(`${ranking} is selected`);
                    break;

                case 'Test 123':

                    // Handle elements under 123
                    this.rankingOption = '123';
                    this.rankingOptionLocator = this.page.locator(`(//span[text()=' ${this.rankingOption} ']//parent::mat-option//preceding-sibling::button/span/following-sibling::mat-icon)[1]`);
                    await this.helper.clickElement(this.rankingOptionLocator, "rankingOptionLocatorDropdown");
                    await this.helper.clickElement(this.featureSCLPage.rankingOption, ranking);
                    console.log(`${ranking} is selected`);
                    break;

                case 'child1':

                    // Handle elements under 123
                    this.rankingOption = '123';
                    this.rankingOptionLocator = this.page.locator(`(//span[text()=' ${this.rankingOption} ']//parent::mat-option//preceding-sibling::button/span/following-sibling::mat-icon)[2]`);
                    await this.helper.clickElement(this.rankingOptionLocator, "rankingOptionLocatorDropdown");
                    await this.helper.clickElement(this.featureSCLPage.rankingOption, ranking);
                    console.log(`${ranking} is selected`);
                    break;

                case 'newranking2':

                    // Handle elements under newranking
                    this.rankingOption = 'newranking';
                    this.rankingOptionLocator = this.page.locator(`//span[text()=' ${this.rankingOption} ']//parent::mat-option//preceding-sibling::button/span/following-sibling::mat-icon`);
                    await this.helper.clickElement(this.rankingOptionLocator, "rankingOptionLocatorDropdown");
                    await this.helper.clickElement(this.featureSCLPage.rankingOption, ranking);
                    console.log(`${ranking} is selected`);
                    break;

                case 'zz':

                    // Handle elements under z
                    this.rankingOption = 'z';
                    this.rankingOptionLocator = this.page.locator(`//span[text()=' ${this.rankingOption} ']//parent::mat-option//preceding-sibling::button/span/following-sibling::mat-icon`);
                    await this.helper.clickElement(this.rankingOptionLocator, "rankingOptionLocatorDropdown");
                    await this.helper.clickElement(this.featureSCLPage.rankingOption, ranking);
                    console.log(`${ranking} is selected`);
                    break;

                case 'zzz':

                    // Handle elements under zzz
                    this.rankingOption = 'z';
                    this.rankingOptionLocator = this.page.locator(`//span[text()=' ${this.rankingOption} ']//parent::mat-option//preceding-sibling::button/span/following-sibling::mat-icon`);
                    await this.helper.clickElement(this.rankingOptionLocator, "rankingOptionLocatorDropdown");
                    this.rankingOption = 'zz';
                    this.rankingOptionLocator = this.page.locator(`//span[text()=' ${this.rankingOption} ']//parent::mat-option//preceding-sibling::button/span/following-sibling::mat-icon`);
                    await this.helper.clickElement(this.rankingOptionLocator, "rankingOptionLocatorNestedDropdown");
                    await this.helper.clickElement(this.featureSCLPage.rankingOption, ranking);
                    console.log(`${ranking} is selected`);
                    break;

                case 'S-03-02':

                    // Handle elements under S-03-02
                    this.rankingOption = '3.3';
                    this.rankingOptionLocator = this.page.locator(`//span[text()=' ${this.rankingOption} ']//parent::mat-option//preceding-sibling::button/span/following-sibling::mat-icon`);
                    await this.helper.clickElement(this.rankingOptionLocator, "rankingOptionLocatorDropdown");
                    this.rankingOption = 'Test 123';
                    this.rankingOptionLocator = this.page.locator(`//span[text()=' ${this.rankingOption} ']//parent::mat-option//preceding-sibling::button/span/following-sibling::mat-icon`);
                    await this.helper.clickElement(this.rankingOptionLocator, "rankingOptionLocatorNestedDropdown");
                    await this.helper.clickElement(this.featureSCLPage.rankingOption, ranking);
                    console.log(`${ranking} is selected`);
                    break;

                case 'Ranking 002':

                    // Handle elements under Ranking 002
                    this.rankingOption = 'ranking 0';
                    this.rankingOptionLocator = this.page.locator(`//span[text()=' ${this.rankingOption} ']//parent::mat-option//preceding-sibling::button/span/following-sibling::mat-icon`);
                    await this.helper.clickElement(this.rankingOptionLocator, "rankingOptionLocatorDropdown");
                    this.rankingOption = 'Raking 01';
                    this.rankingOptionLocator = this.page.locator(`//span[text()=' ${this.rankingOption} ']//parent::mat-option//preceding-sibling::button/span/following-sibling::mat-icon`);
                    await this.helper.clickElement(this.rankingOptionLocator, "rankingOptionLocatorNestedDropdown");
                    await this.helper.clickElement(this.featureSCLPage.rankingOption, ranking);
                    console.log(`${ranking} is selected`);
                    break;

                default:
                    console.log(`Ranking ${ranking} is not recognized.`);
                    break;
            }

            //select feature categories
            await this.helper.assertElementVisible(this.featureSCLPage.featureFamilyCategories, "feature_family_categories");
            await this.helper.clickElement(this.featureSCLPage.featureFamilyCategories, "feature_family_categories");
            await this.helper.clickElement(this.featureSCLPage.featureFamilyCategoriesOption, "feature_family_categories_option");
            await this.page.keyboard.press('Tab');

            // select confidentiality radio
            await this.helper.assertElementVisible(this.featureSCLPage.confidentialRadioBtn, "Confidential Radio Button");
            await this.helper.clickElement(this.featureSCLPage.confidentialRadioBtn, "ConfidentialRadioBtn");

            //prohibited date
            const today = new Date();

            // Extract day, month, and year
            const day = String(today.getDate()).padStart(2, '0');
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const year = today.getFullYear();

            // Format the date as dd/mm/yyyy
            const formattedDate = `${day}/${month}/${year}`;

            console.log(`Prohibited date is: ${formattedDate}`);
            await this.helper.assertElementVisible(this.featureSCLPage.prohibitedDate, "prohibitedDate");
            await this.helper.enterText(this.featureSCLPage.prohibitedDate, formattedDate, "prohibitedDate");

            // // select Si Explicit
            // await this.helper.assertElementVisible(this.featureSCLPage.siExplicit, "Si_Explicit");
            // await this.helper.clickElement(this.featureSCLPage.siExplicit, "Si_Explicit");
            // await this.helper.clickElement(this.featureSCLPage.siExplicitOption, "Si_Explicit_Option");
            // await this.page.keyboard.press('Tab');

            // // select Si Exclusive
            // await this.helper.assertElementVisible(this.featureSCLPage.siExclusion, "Si_Explicit");
            // await this.helper.clickElement(this.featureSCLPage.siExclusion, "Si_Explicit");
            // await this.helper.clickElement(this.featureSCLPage.siExclusionOption, "Si_Explicit_Option");
            // await this.page.keyboard.press('Tab');

            // // select mandatory with structure
            // await this.helper.assertElementVisible(this.featureSCLPage.mandatoryWithStructure, "Mandatory_with_Structure");
            // await this.helper.clickElement(this.featureSCLPage.mandatoryWithStructure, "Mandatory_with_Structure");
            // await this.helper.clickElement(this.featureSCLPage.mandatoryWithStructureOption, "mandatory_with_Structure_Option");
            // await this.page.keyboard.press('Tab');

            // // select mandatory with responsibilities
            // await this.helper.assertElementVisible(this.featureSCLPage.mandatoryWithResponsibility, "Mandatory_with_Responsibility");
            // await this.helper.clickElement(this.featureSCLPage.mandatoryWithResponsibility, "Mandatory_with_Responsibility");
            // await this.helper.clickElement(this.featureSCLPage.mandatoryWithResponsibilityOption, "mandatory_with_Responsibilty_Option");

            // enter description
            localizedDescriptionText = `${testData_SCL_FF.testData.localizedDescription}_${await this.helper.generateRandomText(3)}`;
            await this.helper.assertElementVisible(this.featureSCLPage.localizedDescriptionEn, "localizedDescriptionEn");
            await this.helper.enterText(this.featureSCLPage.localizedDescriptionEn, localizedDescriptionText, "localizedDescriptionEn");

            //enter explicative description
            await this.helper.assertElementVisible(this.featureSCLPage.explicativeNotes, "explicativeNotes");
            await this.helper.enterText(this.featureSCLPage.explicativeNotes, testData_SCL_FF.testData.localizedDescription, "explicativeNotes");

            //enter other description
            if (await this.featureSCLPage.otherDescription.isVisible()) {
                await this.helper.enterText(this.featureSCLPage.otherDescription, testData_SCL_FF.testData.localizedDescription, "otherDescription");
            }

            if (await this.featureSCLPage.otherDescXF.isVisible()) {
                await this.helper.enterText(this.featureSCLPage.otherDescXF, testData_SCL_FF.testData.localizedDescription, "otherDescription");

            }
            //System
            await this.helper.clickElement(this.featureSCLPage.systemDropdown, "System dropdown");
            await this.helper.clickElement(this.featureSCLPage.systemOption, "SystemOption");

            // Validate that Next button is still disabled
            const isSavingWithoutMappinglDisabled = await this.helper.assertElementDisabled(this.featureSCLPage.savingWithoutMapping, "Next button");
            if (!isSavingWithoutMappinglDisabled) {
                break;
            } //if

        } //while

        // click on SavingWithoutMappingl button
        await this.helper.clickElement(this.featureSCLPage.savingWithoutMapping, "savingWithoutMapping button");

        //click on confirmation
        await this.featureSCLPage.confirmationBtn.waitFor({ state: 'visible' });
        await this.helper.clickElement(this.featureSCLPage.confirmationBtn, 'confirmation')

        //verify Error
        if (await this.featureSCLPage.transversalError.isVisible()) {
            console.log("Throwing Transversal error due to Transversal Description' is set to 'Yes', it should be 'No' ");
        }

        //transversal description
        await this.helper.assertElementVisible(this.featureSCLPage.transversalDescription, "transversalDescription");
        await this.helper.clickElement(this.featureSCLPage.transversalDescription, "transversalDescription");

        // click on SavingWithoutMappingl button
        await this.helper.clickElement(this.featureSCLPage.savingWithoutMapping, "savingWithoutMapping button");

        //click on confirmation
        await this.featureSCLPage.confirmationBtn.waitFor({ state: 'visible' });
        await this.helper.clickElement(this.featureSCLPage.confirmationBtn, 'confirmation');

        //validate SUCCESS message
        await this.helper.assertElementHasText(this.featureSCLPage.successMessage, 'SUCCESS', 'SUCCESS message displayed');

        //click on featuevalues tab
        await this.helper.assertElementVisible(this.featureSCLPage.featureValuesTab, "featureValuesTab");
        await this.helper.clickElement(this.featureSCLPage.featureValuesTab, "featureValuesTab");

        //click on featuevalues button
        await this.helper.assertElementVisible(this.featureSCLPage.featureValuesBtn, "featureValuesBtn");
        await this.helper.clickElement(this.featureSCLPage.featureValuesBtn, "featureValuesBtn");

        //select feature family
        await this.helper.clickElement(this.featureSCLPage.selectFeatureFamily, 'selectFeatureFamily');

        // Search for code
        await this.helper.assertElementEnabled(this.featureSCLPage.manualCode, 'manualCode');
        await this.helper.clickElement(this.featureSCLPage.manualCode, 'manualCode');
        await this.helper.assertElementVisible(this.featureSCLPage.searchCode, 'searchCode');
        await this.helper.clickElement(this.featureSCLPage.searchCode, 'searchCode');

        // Generate random number for row and column
        const rowNumber = await this.helper.getRandomNumber(1, 5);
        const colmNumber = await this.helper.getRandomNumber(1, 15);

        // Create dynamic locator
        this.selectRandomCode = this.page.locator(`//div[@class='code-suggestion-table']//table//tr[${rowNumber}]//td[${colmNumber}]`);


        this.featureCode = await this.selectRandomCode.textContent();

        console.log("SCL sales code ", this.featureCode, " is Selected");

        await this.helper.clickElement(this.selectRandomCode, 'selectRandomCode');

        //click on Next button
        await this.helper.assertElementVisible(this.featureSCLPage.nextBtn, "Next button");
        await this.helper.clickElement(this.featureSCLPage.nextBtn, "Next button");

        await this.helper.assertElementVisible(this.featureSCLPage.inputFamilydescEN, 'inputFamilydescEN')
        const valuefamilydescEN = await this.featureSCLPage.inputFamilydescEN.inputValue();
        console.log(valuefamilydescEN);

        //filling the fields
        await this.helper.assertElementVisible(this.featureSCLPage.radioBtnOpts, 'radioButtonOptions')
        await this.helper.clickElement(this.featureSCLPage.radioBtn, "confidentialRadioButton");
        console.log(`Confidential is selected as ${testData_SCL_FF.testData.confidential}`);


        // Click feature family
        const transversal_family = async (iteration: number) => {
            for (let i = 1; i <= iteration; i++) {
                this.featureFamily = this.page.locator(`(//mat-label[text()='Feature Family'])[${i}]`);
                await this.helper.clickElement(this.featureFamily, "featureFamily");
                let index = await this.helper.getRandomNumber(1, 10);
                // await this.helper.selectDropdownByIndex(featureFamily, await this.helper.getRandomNumber(1, 15));
                await this.featureFamily.click();

                // Wait for options to appear
                const options = this.featureFamily.page().locator('mat-option');

                // Ensure the desired index exists
                const count = await options.count();
                if (index >= count) {
                    throw new Error(`Index ${index} is out of bounds. Only ${count} options available.`);
                }

                // Click the option at the given index
                await options.nth(index).click();

                // Feature value
                const featureValue = this.page.locator(`(//mat-label[text()='Feature Value'])[${i}]`);
                await this.helper.clickElement(featureValue, "Feature value");
                this.page.waitForTimeout(1000);
                await this.helper.selectDropdownByIndex(featureValue, 1);
            }
        };

        await transversal_family(transversalModelCount);


        //Verify Description
        const inputs = this.page.locator('input[role="combobox"][matinput]');
        const count = await inputs.count();

        const mergedResults: string[] = [];

        for (let i = 0; i < count - 1; i += 2) {
            const firstText = await inputs.nth(i).inputValue();
            const secondText = await inputs.nth(i + 1).inputValue();

            const code = firstText.split(' - ')[0].trim();
            const number = secondText.split(' - ')[0].trim();

            mergedResults.push(`${code}${number}`);
        }

        const finalOutput = mergedResults.join('+');

        singleFeatureValueDescriptionText = (await this.featureSCLPage.singleFeatureValueDescription.inputValue())?.trim() ?? '';

        shortDescriptionText = (await this.featureSCLPage.fullShortDescription.inputValue())?.trim() ?? '';

        if (await this.featureSCLPage.otherDescShortDesc.isVisible()) {
            otherDescShortDescText = (await this.featureSCLPage.otherDescShortDesc.inputValue())?.trim() ?? '';
            console.log('Other Short Description:', otherDescShortDescText);
        }


        console.log('Single Feature Value Description:', singleFeatureValueDescriptionText);

        if (finalOutput === singleFeatureValueDescriptionText || finalOutput === otherDescShortDescText) {
            console.log("Descriptions match:", finalOutput);
        } else {
            console.error("Descriptions do not match ", finalOutput);
        }


        //enter value singleFeatureValueDescription and otherShortDescText
        const singleFVDescriptionText = singleFeatureValueDescriptionText + '_' + await this.helper.generateRandomText(3);
        const otherShortDescText = otherDescShortDescText + '_' + await this.helper.generateRandomText(3);
        const fullshortDescriptionText = shortDescriptionText + '_' + await this.helper.generateRandomText(3);

        await this.helper.enterText(this.featureSCLPage.singleFeatureValueDescription, singleFVDescriptionText, "singleFeatureValueDescription");
        await this.helper.clickElement(this.featureSCLPage.copyTextSCL, "Copy single feature value ");

        while (await this.featureSCLPage.maxLengthError.isVisible()) {
            await this.helper.clickElement(this.featureSCLPage.fullShortDescription, "fullShortDescription");
            await this.page.keyboard.press('Backspace');
        }
        await this.helper.enterText(this.featureSCLPage.otherDescShortDesc, otherShortDescText, "otherShortDescText");

        //other short xf Description
        if (await this.featureSCLPage.otherDescShortXF.isVisible()) {
            await this.helper.enterText(this.featureSCLPage.otherDescShortXF, testData_SCL_FF.transversalData.otherWPCShortDesc, "otherWPCShortDesc");

        }

        //other WPCShortDesc
        if (await this.featureSCLPage.otherWPCShortDesc.isVisible()) {
            await this.helper.enterText(this.featureSCLPage.otherWPCShortDesc, testData_SCL_FF.transversalData.otherWPCShortDesc, "otherWPCShortDesc");

        }

        //enter explicative note
        await this.helper.assertElementVisible(this.featureSCLPage.explicativeNote, "explicativeNote");
        await this.helper.enterText(this.featureSCLPage.explicativeNote, testData_SCL_FF.transversalData.explicativeNote, "explicativeNote");

        // click on save button
        await this.helper.assertElementVisible(this.featureSCLPage.saveBtn, "SaveButton");
        await this.helper.clickElement(this.featureSCLPage.saveBtn, "SaveButton");

        //click on confirmation 
        await this.helper.assertElementVisible(this.featureSCLPage.confirmationBtn, "ConfirmationButton");
        await this.helper.clickElement(this.featureSCLPage.confirmationBtn, "ConfirmationButton");

        //Verify success message
        await this.featureSCLPage.successMessage.waitFor({ state: 'visible', timeout: 1000000 });
        await this.helper.assertElementHasText(this.featureSCLPage.successMessage, 'SUCCESS', 'SUCCESS message displayed');


        const transversal = (this.scl_familyCode + this.featureCode).replace(/\s+/g, '');
        const classCodeSalescode = transversal.trim();

        return classCodeSalescode;
    }


    async edit_transversal_SCL_feature_family_recycle() {

        // delete transversal pack
        await this.helper.assertElementVisible(this.featureTransverseSearchPage.deleteIcon, "delete button");
        await this.helper.clickElement(this.featureTransverseSearchPage.deleteIcon, "delete button");

        //Verify descriptions
        await this.helper.assertElementHasInputValues(this.featureTransverseSearchPage.singleFeatureValueDes, "To recycle", "singleFeatureValueDes");

        await this.helper.assertElementHasInputValues(this.featureTransverseSearchPage.fullShortDesc, "To recycle", "fullShortDesc");

        await this.helper.assertElementHasInputValues(this.featureTransverseSearchPage.otherDesc, "To recycle", "otherDesc");

        // click on save button
        await this.helper.assertElementVisible(this.featureSCLPage.saveBtn, "SaveButton");
        await this.helper.clickElement(this.featureSCLPage.saveBtn, "SaveButton");

        //click on confirmation 
        await this.helper.assertElementVisible(this.featureSCLPage.confirmationBtn, "ConfirmationButton");
        await this.helper.clickElement(this.featureSCLPage.confirmationBtn, "ConfirmationButton");
        this.page.waitForTimeout(10000);

        this.featureTransverseSearchPage.alreadyExistDesc.waitFor({ timeout: 10000 })
        await this.helper.clickElement(this.featureTransverseSearchPage.fullShortDesc, "fullShortDesc");
        await this.helper.enterText(
            this.featureTransverseSearchPage.fullShortDesc,
            `To recycle_${await this.helper.generateRandomText(2)}`,
            "fullShortDesc"
        );

        await this.helper.assertElementVisible(this.featureSCLPage.saveBtn, "SaveButton");
        await this.helper.clickElement(this.featureSCLPage.saveBtn, "SaveButton");

        await this.helper.assertElementVisible(this.featureSCLPage.confirmationBtn, "ConfirmationButton");
        await this.helper.clickElement(this.featureSCLPage.confirmationBtn, "ConfirmationButton");

        this.page.waitForTimeout(5000);
        await this.helper.assertElementVisible(this.featureSCLPage.successMessage, "successMessage");

        const expectedEditMessage = `Edit feature value${this.featureCode}with success`;

        this.verifyEditMessage = this.page.locator(`//p[contains(text(),'${expectedEditMessage}')]`);
        await this.helper.assertElementHasText(this.verifyEditMessage, expectedEditMessage, "verifyEditMessage");

        await this.helper.clickElement(this.featureTransverseSearchPage.historyIcon, "historyIcon");

        console.log(localizedDescriptionText + "-" + otherDescShortDescText);
        console.log(localizedDescriptionText + "-" + "To recycle");

        await this.helper.assertElementTextContainedIn(this.featureTransverseSearchPage.fullLongDescOld, localizedDescriptionText + "-" + otherDescShortDescText, "fullLongDescOld");
        await this.helper.assertElementTextContainedIn(this.featureTransverseSearchPage.fullLongDescNew, localizedDescriptionText + "-" + "To recycle", "fullLongDescNew");

        await this.helper.assertElementTextContainedIn(this.featureTransverseSearchPage.singleFeatureDescOld, singleFeatureValueDescriptionText, "singleFeatureValueDescriptionTextOld");
        await this.helper.assertElementTextContainedIn(this.featureTransverseSearchPage.singleFeatureDescNew, "To recycle", "singleFeatureValueDescriptionTextNew");

        await this.helper.assertElementTextContainedIn(this.featureTransverseSearchPage.otherDescOld, otherDescShortDescText, "otherDescShortDescTextOld");
        await this.helper.assertElementTextContainedIn(this.featureTransverseSearchPage.otherDescNew, "To recycle", "otherDescShortDescTextNew");

        await this.helper.assertElementTextContainedIn(this.featureTransverseSearchPage.fullShortDescOld, shortDescriptionText, "shortDescriptionTextOld");
        await this.helper.assertElementTextContainedIn(this.featureTransverseSearchPage.fullShortDescNew, "To recycle", "shortDescriptionTextNew");

        await this.helper.clickElement(this.featureTransverseSearchPage.historyClose, "historyClose");

    }

    async edit_transversal_SCL_feature_family() {

        await this.helper.clearText(this.featureTransverseSearchPage.singleFeatureValueDes, "single feature value description");
        await this.helper.enterText(this.featureTransverseSearchPage.singleFeatureValueDes, `Description_${await this.helper.generateRandomText(2)}`, "single feature value description");

        await this.helper.assertElementVisible(this.featureSCLPage.copyTextSCL, "Copy feature description");
        await this.helper.clickElement(this.featureSCLPage.copyTextSCL, "Copy feature description");

        this.page.waitForTimeout(5000);

        // click on save button
        await this.helper.assertElementVisible(this.featureSCLPage.saveBtn, "SaveButton");
        await this.helper.clickElement(this.featureSCLPage.saveBtn, "SaveButton");

        //click on confirmation 
        await this.helper.assertElementVisible(this.featureSCLPage.confirmationBtn, "ConfirmationButton");
        await this.helper.clickElement(this.featureSCLPage.confirmationBtn, "ConfirmationButton");
        this.page.waitForTimeout(10000);

        await this.helper.assertElementVisible(this.featureSCLPage.saveBtn, "SaveButton");
        await this.helper.clickElement(this.featureSCLPage.saveBtn, "SaveButton");

        await this.helper.assertElementVisible(this.featureSCLPage.confirmationBtn, "ConfirmationButton");
        await this.helper.clickElement(this.featureSCLPage.confirmationBtn, "ConfirmationButton");

        this.page.waitForTimeout(5000);
        await this.helper.assertElementVisible(this.featureSCLPage.successMessage, "successMessage");

        const expectedEditMessage = `Edit feature value${this.featureCode}with success`;

        this.verifyEditMessage = this.page.locator(`//p[contains(text(),'${expectedEditMessage}')]`);
        await this.helper.assertElementHasText(this.verifyEditMessage, expectedEditMessage, "verifyEditMessage");

        await this.helper.clickElement(this.featureTransverseSearchPage.historyIcon, "historyIcon");

        if (await this.featureTransverseSearchPage.fullLongDescOldEdit.isVisible()) {
            await this.helper.assertElementTextContainedIn(this.featureTransverseSearchPage.fullLongDescOldEdit, singleFeatureValueDescriptionText, "fullLongDescOld");
            await this.helper.assertElementTextContainedIn(this.featureTransverseSearchPage.fullLongDescNewEdit, "Description", "fullLongDescNew");
        }

        if (await this.featureTransverseSearchPage.singleFeatureDescOldEdit.isVisible()) {
            await this.helper.assertElementTextContainedIn(this.featureTransverseSearchPage.singleFeatureDescOldEdit, singleFeatureValueDescriptionText, "singleFeatureValueDescriptionTextOld");
            await this.helper.assertElementTextContainedIn(this.featureTransverseSearchPage.singleFeatureDescNewEdit, "Description", "singleFeatureValueDescriptionTextNew");
        }

        if (await this.featureTransverseSearchPage.otherDescOldEdit.isVisible()) {
            await this.helper.assertElementTextContainedIn(this.featureTransverseSearchPage.otherDescOldEdit, otherDescShortDescText, "otherDescShortDescTextOld");
            await this.helper.assertElementTextContainedIn(this.featureTransverseSearchPage.otherDescNewEdit, "Description", "otherDescShortDescTextNew");
        }
        if (await this.featureTransverseSearchPage.fullShortDescOldEdit.isVisible()) {
            await this.helper.assertElementTextContainedIn(this.featureTransverseSearchPage.fullShortDescOldEdit, shortDescriptionText, "shortDescriptionTextOld");
            await this.helper.assertElementTextContainedIn(this.featureTransverseSearchPage.fullShortDescNewEdit, "Description", "shortDescriptionTextNew");
        }
        await this.helper.clickElement(this.featureTransverseSearchPage.historyClose, "historyClose");

    }

    async create_transversal_SCL_feature_family_remove_transversal(classCode, familyCode, transversalModelCount) {

        //navigate to Generic Dictionary
        await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
        await this.helper.clickElement(this.homePage.genericDict, 'genericDict');

        //go to create SCL feature family 
        await this.helper.clickElement(this.homePage.createFamilyFeature, 'createFamilyFeature');
        await this.helper.assertElementVisible(this.featureSCLPage.createSCLFeature, 'createSCLFeature');
        await this.helper.clickElement(this.featureSCLPage.createSCLFeature, 'createSCLFeature');

        // Verify Next button is disabled
        const nextButtonDisabled = await this.helper.assertElementDisabled(this.featureSCLPage.nextBtn, "Next button");

        while (nextButtonDisabled) {

            // select Nature
            await this.helper.assertElementVisible(this.featureSCLPage.natureDropdown, "natureDropdown");
            await this.helper.clickElement(this.featureSCLPage.natureDropdown, "natureDropdown");
            await this.helper.clickElement(this.featureSCLPage.transversalNatureOptions, "transversalNatureOptions");

            // select feature family type
            await this.helper.assertElementVisible(this.featureSCLPage.featureFamilyType, "feature_family_type");
            await this.helper.clickElement(this.featureSCLPage.featureFamilyType, "feature_family_type");
            await this.helper.clickElement(this.featureSCLPage.transversalFeatureFamilyTypeOption, "transversalFeatureFamilyTypeOption");

            // select specific sales range
            const isRadioChecked = await this.featureSCLPage.radioChecked.isVisible();
            if (!isRadioChecked) {
                await this.helper.clickElement(this.featureSCLPage.radioSSR, "specificSalesRangeRadio");
                console.log(`Specific sales range is selected as ${testData_SCL_FF.testData.specific_sales_range}`);
            }
            else {
                console.log("Specific sales range is already selected. ");
            }

            // Search for code
            await this.helper.assertElementEnabled(this.featureSCLPage.manualCode, 'manualCode');
            await this.helper.clickElement(this.featureSCLPage.manualCode, 'manualCode');
            await this.helper.assertElementVisible(this.featureSCLPage.searchCode, 'searchCode');
            await this.helper.clickElement(this.featureSCLPage.searchCode, 'searchCode');

            // Generate random number for row and column
            const rowNumber = await this.helper.getRandomNumber(1, 1);
            const colmNumber = await this.helper.getRandomNumber(1, 10);

            // Create dynamic locator
            // this.selectRandomCode = this.page.locator(`//div[@class='code-suggestion-table']//table//tr[1]//td[1]`);

            this.selectRandomCode = this.page.locator(`//div[@class='code-suggestion-table']//table//tr[${rowNumber}]//td[${colmNumber}]`);
            const classCodeText = await this.selectRandomCode.textContent();
            this.scl_familyCode = classCodeText?.trim() ?? '';

            console.log("SCL Class code ", this.scl_familyCode, " is Selected");

            await this.helper.clickElement(this.selectRandomCode, 'selectRandomCode');

            // Validate that Next button is still disabled
            this.page.waitForTimeout(3000);
            const nextButtonStillDisabled = await this.helper.assertElementDisabled(this.featureSCLPage.nextBtn, "Next button");
            if (!nextButtonStillDisabled) {
                break; // Exit the loop if Next button is enabled
            } //if

            //non- mandatory data fields

        } //while


        // click on Next button
        await this.helper.clickElement(this.featureSCLPage.nextBtn, "Next button");

        // Verify Next button is disabled
        const isNextButtonDisabled = await this.helper.assertElementDisabled(this.featureSCLPage.secondPageNextBtn, "Next button");

        while (isNextButtonDisabled) {

            // ensure the ranking dropdown is visible and click it
            await this.helper.assertElementVisible(this.featureSCLPage.rankingDropdown, "ranking dropdown");
            await this.helper.clickElement(this.featureSCLPage.rankingDropdown, "ranking dropdown");

            // get ranking value from test data
            const ranking = testData_SCL_FF.testData.ranking;

            // handle different ranking values
            switch (ranking) {
                case 'test shali 1':
                case 'AAA':
                case '3.4':
                case 'ranking 05':
                case 'ranking 0':
                case 'Ranking 02':
                case '123':
                case '3.3':
                case 'newranking':
                case 'z':

                    // Select ranking option directly
                    await this.featureSCLPage.rankingOption.isVisible({ timeout: 3000 });
                    await this.helper.clickElement(this.featureSCLPage.rankingOption, ranking);
                    console.log(`${ranking} is selected`);
                    break;

                case 'Ranking 001':
                case '04 - test':
                case 'testRefresh':
                case 'Raking 01':

                    // Handle elements under ranking 0
                    this.rankingOption = 'ranking 0';
                    this.rankingOptionLocator = this.page.locator(`//span[text()=' ${this.rankingOption} ']//parent::mat-option//preceding-sibling::button/span/following-sibling::mat-icon`);
                    await this.helper.clickElement(this.rankingOptionLocator, "rankingOptionLocatorDropdown");
                    await this.helper.clickElement(this.featureSCLPage.rankingOption, ranking);
                    console.log(`${ranking} is selected`);
                    break;

                case 'to del':

                    // Handle elements under Ranking 02
                    this.rankingOption = 'Ranking 02';
                    this.rankingOptionLocator = this.page.locator(`//span[text()=' ${this.rankingOption} ']//parent::mat-option//preceding-sibling::button/span/following-sibling::mat-icon`);
                    await this.helper.clickElement(this.rankingOptionLocator, "rankingOptionLocatorDropdown");
                    await this.helper.clickElement(this.featureSCLPage.rankingOption, ranking);
                    console.log(`${ranking} is selected`);
                    break;

                case 'Test 123':

                    // Handle elements under 123
                    this.rankingOption = '123';
                    this.rankingOptionLocator = this.page.locator(`(//span[text()=' ${this.rankingOption} ']//parent::mat-option//preceding-sibling::button/span/following-sibling::mat-icon)[1]`);
                    await this.helper.clickElement(this.rankingOptionLocator, "rankingOptionLocatorDropdown");
                    await this.helper.clickElement(this.featureSCLPage.rankingOption, ranking);
                    console.log(`${ranking} is selected`);
                    break;

                case 'child1':

                    // Handle elements under 123
                    this.rankingOption = '123';
                    this.rankingOptionLocator = this.page.locator(`(//span[text()=' ${this.rankingOption} ']//parent::mat-option//preceding-sibling::button/span/following-sibling::mat-icon)[2]`);
                    await this.helper.clickElement(this.rankingOptionLocator, "rankingOptionLocatorDropdown");
                    await this.helper.clickElement(this.featureSCLPage.rankingOption, ranking);
                    console.log(`${ranking} is selected`);
                    break;

                case 'newranking2':

                    // Handle elements under newranking
                    this.rankingOption = 'newranking';
                    this.rankingOptionLocator = this.page.locator(`//span[text()=' ${this.rankingOption} ']//parent::mat-option//preceding-sibling::button/span/following-sibling::mat-icon`);
                    await this.helper.clickElement(this.rankingOptionLocator, "rankingOptionLocatorDropdown");
                    await this.helper.clickElement(this.featureSCLPage.rankingOption, ranking);
                    console.log(`${ranking} is selected`);
                    break;

                case 'zz':

                    // Handle elements under z
                    this.rankingOption = 'z';
                    this.rankingOptionLocator = this.page.locator(`//span[text()=' ${this.rankingOption} ']//parent::mat-option//preceding-sibling::button/span/following-sibling::mat-icon`);
                    await this.helper.clickElement(this.rankingOptionLocator, "rankingOptionLocatorDropdown");
                    await this.helper.clickElement(this.featureSCLPage.rankingOption, ranking);
                    console.log(`${ranking} is selected`);
                    break;

                case 'zzz':

                    // Handle elements under zzz
                    this.rankingOption = 'z';
                    this.rankingOptionLocator = this.page.locator(`//span[text()=' ${this.rankingOption} ']//parent::mat-option//preceding-sibling::button/span/following-sibling::mat-icon`);
                    await this.helper.clickElement(this.rankingOptionLocator, "rankingOptionLocatorDropdown");
                    this.rankingOption = 'zz';
                    this.rankingOptionLocator = this.page.locator(`//span[text()=' ${this.rankingOption} ']//parent::mat-option//preceding-sibling::button/span/following-sibling::mat-icon`);
                    await this.helper.clickElement(this.rankingOptionLocator, "rankingOptionLocatorNestedDropdown");
                    await this.helper.clickElement(this.featureSCLPage.rankingOption, ranking);
                    console.log(`${ranking} is selected`);
                    break;

                case 'S-03-02':

                    // Handle elements under S-03-02
                    this.rankingOption = '3.3';
                    this.rankingOptionLocator = this.page.locator(`//span[text()=' ${this.rankingOption} ']//parent::mat-option//preceding-sibling::button/span/following-sibling::mat-icon`);
                    await this.helper.clickElement(this.rankingOptionLocator, "rankingOptionLocatorDropdown");
                    this.rankingOption = 'Test 123';
                    this.rankingOptionLocator = this.page.locator(`//span[text()=' ${this.rankingOption} ']//parent::mat-option//preceding-sibling::button/span/following-sibling::mat-icon`);
                    await this.helper.clickElement(this.rankingOptionLocator, "rankingOptionLocatorNestedDropdown");
                    await this.helper.clickElement(this.featureSCLPage.rankingOption, ranking);
                    console.log(`${ranking} is selected`);
                    break;

                case 'Ranking 002':

                    // Handle elements under Ranking 002
                    this.rankingOption = 'ranking 0';
                    this.rankingOptionLocator = this.page.locator(`//span[text()=' ${this.rankingOption} ']//parent::mat-option//preceding-sibling::button/span/following-sibling::mat-icon`);
                    await this.helper.clickElement(this.rankingOptionLocator, "rankingOptionLocatorDropdown");
                    this.rankingOption = 'Raking 01';
                    this.rankingOptionLocator = this.page.locator(`//span[text()=' ${this.rankingOption} ']//parent::mat-option//preceding-sibling::button/span/following-sibling::mat-icon`);
                    await this.helper.clickElement(this.rankingOptionLocator, "rankingOptionLocatorNestedDropdown");
                    await this.helper.clickElement(this.featureSCLPage.rankingOption, ranking);
                    console.log(`${ranking} is selected`);
                    break;

                default:
                    console.log(`Ranking ${ranking} is not recognized.`);
                    break;
            }

            //select feature categories
            await this.helper.assertElementVisible(this.featureSCLPage.featureFamilyCategories, "feature_family_categories");
            await this.helper.clickElement(this.featureSCLPage.featureFamilyCategories, "feature_family_categories");
            await this.helper.clickElement(this.featureSCLPage.featureFamilyCategoriesOption, "feature_family_categories_option");
            await this.page.keyboard.press('Tab');

            // select confidentiality radio
            await this.helper.assertElementVisible(this.featureSCLPage.confidentialRadioBtn, "Confidential Radio Button");
            await this.helper.clickElement(this.featureSCLPage.confidentialRadioBtn, "ConfidentialRadioBtn");

            //transversal description
            await this.helper.assertElementVisible(this.featureSCLPage.transversalDescription, "transversalDescription");
            await this.helper.clickElement(this.featureSCLPage.transversalDescription, "transversalDescription");

            //prohibited date
            const today = new Date();

            // Extract day, month, and year
            const day = String(today.getDate()).padStart(2, '0');
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const year = today.getFullYear();

            // Format the date as dd/mm/yyyy
            const formattedDate = `${day}/${month}/${year}`;

            console.log(`Prohibited date is: ${formattedDate}`);
            await this.helper.assertElementVisible(this.featureSCLPage.prohibitedDate, "prohibitedDate");
            await this.helper.enterText(this.featureSCLPage.prohibitedDate, formattedDate, "prohibitedDate");

            // // select Si Explicit
            // await this.helper.assertElementVisible(this.featureSCLPage.siExplicit, "Si_Explicit");
            // await this.helper.clickElement(this.featureSCLPage.siExplicit, "Si_Explicit");
            // await this.helper.clickElement(this.featureSCLPage.siExplicitOption, "Si_Explicit_Option");
            // await this.page.keyboard.press('Tab');

            // // select Si Exclusive
            // await this.helper.assertElementVisible(this.featureSCLPage.siExclusion, "Si_Explicit");
            // await this.helper.clickElement(this.featureSCLPage.siExclusion, "Si_Explicit");
            // await this.helper.clickElement(this.featureSCLPage.siExclusionOption, "Si_Explicit_Option");
            // await this.page.keyboard.press('Tab');

            // // select mandatory with structure
            // await this.helper.assertElementVisible(this.featureSCLPage.mandatoryWithStructure, "Mandatory_with_Structure");
            // await this.helper.clickElement(this.featureSCLPage.mandatoryWithStructure, "Mandatory_with_Structure");
            // await this.helper.clickElement(this.featureSCLPage.mandatoryWithStructureOption, "mandatory_with_Structure_Option");
            // await this.page.keyboard.press('Tab');

            // // select mandatory with responsibilities
            // await this.helper.assertElementVisible(this.featureSCLPage.mandatoryWithResponsibility, "Mandatory_with_Responsibility");
            // await this.helper.clickElement(this.featureSCLPage.mandatoryWithResponsibility, "Mandatory_with_Responsibility");
            // await this.helper.clickElement(this.featureSCLPage.mandatoryWithResponsibilityOption, "mandatory_with_Responsibilty_Option");

            // enter description
            localizedDescriptionText = `${testData_SCL_FF.testData.localizedDescription}_${await this.helper.generateRandomText(3)}`;
            await this.helper.assertElementVisible(this.featureSCLPage.localizedDescriptionEn, "localizedDescriptionEn");
            await this.helper.enterText(this.featureSCLPage.localizedDescriptionEn, localizedDescriptionText, "localizedDescriptionEn");

            //enter explicative description
            await this.helper.assertElementVisible(this.featureSCLPage.explicativeNotes, "explicativeNotes");
            await this.helper.enterText(this.featureSCLPage.explicativeNotes, testData_SCL_FF.testData.localizedDescription, "explicativeNotes");

            //enter other description
            if (await this.featureSCLPage.otherDescription.isVisible()) {
                await this.helper.enterText(this.featureSCLPage.otherDescription, testData_SCL_FF.testData.localizedDescription, "otherDescription");
            }

            if (await this.featureSCLPage.otherDescXF.isVisible()) {
                await this.helper.enterText(this.featureSCLPage.otherDescXF, testData_SCL_FF.testData.localizedDescription, "otherDescription");

            }
            //System
            await this.helper.clickElement(this.featureSCLPage.systemDropdown, "System dropdown");
            await this.helper.clickElement(this.featureSCLPage.systemOption, "SystemOption");

            // Validate that Next button is still disabled
            const isSavingWithoutMappinglDisabled = await this.helper.assertElementDisabled(this.featureSCLPage.savingWithoutMapping, "Next button");
            if (!isSavingWithoutMappinglDisabled) {
                break;
            } //if

        } //while


        // click on SavingWithoutMappingl button
        await this.helper.clickElement(this.featureSCLPage.savingWithoutMapping, "savingWithoutMapping button");

        //click on confirmation
        await this.featureSCLPage.confirmationBtn.waitFor({ state: 'visible' });
        await this.helper.clickElement(this.featureSCLPage.confirmationBtn, 'confirmation');

        //validate SUCCESS message
        await this.helper.assertElementHasText(this.featureSCLPage.successMessage, 'SUCCESS', 'SUCCESS message displayed');

        //click on featuevalues tab
        await this.helper.assertElementVisible(this.featureSCLPage.featureValuesTab, "featureValuesTab");
        await this.helper.clickElement(this.featureSCLPage.featureValuesTab, "featureValuesTab");

        //click on featuevalues button
        await this.helper.assertElementVisible(this.featureSCLPage.featureValuesBtn, "featureValuesBtn");
        await this.helper.clickElement(this.featureSCLPage.featureValuesBtn, "featureValuesBtn");

        //select feature family
        await this.helper.clickElement(this.featureSCLPage.selectFeatureFamily, 'selectFeatureFamily');

        // Search for code
        await this.helper.assertElementEnabled(this.featureSCLPage.manualCode, 'manualCode');
        await this.helper.clickElement(this.featureSCLPage.manualCode, 'manualCode');
        await this.helper.assertElementVisible(this.featureSCLPage.searchCode, 'searchCode');
        await this.helper.clickElement(this.featureSCLPage.searchCode, 'searchCode');

        // Generate random number for row and column
        const rowNumber = await this.helper.getRandomNumber(1, 2);
        const colmNumber = await this.helper.getRandomNumber(1, 10);

        // Create dynamic locator
        this.selectRandomCode = this.page.locator(`//div[@class='code-suggestion-table']//table//tr[${rowNumber}]//td[${colmNumber}]`);
        this.featureCode = await this.selectRandomCode.textContent();

        console.log("SCL sales code ", this.featureCode, " is Selected");

        await this.helper.clickElement(this.selectRandomCode, 'selectRandomCode');

        //click on Next button
        await this.helper.assertElementVisible(this.featureSCLPage.nextBtn, "Next button");
        await this.helper.clickElement(this.featureSCLPage.nextBtn, "Next button");

        await this.helper.assertElementVisible(this.featureSCLPage.inputFamilydescEN, 'inputFamilydescEN')
        const valuefamilydescEN = await this.featureSCLPage.inputFamilydescEN.inputValue();
        console.log(valuefamilydescEN);

        //filling the fields
        await this.helper.assertElementVisible(this.featureSCLPage.radioBtnOpts, 'radioButtonOptions')
        await this.helper.clickElement(this.featureSCLPage.radioBtn, "confidentialRadioButton");
        console.log(`Confidential is selected as ${testData_SCL_FF.testData.confidential}`);


        // Click feature family
        const transversal_family = async (iteration: number) => {
            for (let i = 1; i <= iteration; i++) {
                this.featureFamily = this.page.locator(`(//mat-label[text()='Feature Family'])[${i}]`);
                await this.helper.clickElement(this.featureFamily, "featureFamily");
                let index = await this.helper.getRandomNumber(1, 10);
                // await this.helper.selectDropdownByIndex(featureFamily, await this.helper.getRandomNumber(1, 15));
                await this.featureFamily.click();

                // Wait for options to appear
                const options = this.featureFamily.page().locator('mat-option');

                // Ensure the desired index exists
                const count = await options.count();
                if (index >= count) {
                    throw new Error(`Index ${index} is out of bounds. Only ${count} options available.`);
                }

                // Click the option at the given index
                await options.nth(index).click();

                // Feature value
                const featureValue = this.page.locator(`(//mat-label[text()='Feature Value'])[${i}]`);
                await this.helper.clickElement(featureValue, "Feature value");
                await this.helper.selectDropdownByIndex(featureValue, 1);
            }
        };

        await transversal_family(transversalModelCount);

        //Verify Description
        const inputs = this.page.locator('input[role="combobox"][matinput]');
        const count = await inputs.count();

        const mergedResults: string[] = [];

        for (let i = 0; i < count - 1; i += 2) {
            const firstText = await inputs.nth(i).inputValue();
            const secondText = await inputs.nth(i + 1).inputValue();

            const code = firstText.split(' - ')[0].trim();
            const number = secondText.split(' - ')[0].trim();

            mergedResults.push(`${code}${number}`);
        }

        const finalOutput = mergedResults.join('+');


        singleFeatureValueDescriptionText = (await this.featureSCLPage.singleFeatureValueDescription.inputValue())?.trim() ?? '';

        shortDescriptionText = (await this.featureSCLPage.fullShortDescription.inputValue())?.trim() ?? '';

        if (await this.featureSCLPage.otherDescShortDesc.isVisible()) {
            otherDescShortDescText = (await this.featureSCLPage.otherDescShortDesc.inputValue())?.trim() ?? '';
            console.log('Other Short Description:', otherDescShortDescText);
        }


        console.log('Single Feature Value Description:', singleFeatureValueDescriptionText);

        if (finalOutput === singleFeatureValueDescriptionText || finalOutput === otherDescShortDescText) {
            console.log("Descriptions match:", finalOutput);
        } else {
            console.error("Descriptions do not match ", finalOutput);
        }

        await this.helper.assertElementVisible(this.featureTransverseSearchPage.deleteTransversalRow, "Delete transversal row");
        await this.helper.clickElement(this.featureTransverseSearchPage.deleteTransversalRow, "Delete transversal row");

        //Verify Description
        const inputs1 = this.page.locator('input[role="combobox"][matinput]');
        const count1 = await inputs.count();

        const mergedResults1: string[] = [];

        for (let i = 0; i < count1 - 1; i += 2) {
            const firstText = await inputs1.nth(i).inputValue();
            const secondText = await inputs1.nth(i + 1).inputValue();

            const code = firstText.split(' - ')[0].trim();
            const number = secondText.split(' - ')[0].trim();

            mergedResults1.push(`${code}${number}`);
        }

        const finalOutput1 = mergedResults1.join('+');

        singleFeatureValueDescriptionText = (await this.featureSCLPage.singleFeatureValueDescription.inputValue())?.trim() ?? '';

        shortDescriptionText = (await this.featureSCLPage.fullShortDescription.inputValue())?.trim() ?? '';

        if (await this.featureSCLPage.otherDescShortDesc.isVisible()) {
            otherDescShortDescText = (await this.featureSCLPage.otherDescShortDesc.inputValue())?.trim() ?? '';
            console.log('Other Short Description:', otherDescShortDescText);
        }


        console.log('Single Feature Value Description:', singleFeatureValueDescriptionText);

        if (finalOutput1 === singleFeatureValueDescriptionText || finalOutput1 === otherDescShortDescText) {
            console.log("Descriptions match:", finalOutput1);
        } else {
            console.error("Descriptions do not match ", finalOutput1);
        }

        //enter value singleFeatureValueDescription and otherShortDescText
        const singleFVDescriptionText = singleFeatureValueDescriptionText + '_' + await this.helper.generateRandomText(3);
        const otherShortDescText = otherDescShortDescText + '_' + await this.helper.generateRandomText(3);
        const fullshortDescriptionText = shortDescriptionText + '_' + await this.helper.generateRandomText(3);

        await this.helper.enterText(this.featureSCLPage.singleFeatureValueDescription, singleFVDescriptionText, "singleFeatureValueDescription");
        await this.helper.clickElement(this.featureSCLPage.copyTextSCL, "Copy single feature value ");

        while (await this.featureSCLPage.maxLengthError.isVisible()) {
            await this.helper.clickElement(this.featureSCLPage.fullShortDescription, "fullShortDescription");
            await this.page.keyboard.press('Backspace');
        }
        await this.helper.enterText(this.featureSCLPage.otherDescShortDesc, otherShortDescText, "otherShortDescText");
      
        //other short xf Description
        if (await this.featureSCLPage.otherDescShortXF.isVisible()) {
            await this.helper.enterText(this.featureSCLPage.otherDescShortXF, testData_SCL_FF.transversalData.otherWPCShortDesc, "otherWPCShortDesc");

        }

        //other WPCShortDesc
        if (await this.featureSCLPage.otherWPCShortDesc.isVisible()) {
            await this.helper.enterText(this.featureSCLPage.otherWPCShortDesc, testData_SCL_FF.transversalData.otherWPCShortDesc, "otherWPCShortDesc");

        }
        //enter explicative note
        await this.helper.assertElementVisible(this.featureSCLPage.explicativeNote, "explicativeNote");
        await this.helper.enterText(this.featureSCLPage.explicativeNote, testData_SCL_FF.transversalData.explicativeNote, "explicativeNote");

        // click on save button
        await this.helper.assertElementVisible(this.featureSCLPage.saveBtn, "SaveButton");
        await this.helper.clickElement(this.featureSCLPage.saveBtn, "SaveButton");

        //click on confirmation 
        await this.helper.assertElementVisible(this.featureSCLPage.confirmationBtn, "ConfirmationButton");
        await this.helper.clickElement(this.featureSCLPage.confirmationBtn, "ConfirmationButton");

        //Verify success message
        await this.featureSCLPage.successMessage.waitFor({ state: 'visible', timeout: 1000000 });
        await this.helper.assertElementHasText(this.featureSCLPage.successMessage, 'SUCCESS', 'SUCCESS message displayed');


        const transversal = (this.scl_familyCode + this.featureCode).replace(/\s+/g, '');
        const classCodeSalescode = transversal.trim();

        return classCodeSalescode;
    }

}