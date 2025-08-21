import { Page} from '@playwright/test';
import { HomePage } from "../pages/homePage";
import { GenericSearchMappingPage } from "../pages/genericSearchMappingPage";
import TestData_Generic_Mapping_SCL from "../test-data/testData_generic_Mapping_SCL.json";
import { attachment } from 'allure-js-commons';
 
 
 
 
 
 
interface TestInfo {
    [key: string]: any;
}
 
 
interface StepHelper {
    clickElement: (locator: any, name: string) => Promise<void>;
    enterText: (locator: any, value: string, name: string) => Promise<void>;
    assertElementVisible: (locator: any, name: string) => Promise<void>
    clearText:(locator:any,text:string) => Promise<void>;
}
 
 
export class GenericSearchMappingStep{
    private page: Page;
    private testInfo: TestInfo;
    private helper: StepHelper;
    private homePage: HomePage;
    private genericSearchMappingPage : GenericSearchMappingPage;
    private sclClassCodeColumn : any;
    private stvClassCodeColumn : any;
    private wpcClassCodeColumn : any;
    private mappedStvValue : any;
    private mappedWpcValue : any;
    private featureFamilyLongDesc : any
    private localizedDesc : any
   
 
 
    constructor(page: Page, testInfo: TestInfo, stepHelper: StepHelper){
        this.page = page;
        this.testInfo = testInfo;
        this.helper = stepHelper;
        this.homePage = new HomePage(page);
        this.genericSearchMappingPage = new GenericSearchMappingPage(page);
 
    }
 
