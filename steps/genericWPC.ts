import { Page  } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import testData_generic_SCL from "../test-data/testData_generic_SCL.json";
import { GenericWPCPage } from "../pages/genericWPCPage";


interface TestInfo {
    [key: string]: any;
}

interface StepHelper {
    clickElement: (locator: any, name: string) => Promise<void>;
    enterText: (locator: any, value: string, name: string) => Promise<void>;
    assertElementVisible: (locator: any, name: string) => Promise<void>
    clearText:(locator:any,text:string) => Promise<void>;
}
export class GenericWPC{
    private page: Page;
    private testInfo: TestInfo;
    private helper: StepHelper;
    private homePage: HomePage;
    private genericWPCPage: GenericWPCPage;

    constructor(page: Page, testInfo: TestInfo, stepHelper: StepHelper){
        this.page = page;
        this.testInfo = testInfo;
        this.homePage = new HomePage(page);
        this.helper = stepHelper;
        this.genericWPCPage = new GenericWPCPage(page);
    }
    async generic_wpc_search_by_BusinessType(){
        //genericdict 
        await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
        await this.helper.clickElement(this.homePage.genericDict, 'genericDict');

        //search option
        await this.helper.assertElementVisible(this.genericWPCPage.search, 'search_option');
        await this.helper.clickElement(this.genericWPCPage.search,'search_option_clicked');

        //structure option
        await this.helper.assertElementVisible(this.genericWPCPage.structure,'structure');
        await this.helper.clickElement(this.genericWPCPage.structure,'structure_option');
        await this.helper.clickElement(this.genericWPCPage.structureValue,'structure_value');

        //first keyboard toggle option
        await this.helper.assertElementVisible(this.genericWPCPage.firstKeyBoardToggle,'first_keyboard_toggle');
        await this.helper.clickElement(this.genericWPCPage.firstKeyBoardToggle,'first_keyboard_toggle_click');

        //second span toggle option
        await this.helper.assertElementVisible(this.genericWPCPage.secondSpanToggle,'second_span_toggle');
        await this.helper.clickElement(this.genericWPCPage.secondSpanToggle,'second_span_toggle_click');

        //project type option
        await this.helper.assertElementVisible(this.genericWPCPage.businessType,'project type');
        await this.helper.clickElement(this.genericWPCPage.businessType,'project_type_click');
        await this.helper.clickElement(this.genericWPCPage.businessTypeOption,'project_type_option');
        await this.page.keyboard.press('Tab');

        //search icon visible
        await this.helper.assertElementVisible(this.genericWPCPage.searchIcon, 'search_icon');
        await this.helper.clickElement(this.genericWPCPage.searchIcon,'search_icon');
        await this.page.waitForTimeout(10000);


        if(await this.genericWPCPage.businessColumn.isHidden()){
            //shown specific coloum
            await this.helper.assertElementVisible(this.genericWPCPage.morecolumn,'Extracoloum');
            await this.helper.clickElement(this.genericWPCPage.morecolumn,'ExtraColoum');
            const count = await this.genericWPCPage.morecolumnOption.count();
            for(let i=1;i<= count;i++){
                let coloumtext = await this.genericWPCPage.morecolumnOption.nth(i).textContent();
                if(coloumtext?.includes(testData_generic_SCL.genericWPCDataValues.moreColumnBusinessType)){
                    await this.helper.assertElementVisible(this.genericWPCPage.visibilitybutton.nth(i),'visibilityBtn');
                    await this.helper.clickElement(this.genericWPCPage.visibilitybutton.nth(i),'visibilityBtn');
                    await this.page.keyboard.press('Tab');
                    break;
    
                }
            }

        }else{
            console.log("Column is already visible");
        }


        await this.helper.assertElementVisible(this.genericWPCPage.searchIcon, 'search_icon');
        await this.helper.clickElement(this.genericWPCPage.searchIcon,'search_icon');
        await this.page.waitForTimeout(10000);
        

        if(await this.genericWPCPage.businessColumn.isVisible()){
            console.log("Data is validated");
        }else{
            console.log("data is not validated");
        }

        await this.helper.assertElementVisible(this.genericWPCPage.rowLine,'first_row_value');
        if(await this.genericWPCPage.rowLine.isVisible()){
            console.log("Data is validated");
        }else{
            console.log("Data is not available");
        }

    }
    async generic_wpc_search_by_Feature_Application(){
        //genericdict 
        await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
        await this.helper.clickElement(this.homePage.genericDict, 'genericDict');

        //search option
        await this.helper.assertElementVisible(this.genericWPCPage.search, 'search_option');
        await this.helper.clickElement(this.genericWPCPage.search,'search_option_clicked');

        //structure option
        await this.helper.assertElementVisible(this.genericWPCPage.structure,'structure');
        await this.helper.clickElement(this.genericWPCPage.structure,'structure_option');
        await this.helper.clickElement(this.genericWPCPage.structureValue,'structure_value');

        //first keyboard toggle option
        await this.helper.assertElementVisible(this.genericWPCPage.firstKeyBoardToggle,'first_keyboard_toggle');
        await this.helper.clickElement(this.genericWPCPage.firstKeyBoardToggle,'first_keyboard_toggle_click');

        //second span toggle option
        await this.helper.assertElementVisible(this.genericWPCPage.secondSpanToggle,'second_span_toggle');
        await this.helper.clickElement(this.genericWPCPage.secondSpanToggle,'second_span_toggle_click');


        //feature application option
        await this.helper.assertElementVisible(this.genericWPCPage.featurePackage,'feature');
        await this.helper.clickElement(this.genericWPCPage.featurePackage,'feature_option');
        await this.helper.clickElement(this.genericWPCPage.featurePackageOption,'feature_package_option');
        await this.page.keyboard.press('Tab');

        
        

        //search icon visible
        await this.helper.assertElementVisible(this.genericWPCPage.searchIcon, 'search_icon');
        await this.helper.clickElement(this.genericWPCPage.searchIcon,'search_icon');
        await this.page.waitForTimeout(10000);





        //shown specific coloum
        if(await this.genericWPCPage.featureApplicationColumn.isHidden()){
            await this.helper.assertElementVisible(this.genericWPCPage.morecolumn,'Extracoloum');
            await this.helper.clickElement(this.genericWPCPage.morecolumn,'ExtraColoum');
            const count = await this.genericWPCPage.morecolumnOption.count();
            for(let i=1;i<= count;i++){
                let coloumtext = await this.genericWPCPage.morecolumnOption.nth(i).textContent();
                if(coloumtext?.includes(testData_generic_SCL.genericWPCDataValues.moreColumnFeatureApplication)){
                    await this.helper.assertElementVisible(this.genericWPCPage.visibilitybutton.nth(i),'visibilityBtn');
                    await this.helper.clickElement(this.genericWPCPage.visibilitybutton.nth(i),'visibilityBtn');
                    await this.page.keyboard.press('Tab');
                    break;
    
                }
            }
        }else{
            console.log("feature column is visible");
        }

        await this.helper.assertElementVisible(this.genericWPCPage.searchIcon, 'search_icon');
        await this.helper.clickElement(this.genericWPCPage.searchIcon,'search_icon');
        await this.page.waitForTimeout(10000);
        
        if(await this.genericWPCPage.featureApplicationColumn.isVisible()){
            console.log("feature application data is validated");
        }else{
            console.log("feature application column is not visible, hence data is not validated");
        }


        await this.helper.assertElementVisible(this.genericWPCPage.rowLine,'first_row_value');
        if(await this.genericWPCPage.rowLine.isVisible()){
            console.log("Data is validated");
        }else{
            console.log("Data is not available");
        }
    }


