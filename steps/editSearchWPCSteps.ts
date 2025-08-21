import { Locator, Page, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { EditSearchWPCPage } from '../pages/editSearchWPCPage';
import testData_wpc from '../test-data/testData_WPC_FamilyCode.json';
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
    assertElementTextContainedIn: (locator: any, expectedText: string, message: string) => Promise<void>;
    compareConstValues(actual: any, expected: any, label: ''): Promise<void>
}
export class EditSearchWPCSteps {
    private page: Page;
    private testInfo: TestInfo;
    private helper: StepHelper;
    private homePage: HomePage;
    private editSearchWPCPage: EditSearchWPCPage;
    private selectRandomCode: Locator;
    private classCode: string;
    private code: string;
 
 
    //constructor to initialize the objects
    constructor(page: Page, testInfo: TestInfo, stepHelper: StepHelper) {
        this.page = page;
        this.testInfo = testInfo;
        this.helper = stepHelper;
        this.homePage = new HomePage(page);
        this.editSearchWPCPage = new EditSearchWPCPage(page);
 
    }
 
    //Creating SCL class code flow
    async toggleOn_search_edit_wpc() {
 
        //navigate to Generic Dictionary
        await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
        await this.helper.clickElement(this.homePage.genericDict, 'genericDict');
 
        //navigate to search tab
        await this.helper.assertElementVisible(this.homePage.search, 'searchTab');
        await this.helper.clickElement(this.homePage.search, 'searchTab');
 
        //check is toggel and single button is enabled
        await this.helper.assertElementEnabled(this.editSearchWPCPage.isToggelOn, 'isToggelOn');
 
        //click on hierrarchy
        await this.helper.assertElementVisible(this.editSearchWPCPage.hierrarchyBtn, 'hierrarchyBtn');
        await this.helper.clickElement(this.editSearchWPCPage.hierrarchyBtn, 'hierrarchyBtn');
 
        //navigate to structure tab
        await this.helper.assertElementVisible(this.editSearchWPCPage.structureTab, 'structureTab');
        await this.helper.clickElement(this.editSearchWPCPage.structureTab, 'structureTab');
 
        await this.helper.assertElementVisible(this.editSearchWPCPage.SCLOption, 'SCLOption');
        await this.helper.assertElementEnabled(this.editSearchWPCPage.SCLOption, 'enable SCLOption')
        await this.helper.clickElement(this.editSearchWPCPage.SCLOption, 'make SCLOption disabled');
 
        await this.helper.assertElementVisible(this.editSearchWPCPage.STVOption, 'STVOption');
        await this.helper.assertElementEnabled(this.editSearchWPCPage.STVOption, 'enable STVOption')
        await this.helper.clickElement(this.editSearchWPCPage.STVOption, 'make STVOption disabled');
        await this.page.keyboard.press('Tab');
 
        //click on down arrow
        await this.helper.assertElementVisible(this.editSearchWPCPage.arrowDown, 'arrowDown');
        await this.helper.clickElement(this.editSearchWPCPage.arrowDown, 'arrowDown');
 
        //click on multiStructure arrow
        await this.helper.assertElementVisible(this.editSearchWPCPage.multiStructure, 'multiStructure');
        await this.helper.clickElement(this.editSearchWPCPage.multiStructure, 'multiStructure');
 
        //select and enter description
        await this.helper.assertElementVisible(this.editSearchWPCPage.multiDescription, 'multiDescription');
        await this.helper.clickElement(this.editSearchWPCPage.multiDescription, 'multiDescription');
        await this.helper.enterText(this.editSearchWPCPage.multiDescription, testData_wpc.testData.description, 'multiDescription');
 
        await this.helper.assertElementVisible(this.editSearchWPCPage.searchIcon, 'searchIcon');
        await this.helper.clickElement(this.editSearchWPCPage.searchIcon, 'searchIcon');
        await this.page.waitForTimeout(9000);
 
        const totalNo = await this.editSearchWPCPage.headerOpt.count();
        console.log(totalNo);
 
        if (totalNo === 0) {
            throw new Error("No edit_outline buttons found.");
        }
 
        const randomNumber = await this.helper.getRandomNumber(1, totalNo);
        const option = this.page.locator(`(//mat-expansion-panel-header[contains(@class,'mat-expansion-toggle-indicator-after ng-star-inserted')])[${randomNumber}]`);
        await this.helper.clickElement(option, 'buttons');
 
        await this.page.waitForTimeout(10000);
        const panelFCode = this.page.locator(`(//mat-panel-title//span[@class='panel-title ng-star-inserted'])[${randomNumber}]`);
        await this.helper.clickElement(panelFCode, 'panelFCode');
 
        var panelFamilyCode = await panelFCode.textContent();
        console.log("panelFamilyCode: " + panelFamilyCode);
 
        const count = await this.editSearchWPCPage.panelBtns.count();
        console.log(count);
 
        if (count === 0) {
            console.log("count is 0");
            const editOpt = this.page.locator(`(//mat-expansion-panel-header//mat-icon[contains(@class,'mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color')])[${randomNumber}]`)
            await this.helper.clickElement(editOpt, 'edit buttons');
        }
        if (count != 0) {
            console.log("count is not 0");
            const randomIndex = await this.helper.getRandomNumber(1, count);
            console.log("count is not 0" + randomIndex);
            const editOpt1 = this.page.locator(`(//mat-expansion-panel-header//mat-icon[contains(@class,'mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color')])[${randomNumber}]`)
            await this.helper.clickElement(editOpt1, 'edit buttons');
            await this.page.waitForTimeout(7000);
        }
 
        await this.helper.assertElementVisible(this.editSearchWPCPage.familyCode, 'panel_FamilyCode');
        const txtstv = await this.editSearchWPCPage.familyCode.textContent()
        const txtArray = txtstv?.split(" ");
        const fourthElement = txtArray?.[4];
        console.log("fourthElement " + fourthElement);
 
        await this.helper.compareConstValues(panelFamilyCode, fourthElement, "");
        console.log("family code of panal is same as family code required")
        await attachment('Family Code Verification', '✅  family code of panal is same as family code required !!', 'text/plain')
 
    }
 
 
}