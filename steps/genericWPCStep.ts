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
export class GenericWPCStep{
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
    async generic_wpc_search_by_ProjectType(){
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
        await this.helper.assertElementVisible(this.genericWPCPage.projectType,'project type');
        await this.helper.clickElement(this.genericWPCPage.projectType,'project_type_click');
        await this.helper.clickElement(this.genericWPCPage.projectTypeOption,'project_type_option');
        await this.page.keyboard.press('Tab');

        //search icon visible
        await this.helper.assertElementVisible(this.genericWPCPage.searchIcon, 'search_icon');
        await this.helper.clickElement(this.genericWPCPage.searchIcon,'search_icon');
        await this.page.waitForTimeout(3000);

        if(await this.genericWPCPage.projectColumn.isHidden()){
            //shown specific coloum
            await this.helper.assertElementVisible(this.genericWPCPage.morecolumn,'Extracoloum');
            await this.helper.clickElement(this.genericWPCPage.morecolumn,'ExtraColoum');
            const count = await this.genericWPCPage.morecolumnOption.count();
            for(let i=1;i<= count;i++){
                let coloumtext = await this.genericWPCPage.morecolumnOption.nth(i).textContent();
                if(coloumtext?.includes(testData_generic_SCL.genericWPCDataValues.projectColumn)){
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
        await this.page.waitForTimeout(3000);

        if(await this.genericWPCPage.projectColumn.isVisible()){
            console.log("project type column is visible,hence data is validated");
        }else{
            console.log("project type column is hidden");
        }



        await this.helper.assertElementVisible(this.genericWPCPage.rowLine,'first_row_value');
        if(await this.genericWPCPage.rowLine.isVisible()){
            console.log("Data is validated");
        }else{
            console.log("Data is not available");
        }

    }
    async generic_wpc_search_by_creatorId(){
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


        

        //creator id option
        await this.helper.assertElementVisible(this.genericWPCPage.creatorId,'creator_id');
        await this.helper.clickElement(this.genericWPCPage.creatorId,'creator_id');
        await this.helper.enterText(this.genericWPCPage.creatorId,testData_generic_SCL.genericWPCDataValues.familyCreatorId,'creator_id_text');
        

        //search icon visible
        await this.helper.assertElementVisible(this.genericWPCPage.searchIcon, 'search_icon');
        await this.helper.clickElement(this.genericWPCPage.searchIcon,'search_icon');
        await this.page.waitForTimeout(3000);




        if(await this.genericWPCPage.familyCreatorIdColumn.isHidden()){
            //shown specific coloum
            await this.helper.assertElementVisible(this.genericWPCPage.morecolumn,'Extracoloum');
            await this.helper.clickElement(this.genericWPCPage.morecolumn,'ExtraColoum');
            const count = await this.genericWPCPage.morecolumnOption.count();
            for(let i=1;i<= count;i++){
                let coloumtext = await this.genericWPCPage.morecolumnOption.nth(i).textContent();
                if(coloumtext?.includes(testData_generic_SCL.genericWPCDataValues.familyCreatorIdColumn)){
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
        await this.page.waitForTimeout(3000);

        if(await this.genericWPCPage.familyCreatorIdColumn.isVisible()){
            console.log("creator id column is visible,hence data is validated");
        }else{
            console.log("creator id column is hidden");
        }


        await this.helper.assertElementVisible(this.genericWPCPage.rowLine,'first_row_value');
        if(await this.genericWPCPage.rowLine.isVisible()){
            console.log("Data is validated");
        }else{
            console.log("Data is not available");
        }
    }


    async generic_wpc_search_by_feature_Code(){
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


        //feature code option
        await this.helper.assertElementVisible(this.genericWPCPage.featureCode,'creator_id');
        await this.helper.clickElement(this.genericWPCPage.featureCode,'creator_id');
        await this.helper.enterText(this.genericWPCPage.featureCode,testData_generic_SCL.genericWPCDataValues.featureCode,'creator_id_text');
        

        //search icon visible
        await this.helper.assertElementVisible(this.genericWPCPage.searchIcon, 'search_icon');
        await this.helper.clickElement(this.genericWPCPage.searchIcon,'search_icon');
        await this.page.waitForTimeout(3000);


        if(await this.genericWPCPage.featureCodeColumn.isHidden()){
            //shown specific coloum
            await this.helper.assertElementVisible(this.genericWPCPage.morecolumn,'Extracoloum');
            await this.helper.clickElement(this.genericWPCPage.morecolumn,'ExtraColoum');
            const count = await this.genericWPCPage.morecolumnOption.count();
            for(let i=1;i<= count;i++){
                let coloumtext = await this.genericWPCPage.morecolumnOption.nth(i).textContent();
                if(coloumtext?.includes(testData_generic_SCL.genericWPCDataValues.featureCodeColumn)){
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
        await this.page.waitForTimeout(3000);

        if(await this.genericWPCPage.featureCodeColumn.isVisible()){
            console.log("feature code column is visible,hence data is validated");
        }else{
            console.log("feature code column is hidden");
        }


        await this.helper.assertElementVisible(this.genericWPCPage.rowLine,'first_row_value');
        if(await this.genericWPCPage.rowLine.isVisible()){
            console.log("Data is validated");
        }else{
            console.log("Data is not available");
        }
    }


    async generic_wpc_search_by_feature_Description(){
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


        //feature description option
        await this.helper.assertElementVisible(this.genericWPCPage.featureDescription,'creator_id');
        await this.helper.clickElement(this.genericWPCPage.featureDescription,'creator_id');
        await this.helper.enterText(this.genericWPCPage.featureDescription,testData_generic_SCL.genericWPCDataValues.featureDescription,'creator_id_text');
        

        //search icon visible
        await this.helper.assertElementVisible(this.genericWPCPage.searchIcon, 'search_icon');
        await this.helper.clickElement(this.genericWPCPage.searchIcon,'search_icon');
        await this.page.waitForTimeout(10000);


        if(await this.genericWPCPage.featureDescColumn.isHidden()){
            //shown specific coloum
            await this.helper.assertElementVisible(this.genericWPCPage.morecolumn,'Extracoloum');
            await this.helper.clickElement(this.genericWPCPage.morecolumn,'ExtraColoum');
            const count = await this.genericWPCPage.morecolumnOption.count();
            for(let i=1;i<= count;i++){
                let coloumtext = await this.genericWPCPage.morecolumnOption.nth(i).textContent();
                if(coloumtext?.includes(testData_generic_SCL.genericWPCDataValues.featureDescColumn)){
                    await this.helper.assertElementVisible(this.genericWPCPage.visibilitybutton.nth(i),'visibilityBtn');
                    await this.helper.clickElement(this.genericWPCPage.visibilitybutton.nth(i),'visibilityBtn');
                    await this.page.keyboard.press('Tab');
                    break;
    
                }
            }

            await this.helper.assertElementVisible(this.genericWPCPage.searchIcon, 'search_icon');
            await this.helper.clickElement(this.genericWPCPage.searchIcon,'search_icon');
            await this.page.waitForTimeout(10000);

        }else{
            console.log("Column is already visible");
        }



        

        if(await this.genericWPCPage.featureDescColumn.isVisible()){
            console.log("feature description column is visible,hence data is validated");
        }else{
            console.log("feature description column is hidden");
        }


        await this.helper.assertElementVisible(this.genericWPCPage.rowLine,'first_row_value');
        if(await this.genericWPCPage.rowLine.isVisible()){
            console.log("Data is validated");
        }else{
            console.log("Data is not available");
        }
    }
}