    async generic_wpc_search_by_Package_Type(){
        //genericdict 
        await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
        await this.helper.clickElement(this.homePage.genericDict, 'genericDict');

        //search option
        await this.helper.assertElementVisible(this.genericWPCPage.search, 'search_option');
        await this.helper.clickElement(this.genericWPCPage.search,'search_option_clicked');

        //structure option
        await this.helper.assertElementVisible(this.genericWPCPage.structure,'structure');
        await this.helper.clickElement(this.genericWPCPage.structure,'structure_option');
        await this.helper.clickElement(this.genericWPCPage.structureValue,'structure_value');

        //first keyboard toggle option
        await this.helper.assertElementVisible(this.genericWPCPage.firstKeyBoardToggle,'first_keyboard_toggle');
        await this.helper.clickElement(this.genericWPCPage.firstKeyBoardToggle,'first_keyboard_toggle_click');

        //second span toggle option
        await this.helper.assertElementVisible(this.genericWPCPage.secondSpanToggle,'second_span_toggle');
        await this.helper.clickElement(this.genericWPCPage.secondSpanToggle,'second_span_toggle_click');


        //feature application option
        await this.helper.assertElementVisible(this.genericWPCPage.packageType,'feature');
        await this.helper.clickElement(this.genericWPCPage.packageType,'feature_option');
        await this.helper.clickElement(this.genericWPCPage.packageTypeOption,'feature_package_option');
        await this.page.keyboard.press('Tab');

        
        

        //search icon visible
        await this.helper.assertElementVisible(this.genericWPCPage.searchIcon, 'search_icon');
        await this.helper.clickElement(this.genericWPCPage.searchIcon,'search_icon');
        await this.page.waitForTimeout(10000);



        if(await this.genericWPCPage.featurePackageTypeColumn.isHidden()){
            await this.helper.assertElementVisible(this.genericWPCPage.morecolumn,'Extracoloum');
            await this.helper.clickElement(this.genericWPCPage.morecolumn,'ExtraColoum');
            const count = await this.genericWPCPage.morecolumnOption.count();
            for(let i=1;i<= count;i++){
                let coloumtext = await this.genericWPCPage.morecolumnOption.nth(i).textContent();
                if(coloumtext?.includes(testData_generic_SCL.genericWPCDataValues.moreColumnFeaturePackageType)){
                    await this.helper.assertElementVisible(this.genericWPCPage.visibilitybutton.nth(i),'visibilityBtn');
                    await this.helper.clickElement(this.genericWPCPage.visibilitybutton.nth(i),'visibilityBtn');
                    await this.page.keyboard.press('Tab');
                    break;
    
                }
            }
        }else{
            console.log("feature package type column is visible");
        }

        await this.helper.assertElementVisible(this.genericWPCPage.searchIcon, 'search_icon');
        await this.helper.clickElement(this.genericWPCPage.searchIcon,'search_icon');
        await this.page.waitForTimeout(10000);


        if(await this.genericWPCPage.featurePackageTypeColumn.isVisible()){
            console.log("feature package type data is validated");
        }else{
            console.log("feature package type column is hidden, hence data is not validated");
        }

        
        


        await this.helper.assertElementVisible(this.genericWPCPage.rowLine,'first_row_value');
        if(await this.genericWPCPage.rowLine.isVisible()){
            console.log("Data is validated");
        }else{
            console.log("Data is not available");
        }
    }


