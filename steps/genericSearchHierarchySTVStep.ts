import { Locator, Page } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { GenericSearchHierarchySTVPage } from "../pages/genericSearchHierarchySTVPage";
import TestData_Generic_Hierarchy_WPC from "../test-data/testData_generic_Hierarchy_WPC.json";
import { attachment } from 'allure-js-commons';

interface TestInfo {
    [key: string]: any;
}


interface StepHelper {
    clickElement: (locator: any, name: string) => Promise<void>;
    enterText: (locator: any, value: string, name: string) => Promise<void>;
    assertElementVisible: (locator: any, name: string) => Promise<void>
    clearText:(locator:any,text:string) => Promise<void>;
    clickElementForcefully:(locator: Locator, label:any)  => Promise<void>;
}

export class GenericSearchHierarchySTVStep{
    private page: Page;
    private testInfo: TestInfo;
    private helper: StepHelper;
    private homePage: HomePage;
    private genericSTVPage : GenericSearchHierarchySTVPage;
    private tableData : any
    private tableClassCode : any;
    constructor(page: Page,testInfo:TestInfo,stepHelper:StepHelper){

        this.page = page;
        this.testInfo = testInfo;
        this.helper = stepHelper;
        this.homePage = new HomePage(page);
        this.genericSTVPage = new GenericSearchHierarchySTVPage(page);
    }

    async generic_search_hierarchy_STV(){
        //genericdict 
        await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
        await this.helper.clickElement(this.homePage.genericDict, 'genericDict');

        //search
        await this.helper.assertElementVisible(this.genericSTVPage.search,'search_part');
        await this.helper.clickElement(this.genericSTVPage.search,'click_search');

        //hierarchy radio button
        await this.helper.assertElementVisible(this.genericSTVPage.hierarchyRadioButton,'hierarchy_Radio_button');
        await this.helper.clickElement(this.genericSTVPage.hierarchyRadioButton,'hierarchy_radio_button_clicked');


        //structure 
        await this.helper.assertElementVisible(this.genericSTVPage.structure,'structure');
        await this.helper.clickElement(this.genericSTVPage.structure,'structure_clicked');
        await this.helper.clickElement(this.genericSTVPage.structureWPC,'scl_option_clicked');
        await this.helper.clickElement(this.genericSTVPage.structureSCL,'stv_option_clicked');
        await this.page.keyboard.press('Tab');

        //first toggle button
        await this.helper.assertElementVisible(this.genericSTVPage.firstToggleButton,'first_toggle_button');
        await this.helper.clickElement(this.genericSTVPage.firstToggleButton,'first_toggle_button_clicked');

        //panel toggle
        await this.helper.assertElementVisible(this.genericSTVPage.panelToggle,'panel_toggle');
        await this.helper.clickElement(this.genericSTVPage.panelToggle,'panel_toggle_clicked');

        //description
        await this.helper.assertElementVisible(this.genericSTVPage.description,'description');
        await this.helper.clickElement(this.genericSTVPage.description,'description_clicked');
        await this.helper.enterText(this.genericSTVPage.description,TestData_Generic_Hierarchy_WPC.wpctestData.description,'description_enter');
        await attachment('Input Description',JSON.stringify(`Description value is : ${TestData_Generic_Hierarchy_WPC.wpctestData.description}`),'application/json');


        //search icon click
        await this.helper.assertElementVisible(this.genericSTVPage.searchIcon,'search_icon');
        await this.helper.clickElement(this.genericSTVPage.searchIcon,'search_icon_click');
        
        await this.page.waitForTimeout(20000);
        

        //rowcheck
        let rowVis : boolean = false;
        if(await this.genericSTVPage.firstRow.isVisible()){
            rowVis = true;
            console.log("Data is visible");
            await attachment('Data availability','Data is visible','text/plain');
        }else{
            console.log("Data is not visible");
            await attachment('Data availability','Data is Not visible','text/plain');
        }

        if(rowVis){
            for(let i=0;i<20;i++){
                if(await this.genericSTVPage.commonRow.nth(i).isVisible()){
                     this.tableData = await this.genericSTVPage.commonRow.nth(i).locator("//mat-expansion-panel-header//span//mat-panel-description//div//span").textContent();
                     this.tableClassCode = await this.genericSTVPage.commonRow.nth(i).locator("//mat-expansion-panel-header//span//mat-panel-title//span[2]").textContent();
                     if(this.tableData==TestData_Generic_Hierarchy_WPC.wpctestData.description){
                        console.log("data is verified");
                        await attachment('Data Verification',`Table Description is ${this.tableData}`,'text/plain');
                        console.log(`Table class code is ${this.tableClassCode}`);
                        await attachment('Table class code',`Table class code is: ${this.tableClassCode}`,'text/plain');
                        break;
                     }
                }
            }
        }else{
            console.log("Row is not available");
            await attachment('Row availability','Row is  not available','text/plain');
        }


    }

    
}