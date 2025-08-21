import { Locator, Page, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { FeatureSCLPage } from '../pages/featureSCLPage';
import testData_SCL_FF from '../test-data/testData_SCL_FF.json';

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
    isRadioButtonSelected: (Locator: any) => Promise<boolean>;
    doubleClickElement: (locator: any, name: string) => Promise<void>;
    clearText: (locator: any, name: string) => Promise<void>;
    assertTextboxValue: (locator: any, expectedText: string, message: string) => Promise<void>;
    checkLocators: (locator1: any, locator2: any, locator3: any) => Promise<boolean>;
    generateRandomManualCode: (length: number) => Promise<string>;
    generateRandomText: (length: number) => Promise<string>
}

export class FeatureSCLSteps {
    private page: Page;
    private testInfo: TestInfo;
    private helper: StepHelper;
    private homePage: HomePage;
    private featureSCLPage: FeatureSCLPage;
    private selectRandomCode: Locator;
    private classCode: string;
    private familyCode: string;
    private rankingOptionLocator: Locator;
    private rankingOption: string;
    private scl_familyCode: string;
    private firstClassCode: Locator;
    private sclManualCode: string;
    private scl_familyValue: string;
    private localizedDescriptionText: string;
    private editLocalizedDescriptionText: string;

    //constructor to initialize the objects
    constructor(page: Page, testInfo: TestInfo, stepHelper: StepHelper) {
        this.page = page;
        this.testInfo = testInfo;
        this.helper = stepHelper;
        this.homePage = new HomePage(page);
        this.featureSCLPage = new FeatureSCLPage(page);
        this.classCode = '';
        this.rankingOption = '';
        this.familyCode = '';
        this.scl_familyCode = '';
        this.sclManualCode = '';
        this.scl_familyValue = '';
        this.localizedDescriptionText = '';
        this.editLocalizedDescriptionText = "";
    }

    //Creating SCL class code flow
    async navigateTo_create_SCL_feature_family(classCode, familyCode) {

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
            await this.helper.clickElement(this.featureSCLPage.natureOptions, "natureOption");

            //select feature family opton
            await this.helper.assertElementVisible(this.featureSCLPage.featureFamilyType, "feature_family_type");
            await this.helper.clickElement(this.featureSCLPage.featureFamilyType, "feature_family_type");
            await this.helper.clickElement(this.featureSCLPage.featureFamilyTypeOption, "feature_family_type_options");

            // select language
            await this.helper.assertElementVisible(this.featureSCLPage.languageDropdown, "languageDropdown");
            await this.helper.clickElement(this.featureSCLPage.languageDropdown, "languageDropdown");
            await this.helper.clickElement(this.featureSCLPage.languageOptions, "languageOptions");
            await this.page.keyboard.press('Tab');

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
            this.selectRandomCode = this.page.locator(`//div[@class='code-suggestion-table']//table//tr[${rowNumber}]//td[${colmNumber}]`);
            const classCodeText = await this.selectRandomCode.textContent();
            this.scl_familyCode = classCodeText?.trim() ?? '';

            console.log("SCL Family code ", this.scl_familyCode, " is Selected");

            await this.helper.clickElement(this.selectRandomCode, 'selectRandomCode');

            // Validate that Next button is still disabled
            this.page.waitForTimeout(3000);
            const nextButtonStillDisabled = await this.helper.assertElementDisabled(this.featureSCLPage.nextBtn, "Next button");
            if (!nextButtonStillDisabled) {
                break; // Exit the loop if Next button is enabled
            } //if

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
            //select feature family category
            // await this.helper.assertElementVisible(this.featureSCLPage.featureFamilyCategory,'feature family category');
            // await this.helper.clickElement(this.featureSCLPage.featureFamilyCategory,'feature family category');
            // await this.helper.clickElement(this.featureSCLPage.featureFamilyCategoryOption,' feature family category option');
            // await this.helper.clickElement(this.featureSCLPage.featureFamilyCategory,'feature family category');

            //select feature categories
            await this.helper.assertElementVisible(this.featureSCLPage.featureFamilyCategories, "feature_family_categories");
            await this.helper.clickElement(this.featureSCLPage.featureFamilyCategories, "feature_family_categories");
            await this.helper.clickElement(this.featureSCLPage.featureFamilyCategoriesOption, "feature_family_categories_option");
            await this.page.keyboard.press('Tab');

            // select confidentiality radio
            await this.helper.assertElementVisible(this.featureSCLPage.confidentialRadioBtn, "Confidential Radio Button");
            await this.helper.clickElement(this.featureSCLPage.confidentialRadioBtn, "ConfidentialRadioBtn");

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
            // await this.helper.assertElementVisible(this.featureSCLPage.MandatorywithResponsibility, "Mandatory_with_Responsibility");
            // await this.helper.clickElement(this.featureSCLPage.MandatorywithResponsibility, "Mandatory_with_Responsibility");
            // await this.helper.clickElement(this.featureSCLPage.MandatorywithResponsibilityOption, "mandatory_with_Responsibilty_Option");

            // enter description
            const localizedDescriptionText = `${testData_SCL_FF.testData.localizedDescription}_${await this.helper.generateRandomText(3)}`;

            await this.helper.assertElementVisible(this.featureSCLPage.localizedDescriptionEn, "localizedDescriptionEn");
            await this.helper.enterText(this.featureSCLPage.localizedDescriptionEn, localizedDescriptionText, "localizedDescriptionEn");
            // await this.helper.assertElementVisible(this.featureSCLPage.localizedDescriptionEn, "localizedDescriptionEn");
            // await this.helper.enterText(this.featureSCLPage.localizedDescriptionEn, testData_SCL_FF.testData.localizedDescription, "localizedDescriptionEn");

            //enter explicative description
            await this.helper.assertElementVisible(this.featureSCLPage.explicativeNotes, "explicativeNotes");
            await this.helper.enterText(this.featureSCLPage.explicativeNotes, testData_SCL_FF.testData.localizedDescription, "explicativeNotes");

            // Validate that Next button is still disabled
            const isNextButtonStillDisabled = await this.helper.assertElementDisabled(this.featureSCLPage.secondPageNextBtn, "Next button");
            if (!isNextButtonStillDisabled) {
                break; // Exit the loop if Next button is enabled
            } //if

            //non- mandatory data fields

        } //while

