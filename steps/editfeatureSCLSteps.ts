import { Locator, Page, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { FeatureSCLPage } from '../pages/featureSCLPage';
import testData_SCL_FF from '../test-data/testData_SCL_FF.json';
import { attachment } from 'allure-js-commons';

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
    private featureSCLPage: FeatureSCLPage;
    private selectRandomCode: Locator;
    private classCode: string;
    private code: string;
    private rankingOptionLocator: Locator;
    private rankingOption: string;
    private sclManualCode: string;
    private salesCode: string;
    private verifiedSalesData: Locator;
    private firstCodeFromList: Locator;


    //constructor to initialize the objects
    constructor(page: Page, testInfo: TestInfo, stepHelper: StepHelper) {
        this.page = page;
        this.testInfo = testInfo;
        this.helper = stepHelper;
        this.homePage = new HomePage(page);
        this.featureSCLPage = new FeatureSCLPage(page);
        this.classCode = '';
        this.rankingOption = '';
        this.code = '';
        this.sclManualCode = '';
    }

    //Editing SCL class code flow
    async navigateTo_edit_SCL_feature_value(scl_familyCode) {

        //navigate to Generic Dictionary
        await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
        await this.helper.clickElement(this.homePage.genericDict, 'genericDict');

        // go to create SCL Feature value
        await this.helper.clickElement(this.homePage.createFeatureValue, 'createFeatureValue');
        await this.helper.assertElementVisible(this.featureSCLPage.createSCLFamilyValue, 'createSCLFamilyValue');
        await this.helper.clickElement(this.featureSCLPage.createSCLFamilyValue, 'createSCLFamilyValue');

        await this.helper.enterText(this.featureSCLPage.selectCode, scl_familyCode, "scl family code");

        await this.page.waitForTimeout(3000);

        this.firstCodeFromList = this.page.locator(`//mat-option/span[text()=' ${scl_familyCode} ']`);
        await this.helper.clickElement(this.firstCodeFromList, "firstCodeFromList");


        // Verify Next button is disabled
        const nextButtonDisabled = await this.helper.assertElementDisabled(this.featureSCLPage.nextBtn, "Next button");
        let randomNum = await this.helper.generateRandomFeatureCode(4);
        while (nextButtonDisabled) {

            await this.helper.clickElement(this.featureSCLPage.selectFeatureFamily, 'selectFeatureFamily');
            await this.helper.clickElement(this.featureSCLPage.secondOption, 'secondOption');

            await this.helper.assertElementEnabled(this.featureSCLPage.manualCode, 'manualCode');

            let length = await this.helper.codeLength();
            let manualCode = await this.helper.generateRandomManualCode(length);

            await this.helper.enterText(this.featureSCLPage.manualCodeInput, manualCode, 'manualCodeInput');
            await this.helper.clickElement(this.featureSCLPage.checkManualCodeIcon, 'checkManualCodeIcon');
            await this.page.waitForTimeout(5000);

            while (true) {
                const result = await this.helper.checkLocators(this.featureSCLPage.format, this.featureSCLPage.availability, this.featureSCLPage.valid);
                if (result) {
                    this.sclManualCode = manualCode;
                    break;
                }
                else {
                    await this.helper.clearText(this.featureSCLPage.manualCodeInput, "clearManualCode");
                    let length = await this.helper.codeLength();
                    manualCode = await this.helper.generateRandomManualCode(length);
                    await this.helper.enterText(this.featureSCLPage.manualCodeInput, manualCode, 'manualCodeInput');
                    await this.helper.clickElement(this.featureSCLPage.checkManualCodeIcon, 'checkManualCodeIcon');
                    await this.page.waitForTimeout(5000);
                }
            }

            // Validate that Next button is still disabled
            const nextButtonStillDisabled = await this.helper.assertElementDisabled(this.featureSCLPage.nextBtn, "Next button");
            if (!nextButtonStillDisabled) {
                break;
            }

        }

        //click on Next button
        await this.helper.clickElement(this.featureSCLPage.nextBtn, "Next button");

        await this.helper.assertElementVisible(this.featureSCLPage.calBtn, 'calBtn')
        await this.helper.clickElement(this.featureSCLPage.calBtn, 'calBtn')
        await this.page.waitForTimeout(5000);

        await this.helper.assertElementVisible(this.featureSCLPage.calDate, 'calDate')
        await this.helper.clickElement(this.featureSCLPage.calDate, 'calDate')
        await this.page.waitForTimeout(5000);

        await this.helper.assertElementVisible(this.featureSCLPage.radioBtnOpts, 'radioButtonOptions')
        await this.helper.clickElement(this.featureSCLPage.radioBtn, "confidentialRadioButton");
        attachment('Confidential radio button', `Confidential is selected as ${testData_SCL_FF.testData1.confidential}`, 'text/plain');

        await this.helper.assertElementVisible(this.featureSCLPage.singleFeatureValueDesc, 'singleFeatureValueDesc')
        await this.helper.enterText(this.featureSCLPage.singleFeatureValueDesc, testData_SCL_FF.testData1.singleFeatureValueDesc + randomNum, 'singleFeatureValueDesc')
        await this.page.waitForTimeout(5000);
        const sFeatureValueO = await this.featureSCLPage.singleFeatureValueDesc.inputValue();

        console.log("single feature value description: " + sFeatureValueO);
        attachment("single feature value description", `single feature value description: ${sFeatureValueO}`, "text/plain");

        await this.helper.assertElementVisible(this.featureSCLPage.copyDestination, 'copyDestination')
        await this.helper.clickElement(this.featureSCLPage.copyDestination, 'copyDestination')
        await this.page.waitForTimeout(5000);
        await this.helper.assertElementVisible(this.featureSCLPage.fullShortDesc, 'fullShortDescription')
        const fullShortDescO = await this.featureSCLPage.fullShortDesc.inputValue();

        console.log("full short description: " + fullShortDescO);
        attachment("full short description: ", `full short description: ${fullShortDescO}`, "text/plain");

        await this.helper.assertElementVisible(this.featureSCLPage.fullLongDesc, 'fullLongDescription')
        const fullLongDescO = await this.featureSCLPage.fullLongDesc.inputValue();

        console.log("full Long description: " + fullLongDescO);
        attachment("full Long description", `full Long description: ${fullLongDescO}`, "text/plain");

        let otherDescXpO;
        if (await this.featureSCLPage.otherDescXp.isVisible()) {
            await this.helper.enterText(this.featureSCLPage.otherDescXp, testData_SCL_FF.testData1.otherShortDescXp + randomNum, 'otherShortDescriptionXp')
            otherDescXpO = await this.featureSCLPage.otherDescXp.inputValue();

            console.log("other xp description: " + otherDescXpO);
            attachment("other xp description", `other xp description ${otherDescXpO}`, "text/plain");
        }

        if (await this.featureSCLPage.otherDescXF.isVisible()) {
            await this.helper.enterText(this.featureSCLPage.otherDescXF, testData_SCL_FF.testData1.otherShortDescXF + randomNum, 'otherShortDescriptionXF')
            const otherDescXfO = await this.featureSCLPage.otherDescXF.inputValue();

            console.log("other xf description: " + otherDescXfO);
            attachment("other xf description", `other xf description: ${otherDescXfO}`, "text/plain");
        }

        await this.helper.assertElementVisible(this.featureSCLPage.explicativeNote, "explicativeText")
        await this.helper.enterText(this.featureSCLPage.explicativeNote, testData_SCL_FF.testData1.expliciveText + randomNum, 'explicativeText');
        const explicativeNoteO = await this.featureSCLPage.explicativeNote.inputValue();

        console.log("explicative note: " + explicativeNoteO);
        attachment("explicative Note", `explicative note: ${explicativeNoteO}`, "text/plain");

        await this.helper.clickElement(this.featureSCLPage.saveWoMap, 'saveWithoutMapping')
        await this.helper.clickElement(this.featureSCLPage.confirmationBtn, 'confirmationButton')
        await this.helper.assertElementVisible(this.featureSCLPage.successMessage, 'SUCCESS Message')
        await this.helper.assertElementHasText(this.featureSCLPage.successMessage, 'SUCCESS', 'SUCCESS message displayed');


        //edit part start
        let randomNumE = await this.helper.generateRandomFeatureCode(4);
     
        //single feature value description
        await this.helper.assertElementVisible(this.featureSCLPage.singleFeatureValueDesc, 'edit singleFeatureValueDesc')
        await this.helper.clearText(this.featureSCLPage.singleFeatureValueDesc, "clear explicativeText")
        await this.page.waitForTimeout(5000);
        await this.helper.enterText(this.featureSCLPage.singleFeatureValueDesc, testData_SCL_FF.testData1.singleFeatureValueDesc + randomNumE, 'edit singleFeatureValueDesc')
        await this.page.waitForTimeout(5000);
        const sFeatureValueN = await this.featureSCLPage.singleFeatureValueDesc.inputValue();

        console.log("new single feature value description: " + sFeatureValueN);
        attachment("New Single feature value Description", `new single feature value description: ${sFeatureValueN}`, "text/plain");

        await this.helper.assertElementVisible(this.featureSCLPage.copyDestination, 'copyDestination')
        await this.helper.clickElement(this.featureSCLPage.copyDestination, 'copyDestination')
        await this.page.waitForTimeout(5000);
        await this.helper.assertElementVisible(this.featureSCLPage.fullShortDesc, 'fullShortDescription')
        const fullShortDescN = await this.featureSCLPage.fullShortDesc.inputValue();

        console.log("new full short description: " + fullShortDescN);
        attachment("new full short description ", `new full short description: ${fullShortDescN}`, "text/plain");

        //other description
        let otherDescXpN;
        if (await this.featureSCLPage.otherDescXp.isVisible()) {
            await this.helper.clearText(this.featureSCLPage.otherDescXp, "clear explicativeText")
            await this.page.waitForTimeout(5000);
            await this.helper.enterText(this.featureSCLPage.otherDescXp, testData_SCL_FF.testData1.otherShortDescXp + randomNumE, 'otherShortDescriptionXp')
            otherDescXpN = await this.featureSCLPage.otherDescXp.inputValue();

            console.log("new other description: " + otherDescXpN);
            attachment("New other description", `New other description: ${otherDescXpN}`, "text/plain");
        }

        let otherDescXFN;
        if (await this.featureSCLPage.otherDescXF.isVisible()) {
            await this.helper.clearText(this.featureSCLPage.otherDescXF, "clear explicativeText")
            await this.page.waitForTimeout(5000);
            await this.helper.enterText(this.featureSCLPage.otherDescXF, testData_SCL_FF.testData1.otherShortDescXF + randomNumE, 'otherShortDescriptionXF')
            otherDescXFN = await this.featureSCLPage.otherDescXp.inputValue();

            console.log("new other description: " + otherDescXFN);
            attachment("New other description", `New other description: ${otherDescXFN}`, "text/plain");
        }

        //full long description
        await this.helper.assertElementVisible(this.featureSCLPage.fullLongDesc, 'fullLongDescription')
        const fullLongDescN = await this.featureSCLPage.fullLongDesc.inputValue();

        console.log("full Long description: " + fullLongDescN);
        attachment("Full Long description", `Full Long description: ${fullLongDescN}`, "text/plain");

        //explicative note
        await this.helper.assertElementVisible(this.featureSCLPage.explicativeNote, "explicativeText")
        await this.helper.clearText(this.featureSCLPage.explicativeNote, "clear explicativeText")
        await this.page.waitForTimeout(5000);
        await this.helper.enterText(this.featureSCLPage.explicativeNote, testData_SCL_FF.testData1.expliciveText2 + randomNumE, 're-enter explicativeText');
        await this.page.waitForTimeout(5000);
        const explicativeNoteN = await this.featureSCLPage.explicativeNote.inputValue();
        
        console.log("new explicative note: " + explicativeNoteN);
        attachment("New explicative note",`New explicative note: ${explicativeNoteN}`,"text/plain");

        await this.helper.assertElementVisible(this.featureSCLPage.saveBtn, 'saveBtn')
        await this.helper.clickElement(this.featureSCLPage.saveBtn, 'saveBtn')
        await this.helper.clickElement(this.featureSCLPage.confirmationBtn, 'confirmationButton')

        const expSalesText = `Edit feature value ${this.sclManualCode} with success`;
        this.verifiedSalesData = this.page.locator(`//p[contains(text(),'${expSalesText}')]`);
        await this.helper.assertElementHasText(this.verifiedSalesData, expSalesText, 'Edit message displayed');
              
        let salesCodeTxtArray = await this.verifiedSalesData.allTextContents();
        let salesCodeTxt = salesCodeTxtArray.join("\n"); 
        attachment("Sales code", salesCodeTxt, "text/plain");
        
        // Validate changes in history
        await this.helper.assertElementVisible(this.featureSCLPage.historyIcon, "historyIcon");
        await this.helper.clickElement(this.featureSCLPage.historyIcon, "historyIcon");


        // Wait for the history modal to appear
        await this.helper.assertElementVisible(this.featureSCLPage.historyModal, "historyModal");

        //for full long desc
        if (await this.featureSCLPage.fullLongDescHis.isVisible()) {
            await this.helper.assertElementHasText(this.featureSCLPage.oldOfullLongDescHis, fullLongDescO, "oldexplicativeNote");
            await this.helper.assertElementHasText(this.featureSCLPage.newfullLongDescHis, fullLongDescN, "newexplicativeNote");
        }
        //for full short desc
        if (await this.featureSCLPage.fullShortDescHis.isVisible()) {
            await this.helper.assertElementHasText(this.featureSCLPage.oldfullShortDescHis, fullShortDescO, "oldfullShortDescHis");
            await this.helper.assertElementHasText(this.featureSCLPage.newfullShortDescHis, fullShortDescN, "newfullShortDescHis");
        }
        //for single feature
        if (await this.featureSCLPage.SingleFeatureDescHis.isVisible()) {
            await this.helper.assertElementHasText(this.featureSCLPage.oldSingleFeatureDescHis, sFeatureValueO, "oldSingleFeatureDescHis");
            await this.helper.assertElementHasText(this.featureSCLPage.newSingleFeatureDescHis, sFeatureValueN, "newSingleFeatureDescHis");
        }
        //for other feature
        if (await this.featureSCLPage.OtherDescHis.isVisible()) {
            await this.helper.assertElementHasText(this.featureSCLPage.oldOtherDescHis, otherDescXpO, "oldOtherDescHis");
            await this.helper.assertElementHasText(this.featureSCLPage.newOtherDescHis, otherDescXpN, "newOtherDescHis");
        }
        //for explicative note
        if (await this.featureSCLPage.explicativeNote.isVisible()) {
            await this.helper.assertElementHasText(this.featureSCLPage.oldExplicativeNote, explicativeNoteO, "oldexplicativeNote");
            await this.helper.assertElementHasText(this.featureSCLPage.newExplicativeNote, explicativeNoteN, "newexplicativeNote");
        }

    }

}