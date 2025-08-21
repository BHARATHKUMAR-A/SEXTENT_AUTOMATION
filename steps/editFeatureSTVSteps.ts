import { Locator, Page, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { FeatureSTVPage } from '../pages/featureSTVPage';
import testData_STV_FF from '../test-data/testData_STV_FF.json';

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
    generateCode:(length : number) => Promise<string>;
    codeLength:() => Promise<number>;
    checkLocators:(locator1:any,locator2:any,locator3:any) => Promise<boolean>;
    clearText:(locator:any,text:string) => Promise<void>;
    assertElementTextContainedIn:(locator:any,text:string,label:string) => Promise<void>;
}

export class EditFeatureSTVSteps {
    private page: Page;
    private testInfo: TestInfo;
    private helper: StepHelper;
    private homePage: HomePage;
    private featureSTVPage: FeatureSTVPage;
    private selectRandomCode: Locator;
    private stvCode: string;
    private salesCode : string;
    private verifiedData : Locator;
    private verifiedSalesData : Locator;

    //constructor to initialize the objects
    constructor(page: Page, testInfo: TestInfo, stepHelper: StepHelper) {
        this.page = page;
        this.testInfo = testInfo;
        this.helper = stepHelper;
        this.homePage = new HomePage(page);
        this.featureSTVPage = new FeatureSTVPage(page);
        this.stvCode = '';
        this.salesCode = '';
    }