    async generic_wpc_search_by_Component_Type(){
        //genericdict 
        await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
        await this.helper.clickElement(this.homePage.genericDict, 'genericDict');

        //search option
        await this.helper.assertElementVisible(this.genericWPCPage.search, 'search_option');
        await this.helper.clickElement(this.genericWPCPage.search,'search_option_clicked');

        //structure option
        await this.helper.assertElementVisible(this.genericWPCPage.structure,'structure');
        await this.helper.clickElement(this.genericWPCPage.structure,'structure_option');
        await this.helper.clickElement(this.genericWPCPage.structureValue,'structure_value');

        //first keyboard toggle option
        await this.helper.assertElementVisible(this.genericWPCPage.firstKeyBoardToggle,'first_keyboard_toggle');
        await this.helper.clickElement(this.genericWPCPage.firstKeyBoardToggle,'first_keyboard_toggle_click');

        //second span toggle option
        await this.helper.assertElementVisible(this.genericWPCPage.secondSpanToggle,'second_span_toggle');
        await this.helper.clickElement(this.genericWPCPage.secondSpanToggle,'second_span_toggle_click');


        //feature application option
        await this.helper.assertElementVisible(this.genericWPCPage.componentType,'feature');
        await this.helper.clickElement(this.genericWPCPage.componentType,'feature_option');
        await this.helper.enterText(this.genericWPCPage.componentType,testData_generic_SCL.genericWPCDataValues.componentText,'component_text');

        
        

        //search icon visible
        await this.helper.assertElementVisible(this.genericWPCPage.searchIcon, 'search_icon');
        await this.helper.clickElement(this.genericWPCPage.searchIcon,'search_icon');
        await this.page.waitForTimeout(3000);



        //shown specific coloum
        await this.helper.assertElementVisible(this.genericWPCPage.morecolumn,'Extracoloum');
        await this.helper.clickElement(this.genericWPCPage.morecolumn,'ExtraColoum');
        const count = await this.genericWPCPage.morecolumnOption.count();
        for(let i=1;i<= count;i++){
            let coloumtext = await this.genericWPCPage.morecolumnOption.nth(i).textContent();
            if(coloumtext?.includes(testData_generic_SCL.genericWPCDataValues.componentType)){
                await this.helper.assertElementVisible(this.genericWPCPage.visibilitybutton.nth(i),'visibilityBtn');
                await this.helper.clickElement(this.genericWPCPage.visibilitybutton.nth(i),'visibilityBtn');
                await this.page.keyboard.press('Tab');
                break;
 
            }
        }


        await this.helper.assertElementVisible(this.genericWPCPage.rowLine,'first_row_value');
        if(await this.genericWPCPage.rowLine.isVisible()){
            console.log("Data is validated");
        }else{
            console.log("Data is not available");
        }
    }

