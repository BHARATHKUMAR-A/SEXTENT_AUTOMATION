import { Locator, Page, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { SearchHierarchyPage } from '../pages/searchWPCHierarchyPage';
import searchData_Hierarchy_FF from '../test-data/searchData_Hierarchy_FF.json';
import { Console, log } from 'console';
import { attachment } from 'allure-js-commons';
import * as fs from 'fs';

interface TestInfo{
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
    assertElementDisabled: (element: any, elementName: string)=> Promise<boolean>;
    toggleButtonAction: (locator: Locator,element: string)=> Promise<void>;
}

export class SearchHierarchySteps{
    private page: Page;
    private testInfo: TestInfo;
    private helper: StepHelper;
    private homePage: HomePage;
    private searchHierarchyPage: SearchHierarchyPage;

    constructor(page:Page,testInfo:TestInfo,stepHelper:StepHelper){
        this.page=page;
        this.testInfo=testInfo;
        this.helper=stepHelper;
        this.homePage=new HomePage(page);
        this.searchHierarchyPage=new SearchHierarchyPage(page);
    }

    async navigateTo_search_Hierarchy_WPC_Toggle_OFF(){
        await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
        await this.helper.clickElement(this.homePage.genericDict, 'genericDict');

        //go to search SCL Feature
        await this.helper.assertElementVisible(this.homePage.search,'search');
        await this.helper.clickElement(this.homePage.search, 'search');

        //toggle button off
        await this.helper.toggleButtonAction(this.searchHierarchyPage.toggleButton,'toggleButton');

        //Select Hierarchy Button
        await this.helper.assertElementVisible(this.searchHierarchyPage.hierarchyBtn,'HierarchyBtn');
        await this.helper.clickElement(this.searchHierarchyPage.hierarchyBtn,'HierarchyBtn');

        //Structure Dropdown
        await this.helper.assertElementVisible(this.searchHierarchyPage.structureDropdown,'StructureDropdown');
        await this.helper.clickElement(this.searchHierarchyPage.structureDropdown,'StructureDropdown');
        
        //Deslect SCL and STV
        await this.helper.assertElementVisible(this.searchHierarchyPage.deselectSCL,'DeselectSCL');
        await this.helper.clickElement(this.searchHierarchyPage.deselectSCL,'DeselectSCL');
        await this.helper.assertElementVisible(this.searchHierarchyPage.deselectSTV,'DeselectSTV');
        await this.helper.clickElement(this.searchHierarchyPage.deselectSTV,'DeselectSTV');
        await this.page.keyboard.press('Tab');
        
        //search button click
        await this.helper.assertElementVisible(this.searchHierarchyPage.searchBtn,'searchBtn');
        await this.helper.clickElement(this.searchHierarchyPage.searchBtn,'searchBtn');
        
        await this.searchHierarchyPage.data.waitFor({state:'visible'});
        let message_report;
        if(await this.searchHierarchyPage.data.isVisible()){
            message_report = `${searchData_Hierarchy_FF.Data.Hierarchy} data is available`;
        }else{
           message_report = `${searchData_Hierarchy_FF.Data.Hierarchy} data is not available`;
        }
        console.log(message_report);
        attachment('Hierarchy Data Visibility',message_report,'text/plain');

        const expectedcode = await this.searchHierarchyPage.expectedWPCCOde.nth(1).textContent();
        console.log(`WPC Code: ${expectedcode}`);
        attachment('WPC Family Code',`WPC Code: ${expectedcode}`,'text/plain');
        

        await this.helper.assertElementVisible(this.searchHierarchyPage.editClickable,'editBtn');
        await this.helper.clickElementForcefully(this.searchHierarchyPage.editClickable,'editBtn');

        if(await this.searchHierarchyPage.visibility.isVisible()){
            message_report=`Edit Button Clickable `;
        }else{
            message_report=`Edit Button not Clickable `;
        }
        console.log(message_report);
        attachment('Edit button click',message_report,'text/plain');
        const actualCode=await this.searchHierarchyPage.actualWPCCode.textContent();
        console.log(actualCode);
        
        if(actualCode?.includes(`${expectedcode}`)){
            message_report=`Expected WPC code ${expectedcode} same as Actual Code ✅`;
        }else{
            message_report=`Expected WPC code ${expectedcode} not same as Actual Code ❌`;
        }
        console.log(message_report);
        attachment('Data compare',message_report,'text/plain');
        
        
    }
}