        // click on Next button
        await this.helper.clickElement(this.featureSCLPage.secondPageNextBtn, "Next button");

        //add stv class code
        await this.helper.assertElementVisible(this.featureSCLPage.classCodeSTV, "classCodeSTV");
        await this.helper.clickElement(this.featureSCLPage.searchClassCodeSTV, "searchClassCodeSTV");

        const classCodeText = classCode?.trim() ?? '';
        console.log(classCodeText, " entered in STV class code");

        await this.helper.clickElement(this.featureSCLPage.searchClassCode, "classCode");

        await this.helper.enterText(this.featureSCLPage.searchClassCode, classCodeText, "classCode");

        await this.helper.clickElement(this.featureSCLPage.advancedSTVSearch, "advancedSTVSearch");

        this.firstClassCode = this.page.locator(`//mat-cell//a[text()='${classCodeText}']`)

        await this.helper.clickElement(this.firstClassCode, "first class code");

        // const isConfirmationSTVVisible = await this.featureSCLPage.differentDescriptionConfirmationBox.isVisible({timeout:10000})
        // if(isConfirmationSTVVisible){
        await this.featureSCLPage.differentDescriptionConfirmationBox.waitFor({ state: 'visible' });
        await this.helper.clickElement(this.featureSCLPage.differentDescriptionConfirmationBox, "differentDescriptionConfirmationBox");
        // }


        //WPC family code
        await this.helper.assertElementVisible(this.featureSCLPage.familyCodeWPC, "familyCodeWPC");
        await this.helper.clickElement(this.featureSCLPage.searchFamilyCodeWPC, "searchFamilyCodeWPC");

        const familyCodeText = familyCode?.trim() ?? '';
        console.log(familyCodeText, " entered in WPC family code");

        await this.helper.clickElement(this.featureSCLPage.searchClassCode, "familyCodeText");
        await this.helper.enterText(this.featureSCLPage.searchClassCode, familyCodeText, "familyCodeText");

        await this.helper.clickElement(this.featureSCLPage.advancedSTVSearch, "advancedSTVSearch");

        this.firstClassCode = this.page.locator(`//mat-cell//a[text()='${familyCodeText}']`)

        await this.helper.clickElement(this.firstClassCode, "first class code");


        await this.featureSCLPage.differentDescriptionConfirmationBox.waitFor({ state: 'visible' });
        await this.helper.clickElement(this.featureSCLPage.differentDescriptionConfirmationBox, "differentDescriptionConfirmationBox");


