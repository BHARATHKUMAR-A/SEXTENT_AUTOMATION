import { Locator, Page, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { FeatureSTVPage } from '../pages/featureSTVPage';
import { GenericSearch_HierarchyPage } from '../pages/genericSearch_HierarchyPage';
import searchDataHierarchy_STV_FF from '../test-data/searchDataHierarchy_STV_FF.json';
import credentials from '../test-data/credentials.json';
import { allure } from 'allure-playwright';
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
}

export class GenericSearch_HierarchySteps {
    private page: Page;
    private testInfo: TestInfo;
    private helper: StepHelper;
    private homePage: HomePage;
    private genericSearch_HierarchyPage: GenericSearch_HierarchyPage;


    //constructor to initialize the objects
    constructor(page: Page, testInfo: TestInfo, stepHelper: StepHelper) {
        this.page = page;
        this.testInfo = testInfo;
        this.helper = stepHelper;
        this.homePage = new HomePage(page);
        this.genericSearch_HierarchyPage = new GenericSearch_HierarchyPage(page);
    }

    async navigateTo_search_STV_hierarchy_ff() {

        await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
        await this.helper.clickElement(this.homePage.genericDict, 'genericDict');

        await this.helper.assertElementVisible(this.homePage.search, 'search');
        await this.helper.clickElement(this.homePage.search, 'search');

        await this.helper.assertElementVisible(this.genericSearch_HierarchyPage.hierarchyToggleButton, 'hierarchyToggleButton');
        await this.helper.clickElement(this.genericSearch_HierarchyPage.hierarchyToggleButton, 'hierarchyToggleButton');

        await this.helper.assertElementVisible(this.genericSearch_HierarchyPage.hierarchyRadioButton, "hierarchyRadioButton");
        await this.helper.clickElement(this.genericSearch_HierarchyPage.hierarchyRadioButton, 'hierarchyRadioButton');

        await this.helper.assertElementVisible(this.genericSearch_HierarchyPage.hierarchyStructureDropdown, 'hierarchyStructureDropdown');
        await this.helper.clickElement(this.genericSearch_HierarchyPage.hierarchyStructureDropdown, 'hierarchyStructureDropdown');

        await this.helper.assertElementVisible(this.genericSearch_HierarchyPage.hierarchyStructureDropdownOptionSCL, 'hierarchyStructureDropdownOptionSCL');
        await this.helper.clickElement(this.genericSearch_HierarchyPage.hierarchyStructureDropdownOptionSCL, 'hierarchyStructureDropdownOptionSCL');

        await this.helper.assertElementVisible(this.genericSearch_HierarchyPage.hierarchyStructureDropdownOptionWPS, 'hierarchyStructureDropdownOptionWPS');
        await this.helper.clickElement(this.genericSearch_HierarchyPage.hierarchyStructureDropdownOptionWPS, 'hierarchyStructureDropdownOptionWPS');
        await this.page.keyboard.press('Tab');


        await this.helper.assertElementVisible(this.genericSearch_HierarchyPage.hierarchyArrowIcon, 'hirerachyArrowIcon');
        await this.helper.clickElement(this.genericSearch_HierarchyPage.hierarchyArrowIcon, 'hirerachyArrowIcon');

        await this.helper.assertElementVisible(this.genericSearch_HierarchyPage.hierarchyMultiStructureFilters, 'hierarchyMultiStructureFilters');
        await this.helper.clickElement(this.genericSearch_HierarchyPage.hierarchyMultiStructureFilters, 'hierarchyMultiStructureFilters');

        await this.helper.assertElementVisible(this.genericSearch_HierarchyPage.hierarchyMultiDesc, "hirerachyMultiDesc");
        await this.helper.enterText(this.genericSearch_HierarchyPage.hierarchyMultiDesc, searchDataHierarchy_STV_FF.testData.desc, "hirerachyMultiDesc");

        await this.helper.assertElementVisible(this.genericSearch_HierarchyPage.hierarchySearchIcon, 'hierarchySearchIcon');
        await this.helper.clickElement(this.genericSearch_HierarchyPage.hierarchySearchIcon, 'hierarchySearchIcon');

        await this.genericSearch_HierarchyPage.hierarchyData.waitFor({ state: 'visible' });

        let message;
        if (await this.genericSearch_HierarchyPage.hierarchyData.isVisible()) {
            message = `${searchDataHierarchy_STV_FF.testData.Hierarchy} data is available`;
        } else {
            message = `${searchDataHierarchy_STV_FF.testData.Hierarchy} data is not available`;
        }
        console.log(message);
        attachment('Hierarchy Data Visible', message, 'text/plain');

        await this.helper.assertElementVisible(this.genericSearch_HierarchyPage.hierarchyClassCodeSTV, 'hierarchyClassCodeSTV');
        let hierarchyClassCode = await this.genericSearch_HierarchyPage.hierarchyClassCodeSTV.textContent();
        console.log(hierarchyClassCode);

        attachment('expected STV Class Code', `STV Class Code: ${hierarchyClassCode}`, 'text/plain');

        await this.helper.assertElementVisible(this.genericSearch_HierarchyPage.hierarchyEditIcon, 'hierarchyEditIcon');
        await this.helper.clickElementForcefully(this.genericSearch_HierarchyPage.hierarchyEditIcon, 'hierarchyEditIcon');

        await this.helper.assertElementVisible(this.genericSearch_HierarchyPage.hierarchyEditPage, 'hierarchyEditPage');

        if (await this.genericSearch_HierarchyPage.hierarchyEditPage.isVisible()) {
            message = `Edit Button Clickable 👆`;
        } else {
            message = `Edit Button not Clickable 🚫`;
        }
        console.log(message);
        attachment('Edit button click', message, 'text/plain');

        await this.helper.assertElementVisible(this.genericSearch_HierarchyPage.hierarchyClassCodeEditPageSTV, 'hierarchyClassCodeEditPageSTV');
        let hierarchyClassCodeEditPage = await this.genericSearch_HierarchyPage.hierarchyClassCodeEditPageSTV.textContent();
        console.log(hierarchyClassCodeEditPage);

        attachment('actual STV class code', `STV Edit Class Code: ${hierarchyClassCodeEditPage}`, 'text/plain');

        if (hierarchyClassCodeEditPage?.includes(`${hierarchyClassCode}`)) {
            message = `STV:class code data are same`;
        } else {
            message = `STV:class code data are not same`;
        }
        console.log(message);
        attachment('compared code', message, 'text/plain');
    }
}