    async search_SCL_Code_using_Mapping(){
        //genericdict
        await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
        await this.helper.clickElement(this.homePage.genericDict, 'genericDict');
 
        //search option
        await this.helper.assertElementVisible(this.genericSearchMappingPage.search,'search_option');
        await this.helper.clickElement(this.genericSearchMappingPage.search,'click_on_search');
 
        //radio button
        await this.helper.assertElementVisible(this.genericSearchMappingPage.mappingRadioButton,'mapping_radio_button');
        await this.helper.clickElement(this.genericSearchMappingPage.mappingRadioButton,'click_mapping_radio_button');
 
        //first Toggle button
        await this.helper.assertElementVisible(this.genericSearchMappingPage.firstToggleButton,'first toggle button');
        await this.helper.clickElement(this.genericSearchMappingPage.firstToggleButton,'click_first_toggle_button');
 
        //Scl toggle Button
        await this.helper.assertElementVisible(this.genericSearchMappingPage.sclToggleButton,'scl_toggle_button');
        await this.helper.clickElement(this.genericSearchMappingPage.sclToggleButton,'click_scl_toggle_button');
 
 
        //scl code input box
        await this.helper.assertElementVisible(this.genericSearchMappingPage.sclCodeInputBox,'scl_code_input_box');
        await this.helper.clickElement(this.genericSearchMappingPage.sclCodeInputBox,'click_Scl_code_input_box');
        await this.helper.enterText(this.genericSearchMappingPage.sclCodeInputBox,TestData_Generic_Mapping_SCL.testData.sclCode,'scl_code');
        await attachment('SCL Code input box',JSON.stringify(TestData_Generic_Mapping_SCL.testData.sclCode,null,2),'application/json');
   
 
        //search icon
        await this.helper.assertElementVisible(this.genericSearchMappingPage.searchIcon,'search_icon');
        await this.helper.clickElement(this.genericSearchMappingPage.searchIcon,'click_search_icon');
        await this.page.waitForTimeout(3000);
 
        //checking first row is visible or not
        let isAvail: boolean = false;
        if(await this.genericSearchMappingPage.rowLine.isVisible()){
            isAvail = true;
            console.log("Row data is visible and validated");
            await attachment('Rows visibility','Row is visible','text/plain');
        }else{
            console.log("Row data is hidden");
            await attachment('Rows visibility','Row is Hidden','text/plain');
        }
 
        //extracting the row count value
        let rowValue = await this.genericSearchMappingPage.paginator.textContent();
        let rowCount:any = rowValue?.split(" ")[5];
        console.log(`Row count is ${rowCount}`);
        await attachment('Total number of rows is visible',rowCount,'text/plain');
 
        if(isAvail){
 
            for(let i=0;i<rowCount;i++){
                if(await this.genericSearchMappingPage.rows.nth(i).isVisible()){
                    this.sclClassCodeColumn = await this.genericSearchMappingPage.rows.nth(i).locator('mat-cell:nth-of-type(1)').textContent();
                    await attachment('SCL Class code is',this.sclClassCodeColumn,'text/plain');
                    this.featureFamilyLongDesc = await this.genericSearchMappingPage.rows.nth(i).locator('mat-cell:nth-of-type(2)').textContent();
                    await attachment('Table Localised Desc is',this.featureFamilyLongDesc,'text/plain');
                    let typology = await this.genericSearchMappingPage.rows.nth(i).locator('mat-cell:nth-of-type(8)').textContent();
                    this.stvClassCodeColumn = await this.genericSearchMappingPage.rows.nth(i).locator('mat-cell:nth-of-type(9)').textContent();
                    await attachment('STV Class code is',this.stvClassCodeColumn,'text/plain');
                    this.wpcClassCodeColumn = await this.genericSearchMappingPage.rows.nth(i).locator('mat-cell:nth-of-type(13)').textContent();
                    await attachment('WPC Class code is',this.wpcClassCodeColumn,'text/plain');
                    let longDesc = await this.genericSearchMappingPage.rows.nth(i).locator('mat-cell:nth-of-type(14)').textContent();
                    console.log(`SCL Class code is ${this.sclClassCodeColumn}`);
                   
                    console.log(`Table Localised Desc is: ${this.featureFamilyLongDesc}`);
                   
                    console.log(`STV Class code is ${this.stvClassCodeColumn}`);
                   
                    console.log(`WPC Class code is ${this.wpcClassCodeColumn}`);
                   
                    if(this.sclClassCodeColumn==TestData_Generic_Mapping_SCL.testData.sclCode && typology != '-' && longDesc != '-'){
                        //click on feature family mapped/edited section
                        await this.helper.clickElement(this.genericSearchMappingPage.rows.nth(i).locator('//mat-cell[1]/div/a'),'click_feature_family_code');
                       
                        //extract the localized description text
                        await this.helper.assertElementVisible(this.genericSearchMappingPage.localizedDesc,'localized_description');
                        this.localizedDesc = await this.genericSearchMappingPage.localizedDesc.inputValue();
                        console.log(`Mapped Localized Desc is: ${this.localizedDesc}`);
                        await attachment('Mapped Localized Desc is',this.localizedDesc,'text/plain');
 
 
                        //checking the mapping section
                        await this.helper.assertElementVisible(this.genericSearchMappingPage.mapping,'mapping_Section');
                        await this.helper.clickElement(this.genericSearchMappingPage.mapping,'click_mapping_section');
 
 
                        //extracting the mapped stv class code
                        await this.helper.assertElementVisible(this.genericSearchMappingPage.mappedSTVClassCode,'mapped_stv_classcode');
                        let mappedStvClassCode = await this.genericSearchMappingPage.mappedSTVClassCode.textContent();
                        this.mappedStvValue = mappedStvClassCode?.split(" ")[0];
                        console.log(`Mapped STV Class Code is ${this.mappedStvValue}.`);
                        await attachment('Mapped STV Class Code is',this.mappedStvValue,'text/plain');
 
 
                        //extracting the mapped wpc class code
                        await this.helper.assertElementVisible(this.genericSearchMappingPage.mappedWPCClassCode,'mapped_wpc_classcode');
                        let mappedWpcClassCode = await this.genericSearchMappingPage.mappedWPCClassCode.textContent();
                        this.mappedWpcValue = mappedWpcClassCode?.split(" ")[0];
                        console.log(`Mapped WPC Class Code is ${this.mappedWpcValue}.`);
                        await attachment('Mapped WPC Class Code is',this.mappedWpcValue,'text/plain');
 
                       
                        break;
 
                    }else{
                        continue;
                    }
                }
            }
 
             //verifing the table data with mapped data
            if(this.stvClassCodeColumn==this.mappedStvValue && this.wpcClassCodeColumn==this.mappedWpcValue && this.featureFamilyLongDesc==this.localizedDesc){
                console.log("Ui table data is verified with mapped data");
                await attachment('Verification of UI Data with mapped data','Ui data is verified to mapped data','text/plain');
               
            }else{
                console.log("Ui data is different in mapped data");
                await attachment('Verification of UI Data with mapped data','Ui data is different to Mapped data','text/plain');
            }
        }else{
            console.log("Row is hidden");
            await attachment('Row check','Row is not available','text/plain');
        }
       
       
 
 
    }
 
 
}