        // Click Validate button
        await this.helper.clickElement(this.featureSCLPage.validateBtn, 'Validate');

        await this.featureSCLPage.confirmationBtn.waitFor({ state: 'visible' });
        await this.helper.clickElement(this.featureSCLPage.confirmationBtn, 'confirmation');


        await this.helper.assertElementHasText(this.featureSCLPage.successMessage, 'SUCCESS', 'SUCCESS message displayed');
        return this.scl_familyCode;

    }

    async navigate_to_edit_SCL_family() {
        //edit part
        //feature family type
        await this.helper.assertElementVisible(this.featureSCLPage.editFeatureFamilyDropdown, 'edit_feature_family_type');
        await this.helper.clickElement(this.featureSCLPage.editFeatureFamilyDropdown, 'edit_feature_family_type');
        await this.helper.clickElement(this.featureSCLPage.editFeatureFamilyOption, 'edit_feature_family_type_option');

        //edit ranking part
        await this.helper.assertElementVisible(this.featureSCLPage.rankingDropdown, "ranking dropdown");
        await this.helper.clickElement(this.featureSCLPage.rankingDropdown, "ranking dropdown");
        const editranking = testData_SCL_FF.editTestData.ranking;

        switch (editranking) {
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
                await this.helper.clickElement(this.featureSCLPage.editRankingOption, editranking);
                console.log(`${editranking} is selected`);
                break;

            case 'Ranking 001':
            case '04 - test':
            case 'testRefresh':
            case 'Raking 01':

                // Handle elements under ranking 0
                this.rankingOption = 'ranking 0';
                this.rankingOptionLocator = this.page.locator(`//span[text()=' ${this.rankingOption} ']//parent::mat-option//preceding-sibling::button/span/following-sibling::mat-icon`);
                await this.helper.clickElement(this.rankingOptionLocator, "rankingOptionLocatorDropdown");
                await this.helper.clickElement(this.featureSCLPage.editRankingOption, editranking);
                console.log(`${editranking} is selected`);
                break;

            case 'to del':

                // Handle elements under Ranking 02
                this.rankingOption = 'Ranking 02';
                this.rankingOptionLocator = this.page.locator(`//span[text()=' ${this.rankingOption} ']//parent::mat-option//preceding-sibling::button/span/following-sibling::mat-icon`);
                await this.helper.clickElement(this.rankingOptionLocator, "rankingOptionLocatorDropdown");
                await this.helper.clickElement(this.featureSCLPage.editRankingOption, editranking);
                console.log(`${editranking} is selected`);
                break;

            case 'Test 123':

                // Handle elements under 123
                this.rankingOption = '123';
                this.rankingOptionLocator = this.page.locator(`(//span[text()=' ${this.rankingOption} ']//parent::mat-option//preceding-sibling::button/span/following-sibling::mat-icon)[1]`);
                await this.helper.clickElement(this.rankingOptionLocator, "rankingOptionLocatorDropdown");
                await this.helper.clickElement(this.featureSCLPage.editRankingOption, editranking);
                console.log(`${editranking} is selected`);
                break;

            case 'child1':

                // Handle elements under 123
                this.rankingOption = '123';
                this.rankingOptionLocator = this.page.locator(`(//span[text()=' ${this.rankingOption} ']//parent::mat-option//preceding-sibling::button/span/following-sibling::mat-icon)[2]`);
                await this.helper.clickElement(this.rankingOptionLocator, "rankingOptionLocatorDropdown");
                await this.helper.clickElement(this.featureSCLPage.editRankingOption, editranking);
                console.log(`${editranking} is selected`);
                break;

            case 'newranking2':

                // Handle elements under newranking
                this.rankingOption = 'newranking';
                this.rankingOptionLocator = this.page.locator(`//span[text()=' ${this.rankingOption} ']//parent::mat-option//preceding-sibling::button/span/following-sibling::mat-icon`);
                await this.helper.clickElement(this.rankingOptionLocator, "rankingOptionLocatorDropdown");
                await this.helper.clickElement(this.featureSCLPage.editRankingOption, editranking);
                console.log(`${editranking} is selected`);
                break;

            case 'zz':

                // Handle elements under z
                this.rankingOption = 'z';
                this.rankingOptionLocator = this.page.locator(`//span[text()=' ${this.rankingOption} ']//parent::mat-option//preceding-sibling::button/span/following-sibling::mat-icon`);
                await this.helper.clickElement(this.rankingOptionLocator, "rankingOptionLocatorDropdown");
                await this.helper.clickElement(this.featureSCLPage.editRankingOption, editranking);
                console.log(`${editranking} is selected`);
                break;

            case 'zzz':

                // Handle elements under zzz
                this.rankingOption = 'z';
                this.rankingOptionLocator = this.page.locator(`//span[text()=' ${this.rankingOption} ']//parent::mat-option//preceding-sibling::button/span/following-sibling::mat-icon`);
                await this.helper.clickElement(this.rankingOptionLocator, "rankingOptionLocatorDropdown");
                this.rankingOption = 'zz';
                this.rankingOptionLocator = this.page.locator(`//span[text()=' ${this.rankingOption} ']//parent::mat-option//preceding-sibling::button/span/following-sibling::mat-icon`);
                await this.helper.clickElement(this.rankingOptionLocator, "rankingOptionLocatorNestedDropdown");
                await this.helper.clickElement(this.featureSCLPage.editRankingOption, editranking);
                console.log(`${editranking} is selected`);
                break;

            case 'S-03-02':

                // Handle elements under S-03-02
                this.rankingOption = '3.3';
                this.rankingOptionLocator = this.page.locator(`//span[text()=' ${this.rankingOption} ']//parent::mat-option//preceding-sibling::button/span/following-sibling::mat-icon`);
                await this.helper.clickElement(this.rankingOptionLocator, "rankingOptionLocatorDropdown");
                this.rankingOption = 'Test 123';
                this.rankingOptionLocator = this.page.locator(`//span[text()=' ${this.rankingOption} ']//parent::mat-option//preceding-sibling::button/span/following-sibling::mat-icon`);
                await this.helper.clickElement(this.rankingOptionLocator, "rankingOptionLocatorNestedDropdown");
                await this.helper.clickElement(this.featureSCLPage.editRankingOption, editranking);
                console.log(`${editranking} is selected`);
                break;

            case 'Ranking 002':

                // Handle elements under Ranking 002
                this.rankingOption = 'ranking 0';
                this.rankingOptionLocator = this.page.locator(`//span[text()=' ${this.rankingOption} ']//parent::mat-option//preceding-sibling::button/span/following-sibling::mat-icon`);
                await this.helper.clickElement(this.rankingOptionLocator, "rankingOptionLocatorDropdown");
                this.rankingOption = 'Raking 01';
                this.rankingOptionLocator = this.page.locator(`//span[text()=' ${this.rankingOption} ']//parent::mat-option//preceding-sibling::button/span/following-sibling::mat-icon`);
                await this.helper.clickElement(this.rankingOptionLocator, "rankingOptionLocatorNestedDropdown");
                await this.helper.clickElement(this.featureSCLPage.editRankingOption, editranking);
                console.log(`${editranking} is selected`);
                break;

            default:
                console.log(`Ranking ${editranking} is not recognized.`);
                break;
        }


        //feature family category option
        await this.helper.assertElementVisible(this.featureSCLPage.featureFamilyCategories, "feature_family_categories");
        await this.helper.clickElement(this.featureSCLPage.featureFamilyCategories, "feature_family_categories");
        await this.helper.clickElement(this.featureSCLPage.featureFamilyCategoriesOption, 'old_feature_family_category_option');
        await this.helper.clickElement(this.featureSCLPage.editFeatureFamilyCategoryOption, "feature_family_categories_option");
        await this.page.keyboard.press('Tab');

        // //si explicit option
        // await this.helper.assertElementVisible(this.featureSCLPage.siExplicit, "Si_Explicit");
        // await this.helper.clickElement(this.featureSCLPage.siExplicit, "Si_Explicit");
        // await this.helper.clickElement(this.featureSCLPage.siExplicitOption, "Si_Explicit_Option");
        // await this.helper.clickElement(this.featureSCLPage.editSiExplicitOption, 'edit_si_explicit_option');
        // await this.page.keyboard.press('Tab');


        // //si exclusion option
        // await this.helper.assertElementVisible(this.featureSCLPage.siExclusion, "Si_Explicit");
        // await this.helper.clickElement(this.featureSCLPage.siExclusion, "Si_Explicit");
        // await this.helper.clickElement(this.featureSCLPage.siExclusionOption, "Si_Explicit_Option");
        // await this.helper.clickElement(this.featureSCLPage.editSiExclusion, 'edit_si_exclusion_option');
        // await this.page.keyboard.press('Tab');


        // // select mandatory with structure
        // await this.helper.assertElementVisible(this.featureSCLPage.mandatoryWithStructure, "Mandatory_with_Structure");
        // await this.helper.clickElement(this.featureSCLPage.mandatoryWithStructure, "Mandatory_with_Structure");
        // await this.helper.clickElement(this.featureSCLPage.mandatoryWithStructureOption, "mandatory_with_Structure_Option");
        // await this.helper.clickElement(this.featureSCLPage.editMandatoryWithStructure, 'edit_mandatory_option');
        // await this.page.keyboard.press('Tab');

        // // select mandatory with responsibilities
        // await this.helper.assertElementVisible(this.featureSCLPage.MandatorywithResponsibility, "Mandatory_with_Responsibility");
        // await this.helper.clickElement(this.featureSCLPage.MandatorywithResponsibility, "Mandatory_with_Responsibility");
        // await this.helper.clickElement(this.featureSCLPage.editMandatoryWithResponsible, "mandatory_with_Responsibilty_Option");

        // edit localised description
        const editLocalizedDescriptionText = `${testData_SCL_FF.editTestData.localizedDescription}_${await this.helper.generateRandomText(3)}`;
        await this.helper.assertElementVisible(this.featureSCLPage.editLocalisedDesc, "localizedDescriptionEn");
        await this.helper.clearText(this.featureSCLPage.editLocalisedDesc, 'clear_localised_Desc');
        await this.helper.enterText(this.featureSCLPage.localizedDescriptionEn, editLocalizedDescriptionText, "localizedDescriptionEn");

        //edit explicative description
        await this.helper.assertElementVisible(this.featureSCLPage.editExplicativeNotes, "explicativeNotes");
        await this.helper.clearText(this.featureSCLPage.editExplicativeNotes, 'clear_explicative_notes');
        await this.helper.enterText(this.featureSCLPage.editExplicativeNotes, testData_SCL_FF.editTestData.localizedDescription, "explicativeNotes");

        await this.helper.assertElementVisible(this.featureSCLPage.saveButton, 'edited_save');
        await this.helper.clickElement(this.featureSCLPage.saveButton, 'click_save_button');
        await this.featureSCLPage.confirmationBtn.waitFor({ state: 'visible' });
        await this.helper.clickElement(this.featureSCLPage.confirmationBtn, 'confirmation');
        await this.helper.assertElementHasText(this.featureSCLPage.successMessage, 'SUCCESS', 'SUCCESS message displayed');


        //history part
        await this.helper.assertElementVisible(this.featureSCLPage.historyIcon1, 'history_icon');
        await this.helper.clickElement(this.featureSCLPage.historyIcon1, 'history_icon');
        await this.helper.assertElementVisible(this.featureSCLPage.historyBlock, 'history_block');

        if (await this.featureSCLPage.rankingHistory.isVisible()) {
            const oldText = await this.featureSCLPage.oldRankingText.textContent();
            const newText = await this.featureSCLPage.newRankingText.textContent();
            if (oldText == testData_SCL_FF.testData.ranking && newText == testData_SCL_FF.editTestData.ranking) {
                console.log("ranking data is validated");
            }
        }

        if (await this.featureSCLPage.siexplicitHistory.isVisible()) {
            const oldText = await this.featureSCLPage.oldSiExplicitText.textContent();
            const newText = await this.featureSCLPage.newSiExplicitText.textContent();
            if (oldText == testData_SCL_FF.testData.Si_Explicit && newText == testData_SCL_FF.editTestData.Si_Explicit) {
                console.log("si excplicit data is validated");
            }
        }

        if (await this.featureSCLPage.descHistory.isVisible()) {
            const oldText = await this.featureSCLPage.oldDescText.textContent();
            const newText = await this.featureSCLPage.newDescText.textContent();
            if (oldText == this.localizedDescriptionText && newText == this.editLocalizedDescriptionText) {
                console.log("description data is validated");
            }
        }

        // if (await this.featureSCLPage.mandWithRespHistory.isVisible()) {
        //     const oldText = await this.featureSCLPage.oldMandWithRespText.textContent();
        //     const newText = await this.featureSCLPage.newMandWithRespText.textContent();
        //     if (oldText == testData_SCL_FF.testData.Mandatory_with_Responsibility && newText == testData_SCL_FF.editTestData.Mandatory_with_Responsibility) {
        //         console.log("mandatory with responsible data is validated");
        //     }
        // }

        if (await this.featureSCLPage.mandWithStructHistory.isVisible()) {
            const oldText: any = await this.featureSCLPage.oldMandWithStructText.textContent();
            const newText: any = await this.featureSCLPage.newMandWithStructText.textContent();
            if (testData_SCL_FF.testData.Mandatory_With_Structure.includes(oldText) && testData_SCL_FF.editTestData.Mandatory_With_Structure.includes(newText)) {
                console.log("mandatory with structure data is validated");
            }

        }

        if (await this.featureSCLPage.explicativeNoteHistory.isVisible()) {
            const oldText = await this.featureSCLPage.oldExplicativeNoteText.textContent();
            const newText = await this.featureSCLPage.newExplicativeNoteText.textContent();
            if (oldText == testData_SCL_FF.testData.localizedDescription && newText == testData_SCL_FF.editTestData.localizedDescription) {
                console.log("explicative note  data is validated");
            }
        }



        if (await this.featureSCLPage.categoryHistory.isVisible()) {
            const oldText = await this.featureSCLPage.oldCategoryText.textContent();
            const newText = await this.featureSCLPage.newCategoryText.textContent();
            if (oldText == testData_SCL_FF.testData.feature_family_categories && newText == testData_SCL_FF.editTestData.feature_family_categories) {
                console.log("feature family category data is validated");
            }
        }

        if (await this.featureSCLPage.siExclusionHistory.isVisible()) {
            const oldText = await this.featureSCLPage.oldSiExclusionText.textContent();
            const newText = await this.featureSCLPage.newSiExclusionText.textContent();
            if (oldText == testData_SCL_FF.testData.Si_Exclusion && newText == testData_SCL_FF.editTestData.Si_Exclusion) {
                console.log("si exclusion data is validated");
            }
        }

        if (await this.featureSCLPage.featureFamilyTypeHistory.isVisible()) {
            const oldText: any = await this.featureSCLPage.oldFeatureFamilyTypeText.textContent();
            const newText: any = await this.featureSCLPage.newFeatureFamilyTypeText.textContent();
            if (testData_SCL_FF.testData.feature_family_type.includes(oldText) && testData_SCL_FF.editTestData.feature_family_type.includes(newText)) {
                console.log("feature family type data is validated");
            }

        }

        await this.page.waitForTimeout(1000);
        await this.helper.assertElementVisible(this.featureSCLPage.closeHistoryIcon, 'closeButton');
        await this.helper.clickElement(this.featureSCLPage.closeHistoryIcon, 'closeHistoryClicked');

    }

    async navigateTo_create_SCL_feature_value(salesCode, featureValue) {

        //navigate to Generic Dictionary
        await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
        await this.helper.clickElement(this.homePage.genericDict, 'genericDict');

        // go to create SCL Feature value
        await this.helper.clickElement(this.homePage.createFeatureValue, 'createFeatureValue');
        await this.helper.assertElementVisible(this.featureSCLPage.createSCLFamilyValue, 'createSCLFamilyValue');
        await this.helper.clickElement(this.featureSCLPage.createSCLFamilyValue, 'createSCLFamilyValue');


        // Verify Next button is disabled
        const nextButtonDisabled = await this.helper.assertElementDisabled(this.featureSCLPage.nextBtn, "Next button");

        while (nextButtonDisabled) {
            await this.helper.clickElement(this.featureSCLPage.selectFeatureFamily, 'selectFeatureFamily');

            await this.helper.enterText(this.featureSCLPage.selectFeatureFamily, this.scl_familyCode, 'manualCodeInput');
           
            await this.page.waitForTimeout(3000)
            await this.helper.clickElement(this.featureSCLPage.secondOption, 'secondOption');
            await this.helper.assertElementEnabled(this.featureSCLPage.manualCode, 'manualCode');

            let length = await this.helper.getRandomNumber(2, 3);
            let manualCode = await this.helper.generateRandomManualCode(length);
            await this.helper.enterText(this.featureSCLPage.manualCodeInput, manualCode, 'manualCodeInput');
            await this.helper.clickElement(this.featureSCLPage.checkManualCodeIcon, 'checkManualCodeIcon');
            await this.page.waitForTimeout(3000)

            while (true) {
                const result = await this.helper.checkLocators(this.featureSCLPage.format, this.featureSCLPage.availability, this.featureSCLPage.valid);
                if (result) {
                    this.sclManualCode = manualCode;
                    console.log("Feature Value Code Selected: ", this.sclManualCode);
                    break;
                }
                else {
                    await this.helper.clearText(this.featureSCLPage.manualCodeInput, "clearManualCode");
                    let length = await this.helper.getRandomNumber(2, 3);
                    manualCode = await this.helper.generateRandomManualCode(length);
                    await this.helper.enterText(this.featureSCLPage.manualCodeInput, manualCode, 'manualCodeInput');
                    await this.helper.clickElement(this.featureSCLPage.checkManualCodeIcon, 'checkManualCodeIcon');
                    await this.page.waitForTimeout(3000)
                }
            }

            // Validate that Next button is still disabled
            const nextButtonStillDisabled = await this.helper.assertElementDisabled(this.featureSCLPage.nextBtn, "Next button");
            if (!nextButtonStillDisabled) {
                break; // Exit the loop if Next button is enabled
            }

        }

        //click on Next button
        await this.helper.clickElement(this.featureSCLPage.nextBtn, "Next button");

        // Verify Next button is disabled
        const isNextButtonDisabled = await this.helper.assertElementDisabled(this.featureSCLPage.secondPageNextBtn, "Next button");

        while (isNextButtonDisabled) {

            await this.helper.assertElementVisible(this.featureSCLPage.inputFamilydescEN, 'inputFamilydescEN')
            const valuefamilydescEN = await this.featureSCLPage.inputFamilydescEN.inputValue();
            console.log(valuefamilydescEN);

            //filling the fields

            await this.helper.assertElementVisible(this.featureSCLPage.radioBtnOpts, 'radioButtonOptions')
            await this.helper.clickElement(this.featureSCLPage.radioBtn, "confidentialRadioButton");
            console.log(`Confidential is selected as ${testData_SCL_FF.testData.confidential}`);

            await this.helper.assertElementVisible(this.featureSCLPage.singleFeatureValueDesc, 'singleFeatureValueDesc')
            await this.helper.enterText(this.featureSCLPage.singleFeatureValueDesc, testData_SCL_FF.testData.singleFeatureValueDesc, 'singleFeatureValueDesc')

            await this.helper.assertElementVisible(this.featureSCLPage.copyDestination, 'copyDestination')
            await this.helper.clickElement(this.featureSCLPage.copyDestination, 'copyDestination')

            await this.helper.assertElementVisible(this.featureSCLPage.language1, 'language1')
            await this.helper.clickElement(this.featureSCLPage.language1, 'language1')
            await this.helper.clickElement(this.featureSCLPage.language1Option, 'language1Option')
            await this.page.waitForTimeout(10000)

            await this.helper.assertElementVisible(this.featureSCLPage.addBtn1, 'addButton1')
            await this.helper.clickElement(this.featureSCLPage.addBtn1, 'addButton1')

            await this.helper.assertElementVisible(this.featureSCLPage.singleFeatureValueDescLang, 'singleFeatureValueDescLang')

            await this.helper.assertElementVisible(this.featureSCLPage.fullShortDesc, 'fullShortDescription')
            await this.helper.assertTextboxValue(this.featureSCLPage.fullShortDesc, valuefamilydescEN + '-' + testData_SCL_FF.testData.singleFeatureValueDesc, 'fullShortDescription')

            await this.helper.assertElementVisible(this.featureSCLPage.fullLongDesc, 'fullLongDescription')
            await this.helper.assertTextboxValue(this.featureSCLPage.fullLongDesc, valuefamilydescEN + '-' + testData_SCL_FF.testData.singleFeatureValueDesc, 'fullLongtDescription')

            await this.helper.assertElementVisible(this.featureSCLPage.otherDesc, 'otherDescription')
            await this.helper.clickElement(this.featureSCLPage.otherDesc, 'otherDescription')
            await this.helper.clickElement(this.featureSCLPage.systemOption, 'systemOption')

            if (await this.featureSCLPage.otherDescXp.isVisible()) {
                await this.helper.enterText(this.featureSCLPage.otherDescXp, testData_SCL_FF.testData.otherShortDescXp, 'otherShortDescriptionXp')
            }

            if (await this.featureSCLPage.otherDescXF.isVisible()) {
                await this.helper.enterText(this.featureSCLPage.otherDescXF, testData_SCL_FF.testData.otherShortDescXF, 'otherShortDescriptionXF')
            }

            await this.helper.assertElementVisible(this.featureSCLPage.explicativeNote, 'explicativeNote')
            await this.helper.enterText(this.featureSCLPage.explicativeNote, testData_SCL_FF.testData.explicativeNote, 'explicativeNote')
            await this.page.waitForTimeout(3000)

            // Validate that Next button is still disabled
            const isNextButtonStillDisabled = await this.helper.assertElementDisabled(this.featureSCLPage.secondPageNextBtn, "Next button");
            if (!isNextButtonStillDisabled) {
                break; // Exit the loop if Next button is enabled
            } //if

        }

        //IF NEXT BUTTON IS CLICKED
        await this.helper.assertElementVisible(this.featureSCLPage.nextButton, 'nextButton')
        await this.helper.clickElement(this.featureSCLPage.nextButton, 'nextButton')
        await this.page.waitForTimeout(6000)

        //add stv class code
        await this.helper.assertElementVisible(this.featureSCLPage.salesCodeSTV, "salesCodeSTV");
        await this.helper.clickElement(this.featureSCLPage.searchClassCodeSTV, "searchClassCodeSTV"); //first serach icon

        const classCodeText = salesCode?.trim() ?? '';
        console.log(classCodeText, " entered in STV sales code");

        await this.helper.clickElement(this.featureSCLPage.searchClassCode, "salesCode");

        await this.helper.enterText(this.featureSCLPage.searchClassCode, classCodeText, "salesCode");

        await this.helper.clickElement(this.featureSCLPage.advancedSTVSearch, "advancedSTVSearch"); //second search icon

        this.firstClassCode = this.page.locator(`//mat-cell//a[text()='${classCodeText}']`)

        await this.helper.clickElement(this.firstClassCode, "first sales code");
        await this.page.waitForTimeout(6000)

        const isConfirmationSTVVisible = await this.featureSCLPage.differentDescriptionConfirmationBox.isVisible({ timeout: 10000 })
        if (isConfirmationSTVVisible) {
            await this.featureSCLPage.differentDescriptionConfirmationBox.waitFor({ state: 'visible' });
            await this.helper.clickElement(this.featureSCLPage.confirmationBtn, "differentDescriptionConfirmationBox");
        }

        //WPC family code
        await this.helper.assertElementVisible(this.featureSCLPage.featureValueWPC, "featureValueWPCC");
        await this.helper.clickElement(this.featureSCLPage.searchFamilyCodeWPC, "searchFamilyCodeWPC");

        const familyCodeText = featureValue?.trim() ?? '';
        console.log(familyCodeText, " entered in WPC feature value");

        await this.helper.clickElement(this.featureSCLPage.searchClassCode, "familyCodeText");
        await this.helper.enterText(this.featureSCLPage.searchClassCode, familyCodeText, "familyCodeText");

        await this.helper.clickElement(this.featureSCLPage.advancedSTVSearch, "advancedSTVSearch");

        this.firstClassCode = this.page.locator(`//mat-cell//a[text()='${familyCodeText}']`)

        await this.helper.clickElement(this.firstClassCode, "first class code");
        await this.page.waitForTimeout(3000)

        const isConfirmationWPCVisible = await this.featureSCLPage.differentDescriptionConfirmationBox.isVisible({ timeout: 10000 })
        if (isConfirmationWPCVisible) {

            //await this.featureSCLPage.differentDescriptionConfirmationBox.waitFor({state: 'visible'});
            await this.helper.clickElement(this.featureSCLPage.confirmationBtn2, "differentDescriptionConfirmationBox");
        }


        await this.page.waitForTimeout(4000)

        // Click Validate button
        await this.helper.clickElement(this.featureSCLPage.validateBtn, 'Validate');
        await this.featureSCLPage.confirmationBtn.waitFor({ state: 'visible' });
        await this.helper.clickElement(this.featureSCLPage.confirmationBtn, 'confirmation');

        await this.page.waitForTimeout(4000)
        // const isSuccessVisible = await this.featureSCLPage.successMessage.isVisible({ timeout: 7000 });
        // if (isSuccessVisible) {
        await this.helper.assertElementHasText(this.featureSCLPage.successMessage, 'SUCCESS', 'SUCCESS message displayed');
        // }
        // else {
        //     console.log('Error')
        // }

        return this.scl_familyValue;
    }
}