    //STV class code
    async navigateTo_create_edit_history_STV_class_code() {

        //navigate to Generic Dictionary
        await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
        await this.helper.clickElement(this.homePage.genericDict, 'genericDict');

        //go to create STV Class Code 
        await this.helper.clickElement(this.homePage.createFamilyFeature, 'createFamilyFeature');
        await this.helper.clickElement(this.featureSTVPage.createSTVClassCode, 'createSTVClassCode');

        //generate random manual code
        let length = await this.helper.codeLength();
        let genCode = await this.helper.generateCode(length);
        await this.helper.enterText(this.featureSTVPage.manualCodeTextbox,genCode,'manualCodeTextBox');
        await this.helper.clickElement(this.featureSTVPage.checkManualCodeIcon,'manualCodeCheck');
        await this.helper.assertElementVisible(this.featureSTVPage.manualCodeMessage,"manualCodeMessage")
 
        while (true) {
            const result = await this.helper.checkLocators(this.featureSTVPage.format, this.featureSTVPage.availability, this.featureSTVPage.valid);
            if (result) {
                this.stvCode = genCode;
                break;
            }
            else {
                await this.helper.clearText(this.featureSTVPage.manualCodeTextbox, "clearManualCode");
                let length = await this.helper.codeLength();
                genCode = await this.helper.generateCode(length);
                await this.helper.enterText(this.featureSTVPage.manualCodeTextbox, genCode, 'manualCodeInput')
                await this.helper.clickElement(this.featureSTVPage.checkManualCodeIcon, 'checkManualCodeIcon');
 
                await this.helper.assertElementVisible(this.featureSTVPage.manualCodeMessage,"manualCodeMessage")
 
            }
        }
        
        await this.helper.clickElement(this.featureSTVPage.nextButton,'nextButton');

        
        //enter description control
        await this.helper.assertElementVisible(this.featureSTVPage.descriptionControl, "descriptionControl");
        await this.helper.enterText(this.featureSTVPage.descriptionControl, testData_STV_FF.testData.description, "descriptionControl");

        //select typology
        await this.helper.assertElementVisible(this.featureSTVPage.typology, "typology");
        await this.helper.clickElement(this.featureSTVPage.typology, "typology");
        await this.helper.clickElement(this.featureSTVPage.typologyOptions, "typologyOptions");

        
        //select category
        await this.helper.assertElementVisible(this.featureSTVPage.category, "category");
        await this.helper.clickElement(this.featureSTVPage.category, "category");
        await this.helper.clickElement(this.featureSTVPage.categoryOptions, "categoryOptions");

        //select item type
        await this.helper.assertElementVisible(this.featureSTVPage.itemType, "itemType");
        await this.helper.clickElement(this.featureSTVPage.itemType, "itemType");
        await this.helper.clickElement(this.featureSTVPage.itemTypeOption, "itemTypeOption");

        //select responsible group
        await this.helper.assertElementVisible(this.featureSTVPage.responsibleGroup, "responsibleGroup");
        await this.helper.clickElement(this.featureSTVPage.responsibleGroup, "responsibleGroup");
        await this.helper.clickElement(this.featureSTVPage.responsibleGroupOption, "responsibleGroupOption");

        //select VPM
        if (testData_STV_FF.testData.typology == "O - Only One") {
            await this.helper.assertElementVisible(this.featureSTVPage.vpm, "vpm");
            await this.helper.clickElement(this.featureSTVPage.vpm, "vpm");
            await this.helper.clickElement(this.featureSTVPage.vpmOption, "vpmOption");
        }

        //enter explicative note
        await this.helper.assertElementVisible(this.featureSTVPage.explicativeNote, "explicativeNote");
        await this.helper.enterText(this.featureSTVPage.explicativeNote, testData_STV_FF.testData.explicativeNote, "explicativeNote");

        await this.helper.clickElement(this.featureSTVPage.save, 'save');
        await this.helper.clickElement(this.featureSTVPage.confirmation, 'confirmation');
        await this.helper.assertElementHasText(this.featureSTVPage.successMessage, 'SUCCESS', 'SUCCESS message displayed');
        
///////////Edit part ////////////


        //edit the description
        await this.helper.assertElementVisible(this.featureSTVPage.descriptionControl, "editDescriptionControl");
        await this.helper.clearText(this.featureSTVPage.descriptionControl,'clearDescription');
        await this.helper.enterText(this.featureSTVPage.descriptionControl, testData_STV_FF.editTestData.description, "editDescriptionControl");
        
        //edit typology option
        await this.helper.assertElementVisible(this.featureSTVPage.typology, "editTypology");
        await this.helper.clickElement(this.featureSTVPage.typology, "editTypology");
        await this.helper.clickElement(this.featureSTVPage.editTypologyOption, "editTypologyOptions");

        //edit category option
        await this.helper.assertElementVisible(this.featureSTVPage.category, "editCategory");
        await this.helper.clickElement(this.featureSTVPage.category, "editCategory");
        await this.helper.clickElement(this.featureSTVPage.editCategoryOption, "editCategoryOptions");


        //edit item type
        await this.helper.assertElementVisible(this.featureSTVPage.itemType, "editItemType");
        await this.helper.clickElement(this.featureSTVPage.itemType, "editItemType");
        await this.helper.clickElement(this.featureSTVPage.editItemTypeOption, "editItemTypeOption");

        //edit responsible group
        await this.helper.assertElementVisible(this.featureSTVPage.responsibleGroup, "editResponsibleGroup");
        await this.helper.clickElement(this.featureSTVPage.responsibleGroup, "editResponsibleGroup");
        await this.helper.clickElement(this.featureSTVPage.editResponsibleGroupOption, "editResponsibleGroupOption");
        

        //edit VPM option
        if (testData_STV_FF.editTestData.typology == "O - Only One") {
            await this.helper.assertElementVisible(this.featureSTVPage.vpm, "editVpm");
            await this.helper.clickElement(this.featureSTVPage.vpm, "editVpm");
            await this.helper.clickElement(this.featureSTVPage.editVpmOption, "editVpmOption");
        }
        
        //edit the  explicative note
        await this.helper.assertElementVisible(this.featureSTVPage.explicativeNote, "editExplicativeNote");
        await this.helper.clearText(this.featureSTVPage.explicativeNote,'clearExplicativeNote')
        await this.helper.enterText(this.featureSTVPage.explicativeNote, testData_STV_FF.editTestData.explicativeNote, "editExplicativeNote");


        await this.helper.clickElement(this.featureSTVPage.save, 'editSave');
        await this.helper.clickElement(this.featureSTVPage.confirmation, 'editConfirmation');
        const expText = `Edit STV class code ${this.stvCode} with success`;
        this.verifiedData = this.page.locator(`//p[contains(text(),'${expText}')]`);
        await this.helper.assertElementHasText(this.verifiedData, expText, 'SUCCESS edited message displayed');
        console.log(this.verifiedData.allTextContents());

        await this.helper.assertElementVisible(this.featureSTVPage.historyIcon,'historyIcon');
        await this.helper.clickElement(this.featureSTVPage.historyIcon,'historyIconClicked');
        await this.helper.assertElementVisible(this.featureSTVPage.historyBlock,'historyBlock');
        
        const vis1 =  await this.featureSTVPage.itemHistory.isVisible();
        if(vis1){
            const oldItemText = await this.featureSTVPage.oldItemHistory.textContent();
            const newItemText = await this.featureSTVPage.newItemHistory.textContent();
            if(oldItemText == testData_STV_FF.testData.itemType && newItemText == testData_STV_FF.editTestData.itemType){
                console.log("Item type is validated");
            }
            
        }
        const vis2 = await this.featureSTVPage.cateHistory.isVisible();
        if(vis2){
            const oldCategoryText = await this.featureSTVPage.oldCateHistory.textContent();
            const newCategoryText = await this.featureSTVPage.newcateHistory.textContent();
            if(oldCategoryText == testData_STV_FF.testData.category && newCategoryText == testData_STV_FF.editTestData.category){
                console.log("Category is validated.");
            }
            
        }
        const vis3 = await this.featureSTVPage.descHistory.isVisible();
        if(vis3){
            const oldDescriptionText = await this.featureSTVPage.oldDescHistory.textContent();
            const newDescriptionText = await this.featureSTVPage.newDescHistory.textContent();
            if(oldDescriptionText == testData_STV_FF.testData.description && newDescriptionText == testData_STV_FF.editTestData.description){
                console.log("Description is validated.");
            }
            
        }
        
        const vis4 = await this.featureSTVPage.expNoteHistory.isVisible();
        if(vis4){
            const oldExpText = await this.featureSTVPage.oldExpNoteHistory.textContent();
            const newExpText = await this.featureSTVPage.newExpNoteHistory.textContent();
            if(oldExpText == testData_STV_FF.testData.explicativeNote && newExpText == testData_STV_FF.editTestData.explicativeNote){
                console.log(" Explicative note is Validated");
            }
            
        }
        const vis5 = await this.featureSTVPage.respHistory.isVisible();
        if(vis5){
            const oldRespText = await this.featureSTVPage.oldRespHistory.textContent();
            const newRespText = await this.featureSTVPage.newRespHistory.textContent();
            if(oldRespText == testData_STV_FF.testData.responsibleGroup && newRespText == testData_STV_FF.editTestData.responsibleGroup){
                console.log("Responsible group text is validated");
            }
            
        }
        const vis6 = await this.featureSTVPage.typoHistory.isVisible();
        if(vis6){
            const oldTypoText = await this.featureSTVPage.oldTypoHistory.textContent();
            const newTypoText = await this.featureSTVPage.newTypoHistory.textContent();
            if(oldTypoText == testData_STV_FF.testData.typology && newTypoText == testData_STV_FF.editTestData.typology){
                console.log("Typology is validated");
            }
            
        }
        
        await this.page.waitForTimeout(1000);
        await this.helper.assertElementVisible(this.featureSTVPage.closeHistory,'closeButton');
        await this.helper.clickElement(this.featureSTVPage.closeHistory,'closeHistoryClicked');

    }
    

