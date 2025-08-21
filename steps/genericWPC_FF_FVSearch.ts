import { Locator, Page  } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import testData_generic_WPC from "../test-data/testData_generic_WPC.json";
import { GenericWPCPage } from "../pages/WPC_Mapping_page";  
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
export class GenericWPC_FF_FVSearch{
    private page: Page;
    private testInfo: TestInfo;
    private helper: StepHelper;
    private homePage: HomePage;
    private genericWPCPage: GenericWPCPage;
    private rowData: Locator;
    private tableSclFtFamilyCode: any;
    private tableStvClassCode: any;
    private WPCCodeColumn: any;
    private mappedStvValue: any;
    private mappedSclValue: any;
    private FFDesc: any;
    private localizedDescription: any;
 
    constructor(page: Page, testInfo: TestInfo, stepHelper: StepHelper){
        this.page = page;
        this.testInfo = testInfo;
        this.homePage = new HomePage(page);
        this.helper = stepHelper;
        this.genericWPCPage = new GenericWPCPage(page);
    }
 
    async generic_wpc_search_by_FamCode_Mapping()
    {
        //genericdict
        await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
        await this.helper.clickElement(this.homePage.genericDict, 'genericDict');
 
        //search option
        await this.helper.assertElementVisible(this.genericWPCPage.search, 'search_option');
        await this.helper.clickElement(this.genericWPCPage.search,'search_option_clicked');
 
 
        //mapping button
        await this.helper.assertElementVisible(this.genericWPCPage.mappingButton,'mapping');
        await this.helper.clickElement(this.genericWPCPage.mappingButton,'mapping_button');
 
        //first dropdown option
        await this.helper.assertElementVisible(this.genericWPCPage.firstDropdown,'first_dropdown');
        await this.helper.clickElement(this.genericWPCPage.firstDropdown,'first_dropdown_click');
 
        //second span dropdown for WPC
        await this.helper.assertElementVisible(this.genericWPCPage.wpcSpecDropdown,'wpc_dropdown');
        await this.helper.clickElement(this.genericWPCPage.wpcSpecDropdown,'wpc_dropdown_click');
 
        //family code field
        await this.helper.assertElementVisible(this.genericWPCPage.wpcFamCode,'wpc_family_code');
        await this.helper.clickElement(this.genericWPCPage.wpcFamCode,'family_code_click');
        await this.helper.enterText(this.genericWPCPage.wpcFamCode,testData_generic_WPC.genericWPC_FF_FVSearch.wpcFamCode,'famcode_text');
        await attachment('WPC Family Code',JSON.stringify(testData_generic_WPC.genericWPC_FF_FVSearch.wpcFamCode,null,2),'application/json');
 
 
        //search icon visible
        await this.helper.assertElementVisible(this.genericWPCPage.searchIcon, 'search_icon');
        await this.helper.clickElement(this.genericWPCPage.searchIcon,'search_icon');
        await this.page.waitForTimeout(3000);
 
        //await this.helper.assertElementVisible(this.genericWPCPage.rowLine,'first_row_value');
        let isValid: boolean = false;   //bool check
        if(await this.genericWPCPage.rowLine.isVisible())
            {
            isValid = true;
            console.log("Data is visible and validated");
            await attachment('Row visibility','Row is visible','text/plain');
            }
        else
        {
            console.log("Data is hidden");
            await attachment('Row visibility','Row is Hidden','text/plain');
        }
 
        let rowValue = await this.genericWPCPage.paginator.textContent();
        let rowCount:any = rowValue?.split(" ")[5];
        console.log(`Row count is ${rowCount}`);
        await attachment('Row Count',rowCount,'text/plain');
 
        if(isValid)
        {
        for(let i = 0; i < rowCount ; i++)
        {
            if(await this.genericWPCPage.rows.nth(i).isVisible())
            {
                this.tableSclFtFamilyCode = await this.genericWPCPage.rows.nth(i).locator('mat-cell:nth-of-type(1)').textContent();
                await attachment('Table SCL code',this.tableSclFtFamilyCode,'text/plain');
                this.FFDesc = await this.genericWPCPage.rows.nth(i).locator('mat-cell:nth-of-type(2)').textContent();
                await attachment('Table SCL Desc',this.FFDesc,'text/plain');
                let typology = await this.genericWPCPage.rows.nth(i).locator('mat-cell:nth-of-type(8)').textContent();
                this.tableStvClassCode = await this.genericWPCPage.rows.nth(i).locator('mat-cell:nth-of-type(9)').textContent();
                await attachment('Table STV code',this.tableStvClassCode,'text/plain');
                this.WPCCodeColumn = await this.genericWPCPage.rows.nth(i).locator('mat-cell:nth-of-type(13)').textContent();
                await attachment('Table WPC code',this.WPCCodeColumn,'text/plain');
                let longDesc = await this.genericWPCPage.rows.nth(i).locator('mat-cell:nth-of-type(14)').textContent();
                console.log(`SCL FF Code is ${this.tableSclFtFamilyCode}`);
                console.log(`Table Description is ${this.FFDesc}`);
                console.log(`STV Class Code is ${this.tableStvClassCode}`);
                console.log(`WPC Code is ${this.WPCCodeColumn}`);
                if(this.WPCCodeColumn == testData_generic_WPC.genericWPC_FF_FVSearch.wpcFamCode && typology != '-' && longDesc != '-')
                {
                    await this.helper.clickElement(this.genericWPCPage.rows.nth(i).locator('//mat-cell[1]/div/a'),'click_FF_code');
                    await this.helper.assertElementVisible(this.genericWPCPage.localizedDescription,'localized_description');
                    this.localizedDescription = await this.genericWPCPage.localizedDescription.inputValue();
                    console.log(`Localized Description is ${this.localizedDescription}`);
                    await attachment('Mapped SCL Desc',this.localizedDescription,'text/plain');
 
                    //extraction of mapping data section
                    await this.helper.assertElementVisible(this.genericWPCPage.mappingSection,'mapping_section');
                    await this.helper.clickElement(this.genericWPCPage.mappingSection,'click_mapping_option');
 
                    //mapped data extraction -- STV
                    await this.helper.assertElementVisible(this.genericWPCPage.mappedStvClassCode,'mapped_stv_class_code');
                    let mappedStvClassCode = await this.genericWPCPage.mappedStvClassCode.textContent();
                    this.mappedStvValue = mappedStvClassCode?.split(" ")[0];
                    console.log(`Mapped STV Class Code is ${this.mappedStvValue}.`);
                    await attachment('Mapped STV code',this.mappedStvValue,'text/plain');
 
                    //mapped data extraction -- SCL
                    await this.helper.assertElementVisible(this.genericWPCPage.mappedSCLFFCode,'mapped_scl_ft_ff_code');
                    let mappedSCLFFCode = await this.genericWPCPage.mappedSCLFFCode.textContent();
                    this.mappedSclValue = mappedSCLFFCode?.split(" ")[0];
                    console.log(`Mapped SCL FF Code is ${this.mappedSclValue}.`);
                    await attachment('Mapped SCL code',this.mappedSclValue,'text/plain');
 
                    //mapped data extraction -- WPC
                    await this.helper.assertElementVisible(this.genericWPCPage.mappedWPCCode,'mapped_wpc_code');
                    let mappedWPCCode = await this.genericWPCPage.mappedWPCCode.textContent();
                    let mappedWpcValue:any = mappedWPCCode?.split(" ")[0];
                    console.log(`Mapped WPC Code is ${mappedWpcValue}.`);
                    await attachment('Mapped WPC code',mappedWpcValue,'text/plain');
                    break;
                }
                else
                {
                    continue;
                }
            }
        }
    }
    else
    {
        console.log("Row is hidden.");
        await attachment('Rows availability','Rows is not available','text/plain');
    }
   
        //mapped data verification
        if(this.tableSclFtFamilyCode==this.mappedSclValue && this.tableStvClassCode==this.mappedStvValue && this.FFDesc==this.localizedDescription)
        {
            console.log("UI Data is validated and verified with mapped data.");
            await attachment('Ui data verification with Mapped data','Ui data is verified with mapped data','text/plain');
        }
        else
        {
            console.log("UI Data is different from mapped data.");
            await attachment('Ui data verification with Mapped data','Ui data is different to mapped data','text/plain');
        }
    }
}
 