    async generic_wpc_search_by_Creator_ID(){
        //genericdict 
        await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
        await this.helper.clickElement(this.homePage.genericDict, 'genericDict');

        //search option
        await this.helper.assertElementVisible(this.genericWPCPage.search, 'search_option');
        await this.helper.clickElement(this.genericWPCPage.search,'search_option_clicked');

        //structure option
        await this.helper.assertElementVisible(this.genericWPCPage.structure,'structure');
        await this.helper.clickElement(this.genericWPCPage.structure,'structure_option');
        await this.helper.clickElement(this.genericWPCPage.structureValue,'structure_value');

        //first keyboard toggle option
        await this.helper.assertElementVisible(this.genericWPCPage.firstKeyBoardToggle,'first_keyboard_toggle');
        await this.helper.clickElement(this.genericWPCPage.firstKeyBoardToggle,'first_keyboard_toggle_click');

        //second span toggle option
        await this.helper.assertElementVisible(this.genericWPCPage.secondSpanToggle,'second_span_toggle');
        await this.helper.clickElement(this.genericWPCPage.secondSpanToggle,'second_span_toggle_click');


        //feature application option
        await this.helper.assertElementVisible(this.genericWPCPage.featureCreatorId,'feature');
        await this.helper.clickElement(this.genericWPCPage.featureCreatorId,'feature_option');
        await this.helper.enterText(this.genericWPCPage.featureCreatorId,testData_generic_SCL.genericWPCDataValues.featureCreatorId,'component_text');

        
        

        //search icon visible
        await this.helper.assertElementVisible(this.genericWPCPage.searchIcon, 'search_icon');
        await this.helper.clickElement(this.genericWPCPage.searchIcon,'search_icon');
        await this.page.waitForTimeout(3000);


        //shown specific coloum
        await this.helper.assertElementVisible(this.genericWPCPage.morecolumn,'Extracoloum');
        await this.helper.clickElement(this.genericWPCPage.morecolumn,'ExtraColoum');
        const count = await this.genericWPCPage.morecolumnOption.count();
        for(let i=1;i<= count;i++){
            let coloumtext = await this.genericWPCPage.morecolumnOption.nth(i).textContent();
            if(coloumtext?.includes(testData_generic_SCL.genericWPCDataValues.creatorId)){
                await this.helper.assertElementVisible(this.genericWPCPage.visibilitybutton.nth(i),'visibilityBtn');
                await this.helper.clickElement(this.genericWPCPage.visibilitybutton.nth(i),'visibilityBtn');
                await this.page.keyboard.press('Tab');
                break;
 
            }
        }





        await this.helper.assertElementVisible(this.genericWPCPage.rowLine,'first_row_value');
        if(await this.genericWPCPage.rowLine.isVisible()){
            console.log("Data is validated");
        }else{
            console.log("Data is not available");
        }
    }