    //STV sales code
    async navigateTo_create_and_edit_STV_sales_code() {
 
        await this.helper.clickElement(this.homePage.createFeatureValue, 'createFeatureValue');
        await this.helper.assertElementVisible(this.featureSTVPage.createSTVSalesCode, 'createSTVSalesCode');
        await this.helper.clickElement(this.featureSTVPage.createSTVSalesCode, 'createSTVSalesCode');
 
        await this.helper.assertElementEnabled(this.featureSTVPage.manualCode, 'manualCode');
        let length = await this.helper.codeLength();
        let stvSalesCode = await this.helper.generateCode(length);
        await this.helper.enterText(this.featureSTVPage.manualCodeInput, stvSalesCode, 'manualCodeInput');
        await this.helper.clickElement(this.featureSTVPage.checkManualCodeIcon, 'checkManualCodeIcon');
        await this.helper.assertElementVisible(this.featureSTVPage.manualCodeMessage,"manualCodeMessage");
        while (true) {
            const result = await this.helper.checkLocators(this.featureSTVPage.format, this.featureSTVPage.availability, this.featureSTVPage.valid);
            if (result) {
                this.salesCode = stvSalesCode;
                break;
            }
            else {
                await this.helper.clearText(this.featureSTVPage.manualCodeInput, "clearManualCode");
                let length = await this.helper.codeLength();
                stvSalesCode = await this.helper.generateCode(length);
                await this.helper.enterText(this.featureSTVPage.manualCodeInput, stvSalesCode, 'manualCodeInput');
                await this.helper.clickElement(this.featureSTVPage.checkManualCodeIcon, 'checkManualCodeIcon');
                await this.helper.assertElementVisible(this.featureSTVPage.manualCodeMessage,"manualCodeMessage");
            }
        }
        await this.helper.clickElement(this.featureSTVPage.nextButton_WPC, 'nextButton_STV');
 
        //enter sales description
        await this.helper.assertElementVisible(this.featureSTVPage.salesCodeDescription, "salesCodeDescription");
        await this.helper.enterText(this.featureSTVPage.salesCodeDescriptionInput, testData_STV_FF.testData.salesCodeDescription, "salesCodeDescriptionInput");
        //await this.helper.assertElementNotClickable(this.featureSTVPage.validateBtn, 'Validate Button');
 
        //select application
        await this.helper.assertElementVisible(this.featureSTVPage.application, "application");
        await this.helper.clickElement(this.featureSTVPage.application, "application");
        await this.helper.clickElement(this.featureSTVPage.applicationOption, "applicationOption");
        //await this.helper.assertElementNotClickable(this.featureSTVPage.validateBtn, 'Validate Button');
 
        //enter explicative note
        await this.helper.assertElementVisible(this.featureSTVPage.explicativeNote, "explicativeNote");
        await this.helper.enterText(this.featureSTVPage.explicativeNote, testData_STV_FF.testData.explicativeNote, "inputexplicativeNote");
        //await this.helper.assertElementEnabled(this.featureSTVPage.validateBtn, 'Validate Button');
 
 
        await this.helper.clickElement(this.featureSTVPage.validateBtn, 'Validate');
        await this.helper.clickElement(this.featureSTVPage.confirmation, 'confirmation');
        await this.helper.assertElementHasText(this.featureSTVPage.successMessage, 'SUCCESS', 'SUCCESS message displayed');
 
        //Edit Sales code
 
        await this.helper.assertElementVisible(this.featureSTVPage.salesCodeDescription,"salesCodeDescription")
        await this.helper.clickElement(this.featureSTVPage.salesCodeDescriptionInput, "salesCodeDescriptionInput");
        await this.helper.clearText(this.featureSTVPage.salesCodeDescriptionInput,'clearsalesCodeDescription');
        //await this.page.waitForTimeout(1000);
        await this.helper.enterText(this.featureSTVPage.salesCodeDescriptionInput, testData_STV_FF.editTestData.editSalesCodeDescription, "editSalesCodeDescription");
 
        await this.helper.assertElementVisible(this.featureSTVPage.application, "application");
        await this.helper.clickElement(this.featureSTVPage.application, "application");
        await this.helper.clickElement(this.featureSTVPage.editapplicationOption, "editapplicationOption");
        await this.helper.assertElementVisible(this.featureSTVPage.explicativeNote, "explicativeNote");
        await this.helper.enterText(this.featureSTVPage.explicativeNote, testData_STV_FF.editTestData.editexplicativeNoteDescription, "editexplicativeNote");
 
        await this.helper.clickElement(this.featureSTVPage.save, 'Save');
        await this.helper.clickElement(this.featureSTVPage.confirmation, 'confirmation');
        const expSalesText = `Edit STV sales code ${this.salesCode} with success`;
        this.verifiedSalesData = this.page.locator(`//p[contains(text(),'${expSalesText}')]`);
        await this.helper.assertElementHasText(this.verifiedSalesData, expSalesText, 'SUCCESS message displayed');
        console.log(this.verifiedSalesData.allTextContents());
       
 
        // Validate changes in history
        await this.helper.assertElementVisible(this.featureSTVPage.historyIcon, "historyIcon");
        await this.helper.clickElement(this.featureSTVPage.historyIcon, "historyIcon");
 
 
        // Wait for the history modal to appear
        await this.helper.assertElementVisible(this.featureSTVPage.historyModal, "historyModal");
 
        if (await this.featureSTVPage.description.isVisible()) {
            await this.helper.assertElementHasText(this.featureSTVPage.oldDescription, testData_STV_FF.testData.salesCodeDescription, "oldDescription");
            await this.helper.assertElementHasText(this.featureSTVPage.newDescription, testData_STV_FF.editTestData.editSalesCodeDescription, "newDescription");
        }
 
        if (await this.featureSTVPage.appDesc.isVisible()) {
            await this.helper.assertElementTextContainedIn(this.featureSTVPage.oldAppDesc, testData_STV_FF.testData.application, "oldAppDescription");
            await this.helper.assertElementTextContainedIn(this.featureSTVPage.newAppDesc, testData_STV_FF.editTestData.editapplicationDescription, "newAppDescription");
        }
 
 
        if (await this.featureSTVPage.explicativeNote.isVisible()) {
            await this.helper.assertElementHasText(this.featureSTVPage.oldExplicativeNote, testData_STV_FF.testData.explicativeNote, "oldexplicativeNote");
            await this.helper.assertElementHasText(this.featureSTVPage.newExplicativeNote, testData_STV_FF.editTestData.editexplicativeNoteDescription, "newexplicativeNote");
        }
 
        // Close the history modal
        await this.helper.clickElement(this.featureSTVPage.closeHistoryModal, "closeHistoryModal");

    }
}
