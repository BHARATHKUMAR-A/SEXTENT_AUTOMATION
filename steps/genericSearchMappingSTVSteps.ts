import { Page} from '@playwright/test';
import { HomePage } from "../pages/homePage";
import { GenericSearchSTVMappingPage } from "../pages/genericSearchSTVMappingPage";
import TestData_Generic_Mapping_STV from "../test-data/testData_generic_Mapping_STV.json";
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
 
export class GenericSearchMappingSTVStep{
    private page: Page;
    private testInfo: TestInfo;
    private helper: StepHelper;
    private homePage: HomePage;
    private genericSearchMappingSTVPage :  GenericSearchSTVMappingPage;
    private tableSCLClassCode : any;
    private tableSCLDesc : any;
    private tableWPCClassCode : any;
    private mappedSCLDesc : any;
    private mappedSCLCode : any;
    private mappedWPCCode : any;
   
 
    constructor(page: Page, testInfo: TestInfo, stepHelper: StepHelper){
        this.page = page;
        this.testInfo = testInfo;
        this.helper = stepHelper;
        this.homePage = new HomePage(page);
        this.genericSearchMappingSTVPage = new GenericSearchSTVMappingPage(page);
 
    }
 
    async stv_mapping_search_by_code(){
        //genericdict
        await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
        await this.helper.clickElement(this.homePage.genericDict, 'genericDict');
 
        //search option
        await this.helper.assertElementVisible(this.genericSearchMappingSTVPage.search,'search_part');
        await this.helper.clickElement(this.genericSearchMappingSTVPage.search,'click_search_part');
 
       
        //radio button
        await this.helper.assertElementVisible(this.genericSearchMappingSTVPage.mappingRadioButton,'mapped_radio_button');
        await this.helper.clickElement(this.genericSearchMappingSTVPage.mappingRadioButton,'click_on_radio_button');
 
        //first toggle button
        await this.helper.assertElementVisible(this.genericSearchMappingSTVPage.firstToggleButton,'first_toggle');
        await this.helper.clickElement(this.genericSearchMappingSTVPage.firstToggleButton,'click_first_toggle');
 
        //stv toggle
        await this.helper.assertElementVisible(this.genericSearchMappingSTVPage.stvToggleButton,'stv_toggle');
        await this.helper.clickElement(this.genericSearchMappingSTVPage.stvToggleButton,'click_stv_toggle');
 
        //stv class code input box
        await this.helper.assertElementVisible(this.genericSearchMappingSTVPage.stvClassCode,'class_code')
        await this.helper.clickElement(this.genericSearchMappingSTVPage.stvClassCode,'click_class_code');
        await this.helper.enterText(this.genericSearchMappingSTVPage.stvClassCode,TestData_Generic_Mapping_STV.testData.stvCode,'enter_class_code');
        await attachment('STV class code ',JSON.stringify(TestData_Generic_Mapping_STV.testData.stvCode,null,2),'application/json');
 
        //search icon
        await this.helper.assertElementVisible(this.genericSearchMappingSTVPage.searchIcon,'search_icon');
        await this.helper.clickElement(this.genericSearchMappingSTVPage.searchIcon,'click_search_icon');
        await this.page.waitForTimeout(4000);
 
        //check row is visible
        let isAvail:boolean = false;
        if(await this.genericSearchMappingSTVPage.rowLine.isVisible()){
            isAvail = true;
            console.log("Rowline is visible");
            await attachment('Row visibility','Row is Visible','text/plain');
        }else{
            console.log("Rowline is hidden");
            await attachment('Row visibility','Row is Hidden','text/plain');
        }
 
        //extracting row count value
        await this.helper.assertElementVisible(this.genericSearchMappingSTVPage.paginator,'paginator');
        let rowValue = await this.genericSearchMappingSTVPage.paginator.textContent();
        let rowCount:any = rowValue?.split(" ")[5];
        console.log(`Total row is: ${rowCount}`);
        await attachment('Row Count',rowCount,'text/plain');
 
 
        if(isAvail){
 
            for(let i=0;i<rowCount;i++){
                if(await this.genericSearchMappingSTVPage.rows.nth(i).isVisible()){
                    this.tableSCLClassCode = await this.genericSearchMappingSTVPage.rows.nth(i).locator("mat-cell:nth-of-type(1)").textContent();
                    await attachment('Table SCL code',this.tableSCLClassCode,'text/plain');
                    this.tableSCLDesc = await this.genericSearchMappingSTVPage.rows.nth(i).locator("mat-cell:nth-of-type(2)").textContent();
                    await attachment('Table SCL Desc',this.tableSCLDesc,'text/plain');
                    this.tableWPCClassCode = await this.genericSearchMappingSTVPage.rows.nth(i).locator("mat-cell:nth-of-type(13)").textContent();
                    await attachment('Table WPC code',this.tableWPCClassCode,'text/plain');
                    let tableWPCDesc = await this.genericSearchMappingSTVPage.rows.nth(i).locator("mat-cell:nth-of-type(14)").textContent();
                    console.log(`Table scl code is: ${this.tableSCLClassCode}`);
                    console.log(`Table scl desc is: ${this.tableSCLDesc}`);
                    console.log(`Table wpc code is: ${this.tableWPCClassCode}`);
                    console.log(`Table wpc desc is: ${tableWPCDesc}`);
                    if(this.tableSCLClassCode==TestData_Generic_Mapping_STV.testData.sclCode && tableWPCDesc != '-'){
                        await this.helper.clickElement(this.genericSearchMappingSTVPage.rows.nth(i).locator("//mat-cell[1]/div/a"),'click_feature_family_code');
 
                        //extracted localized description
                        await this.helper.assertElementVisible(this.genericSearchMappingSTVPage.localizedDesc,'localized_Desc');
                        this.mappedSCLDesc = await this.genericSearchMappingSTVPage.localizedDesc.inputValue();
                        console.log(`mapped scl desc is: ${this.mappedSCLDesc}`);
                        await attachment('Mapped SCL Desc',this.mappedSCLDesc,'text/plain');
 
                        //mapping section
                        await this.helper.assertElementVisible(this.genericSearchMappingSTVPage.mapping,'mapping_section');
                        await this.helper.clickElement(this.genericSearchMappingSTVPage.mapping,'click_mapping_section');
 
                        //extract mapped scl code
                        await this.helper.assertElementVisible(this.genericSearchMappingSTVPage.mappedSclCode,'mapped_scl_code');
                        let sclcode = await this.genericSearchMappingSTVPage.mappedSclCode.textContent();
                        this.mappedSCLCode = sclcode?.split(" ")[0];
                        console.log(`mapped scl code is: ${this.mappedSCLCode}`);
                        await attachment('Mapped SCL code',this.mappedSCLCode,'text/plain');
 
                        //extract mapped wpc code
                        await this.helper.assertElementVisible(this.genericSearchMappingSTVPage.mappedWPCClassCode,'mapped_wpc_code');
                        let wpccode = await this.genericSearchMappingSTVPage.mappedWPCClassCode.textContent();
                        this.mappedWPCCode = wpccode?.split(" ")[0];
                        console.log(`mapped wpc code is: ${this.mappedWPCCode}`);
                        await attachment('Mapped WPC code',this.mappedWPCCode,'text/plain');
                        break;
 
                    }else{
                        continue;
                    }
                }
            }
 
            //verifing the UI data with mapped data
            if(this.tableSCLClassCode==this.mappedSCLCode && this.tableSCLDesc==this.mappedSCLDesc && this.tableWPCClassCode==this.mappedWPCCode){
                console.log("Ui data is validated and verified");
                await attachment('Ui data verification with Mapped data','Ui data is verified with mapped data','text/plain');
            }else{
                console.log("Ui data is different with mapped data");
                await attachment('Ui data verification with Mapped data','Ui data is different to mapped data','text/plain');
            }
        }else{
            console.log("Row is not available");
            await attachment('Rows availability','Rows is not available','text/plain');
        }
 
 
    }
}