    async generic_scl_search_by_bypass(){
        //genericdict 
        await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
        await this.helper.clickElement(this.homePage.genericDict, 'genericDict');

        //search option
        await this.helper.assertElementVisible(this.genericWPCPage.search, 'search_option');
        await this.helper.clickElement(this.genericWPCPage.search,'search_option_clicked');

        //structure option
        await this.helper.assertElementVisible(this.genericWPCPage.structure,'structure');
        await this.helper.clickElement(this.genericWPCPage.structure,'structure_option');
        await this.helper.clickElement(this.genericWPCPage.newStructureValue,'structure_value');

        //first keyboard toggle option
        await this.helper.assertElementVisible(this.genericWPCPage.firstKeyBoardToggle,'first_keyboard_toggle');
        await this.helper.clickElement(this.genericWPCPage.firstKeyBoardToggle,'first_keyboard_toggle_click');

        //second span toggle option
        await this.helper.assertElementVisible(this.genericWPCPage.secondSpanToggle,'second_span_toggle');
        await this.helper.clickElement(this.genericWPCPage.secondSpanToggle,'second_span_toggle_click');


        //bypass value
        await this.helper.assertElementVisible(this.genericWPCPage.bypass,'bypass_dropdown');
        await this.helper.clickElement(this.genericWPCPage.bypass,'bypass_dropdown_click');
        await this.helper.clickElement(this.genericWPCPage.bypassValue,'bypass_value');
        await this.page.keyboard.press('Tab');


         //search icon visible
        await this.helper.assertElementVisible(this.genericWPCPage.searchIcon, 'search_icon');
        await this.helper.clickElement(this.genericWPCPage.searchIcon,'search_icon');
        await this.page.waitForTimeout(3000);



         if(await this.genericWPCPage.bypassColumn.isHidden()){
            await this.helper.assertElementVisible(this.genericWPCPage.morecolumn,'Extracoloum');
            await this.helper.clickElement(this.genericWPCPage.morecolumn,'ExtraColoum');
            const count = await this.genericWPCPage.morecolumnOption.count();
            for(let i=1;i<= count;i++){
                let coloumtext = await this.genericWPCPage.morecolumnOption.nth(i).textContent();
                if(coloumtext?.includes(testData_generic_SCL.genericWPCDataValues.bypassColumn)){
                    await this.helper.assertElementVisible(this.genericWPCPage.visibilitybutton.nth(i),'visibilityBtn');
                    await this.helper.clickElement(this.genericWPCPage.visibilitybutton.nth(i),'visibilityBtn');
                    await this.page.keyboard.press('Tab');
                    break;
    
                }
            }
        }else{
            console.log("mandatory bypass value column is visible");
        }





        await this.helper.assertElementVisible(this.genericWPCPage.searchIcon, 'search_icon');
        await this.helper.clickElement(this.genericWPCPage.searchIcon,'search_icon');
        await this.page.waitForTimeout(3000);


        if(await this.genericWPCPage.bypassColumn.isVisible()){
            console.log("mandatory bypass value data is validated");
        }else{
            console.log("mandatory bypass value column is hidden, hence data is not validated");
        }

        await this.helper.assertElementVisible(this.genericWPCPage.rowLine,'first_row_value');
        if(await this.genericWPCPage.rowLine.isVisible()){
            console.log("Data is validated");
        }else{
            console.log("Data is not available");
        }


        
        
    }
}