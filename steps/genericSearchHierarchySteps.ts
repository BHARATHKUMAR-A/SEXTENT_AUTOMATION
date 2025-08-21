import { Locator, Page, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { GenericSearchHierarchyPage } from '../pages/genericSearchHierarchyPage';


interface TestInfo {
    [key: string]: any;
}

interface StepHelper {
    clickElement: (locator: any, name: string) => Promise<void>;
    enterText: (locator: any, value: string, name: string) => Promise<void>;
    assertElementHasText: (locator: any, expectedText: string, message: string) => Promise<void>;
    assertElementVisible: (locator: any, name: string) => Promise<void>;
    getRandomNumber: (locator: any, name: any) => Promise<number>;
    assertElementEnabled: (locator: any, name: string) => Promise<void>;
    assertElementDisabled: (locator: any, name: string) => Promise<boolean>;
    checkTotalRecordsUnchanged: (helper: any, page: any, genericSearchHierarchyPage: any) => Promise<void>;
}

export class GenericSearchHierarchySteps {
    private page: Page;
    private testInfo: TestInfo;
    private helper: StepHelper;
    private homePage: HomePage;
    private genericSearchHierarchyPage: GenericSearchHierarchyPage;

    constructor(page: Page, testInfo: TestInfo, stepHelper: StepHelper) {
        this.page = page;
        this.testInfo = testInfo;
        this.helper = stepHelper;
        this.homePage = new HomePage(page);
        this.genericSearchHierarchyPage = new GenericSearchHierarchyPage(page);
    }
    async generic_search_hierarchy_pagination() {

        await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
        await this.helper.clickElement(this.homePage.genericDict, 'genericDict');

        await this.helper.assertElementVisible(this.genericSearchHierarchyPage.searchSideBar, 'searchSideBar');
        await this.helper.clickElement(this.genericSearchHierarchyPage.searchSideBar, 'searchSideBar');
        await this.page.waitForTimeout(8000)

        await this.helper.assertElementEnabled(this.genericSearchHierarchyPage.isToggelOn, 'isToggelOn');

        await this.helper.assertElementVisible(this.genericSearchHierarchyPage.hierarchyValue, 'hierarchyValue');
        await this.helper.clickElement(this.genericSearchHierarchyPage.hierarchyValue, 'hierarchyValue');
        await this.helper.assertElementEnabled(this.genericSearchHierarchyPage.hierarchyValue, 'hierarchyValue');


        await this.helper.assertElementVisible(this.genericSearchHierarchyPage.searchIcon, 'SearchIcon');
        await this.helper.clickElement(this.genericSearchHierarchyPage.searchIcon, 'SearchIcon');
        await this.page.waitForTimeout(5000)

        await this.helper.checkTotalRecordsUnchanged(this.helper, this.page, this.genericSearchHierarchyPage);

        await this.helper.clickElement(this.genericSearchHierarchyPage.itemsPerPage, 'itemsPerPage');
        await this.helper.clickElement(this.genericSearchHierarchyPage.itemsPerPageOption1, 'itemsPerPageOpion1');
        await this.helper.checkTotalRecordsUnchanged(this.helper, this.page, this.genericSearchHierarchyPage);

        await this.helper.clickElement(this.genericSearchHierarchyPage.itemsPerPage, 'itemsPerPage');
        await this.helper.clickElement(this.genericSearchHierarchyPage.itemsPerPageOption2, 'itemsPerPageOpion2');
        await this.helper.checkTotalRecordsUnchanged(this.helper, this.page, this.genericSearchHierarchyPage);




    }


}