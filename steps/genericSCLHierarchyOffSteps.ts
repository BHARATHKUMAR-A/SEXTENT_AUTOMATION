import { Locator, Page } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { GenericSCLHierarchyOffPage } from "../pages/genericSCLHierarchyOffPage";
import { attachment } from 'allure-js-commons';

interface TestInfo {
    [key: string]: any;
}

interface StepHelper {
    clickElement: (locator: any, name: string) => Promise<void>;
    enterText: (locator: any, value: string, name: string) => Promise<void>;
    assertElementVisible: (locator: any, name: string) => Promise<void>
    clearText: (locator: any, text: string) => Promise<void>;
    clickElementForcefully(locator: Locator, label: any): Promise<void>
}
export class GenericSCLHierarchyToggleOff {
    private page: Page;
    private testInfo: TestInfo;
    private helper: StepHelper;
    private homePage: HomePage;
    private genericSCLHierarchyOffPage: GenericSCLHierarchyOffPage;
    private hierarchySclValue: any;
    private hierarchySclVal: any;
    private verifiedFamCode: any;

    constructor(page: Page, testInfo: TestInfo, stepHelper: StepHelper) {
        this.page = page;
        this.testInfo = testInfo;
        this.homePage = new HomePage(page);
        this.helper = stepHelper;
        this.genericSCLHierarchyOffPage = new GenericSCLHierarchyOffPage(page);
    }

    async generic_scl_toggle_button_hierarchy() {
        //generic dict
        await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
        await this.helper.clickElement(this.homePage.genericDict, 'genericDict');

        //search option
        await this.helper.assertElementVisible(this.genericSCLHierarchyOffPage.search, 'search_option');
        await this.helper.clickElement(this.genericSCLHierarchyOffPage.search, 'search_option_clicked');

        //toggle button check
        await this.helper.assertElementVisible(this.genericSCLHierarchyOffPage.toggleButton, 'toggle button');
        await this.helper.clickElement(this.genericSCLHierarchyOffPage.toggleButton, 'click_toggle_button');

        //hierarchy button
        await this.helper.assertElementVisible(this.genericSCLHierarchyOffPage.hierarchyButton, 'hierarchy');
        await this.helper.clickElement(this.genericSCLHierarchyOffPage.hierarchyButton, 'hierarchy_button');

        //structure option
        await this.helper.assertElementVisible(this.genericSCLHierarchyOffPage.structure, 'structure');
        await this.helper.clickElement(this.genericSCLHierarchyOffPage.structure, 'structure_option');
        await this.helper.clickElement(this.genericSCLHierarchyOffPage.structureValue, 'STV');
        await this.helper.clickElement(this.genericSCLHierarchyOffPage.structureValue1, 'WPC');
        await this.page.keyboard.press('Tab');


        //search icon visible
        await this.helper.assertElementVisible(this.genericSCLHierarchyOffPage.searchIcon, 'search_icon');
        await this.helper.clickElement(this.genericSCLHierarchyOffPage.searchIcon, 'search_icon');
        await this.page.waitForTimeout(3000);

        let isValid: boolean = false;   //bool check
        if (await this.genericSCLHierarchyOffPage.rowLine.isVisible()) {
            isValid = true;
            console.log("Data is visible and validated");
        }
        else {
            console.log("Data is unavailable");
        }

        //class code extraction
        await this.helper.assertElementVisible(this.genericSCLHierarchyOffPage.famCode, 'famcode');
        let extractedFamCode = await this.genericSCLHierarchyOffPage.famCode.textContent();
        this.hierarchySclValue = extractedFamCode?.split(" ")[1];
        console.log(`SCL Family Code is ${this.hierarchySclValue}.`);

        //edit button
        await this.helper.assertElementVisible(this.genericSCLHierarchyOffPage.editButton, 'edit_button');
        await this.helper.clickElementForcefully(this.genericSCLHierarchyOffPage.editButton, 'edit_button_clicked');


        //class code verification
        await this.helper.assertElementVisible(this.genericSCLHierarchyOffPage.famCodecheck, 'famcode_check');
        await this.page.waitForTimeout(2000);
        let verifiedFamCode = await this.genericSCLHierarchyOffPage.famCodecheck.textContent();
        console.log(`${verifiedFamCode}`);

        if (verifiedFamCode?.includes(`${this.hierarchySclValue}`)) {
            console.log("Data is verified and validated.");
            attachment('Validation Result', "Data is verified and validated", 'text/plain');
        }
        else {
            console.log("Data is different.");
        }



    }
}