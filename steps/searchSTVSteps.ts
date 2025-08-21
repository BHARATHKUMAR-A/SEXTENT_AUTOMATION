import { Locator, Page, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import searchTestData_STV_FF from '../test-data/searchTestData_STV_FF.json';
import credentials from '../test-data/credentials.json';
import { GenericSTVPage } from '../pages/genericSTVPage';

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

export class SearchSTVSteps {
    private page: Page;
    private testInfo: TestInfo;
    private helper: StepHelper;
    private homePage: HomePage;
    private selectRandomCode: Locator;
    private classCode: string;
    private genericSTVPage: GenericSTVPage;

    //constructor to initialize the objects
    constructor(page: Page, testInfo: TestInfo, stepHelper: StepHelper) {
        this.page = page;
        this.testInfo = testInfo;
        this.helper = stepHelper;
        this.homePage = new HomePage(page);
        this.genericSTVPage = new GenericSTVPage(page);
        this.classCode = '';
    }

//search for STV data with code,keyword and toggle button
async navigateTo_search_STV_code() {

    await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
    await this.helper.clickElement(this.homePage.genericDict, 'genericDict');

    await this.helper.assertElementVisible(this.homePage.search, 'search');
    await this.helper.clickElement(this.homePage.search, 'search');

    await this.helper.assertElementVisible(this.genericSTVPage.singleRadioButton, "singleRadioButton");
    await this.helper.clickElement(this.genericSTVPage.singleRadioButton, 'singleRadioButton');
    
    await this.helper.assertElementVisible(this.genericSTVPage.structureDropdown, "structureDropdown");
    await this.helper.clickElement(this.genericSTVPage.structureDropdown, "structureDropdown");
    await this.helper.clickElement(this.genericSTVPage.structureDropdownOption, "structureDropdown");
                
    await this.helper.assertElementVisible(this.genericSTVPage.searchByCode, "searchByCode");
    await this.helper.enterText(this.genericSTVPage.searchByCode, searchTestData_STV_FF.testData.searchByCode, "searchByCode");

    await this.helper.assertElementVisible(this.genericSTVPage.searchByKeyword, "searchByKeyword");
    await this.helper.enterText(this.genericSTVPage.searchByKeyword, searchTestData_STV_FF.testData.searchByKeyword, "searchByKeyword");

    await this.helper.assertElementVisible(this.genericSTVPage.searchIcon, 'searchIcon');
    await this.helper.clickElement(this.genericSTVPage.searchIcon, 'searchIcon');

    await this.genericSTVPage.data.waitFor({state:'visible'});
        
    if (await this.genericSTVPage.data.isVisible()) {
        console.log(`${searchTestData_STV_FF.testData.structure} data is available`);
             
        if (await this.genericSTVPage.classData.textContent() && await this.genericSTVPage.salesData.textContent()) {
                console.log('Both class code and sales code are present, toggle is ON');
            } else {
                console.log('Only class code is present, toggle is OFF');
                 }
            } else {
                 console.log(`${searchTestData_STV_FF.testData.structure} data is not available`);
            }
            
    await this.helper.assertElementVisible(this.genericSTVPage.toggleButton, 'toggleButton');
    await this.helper.clickElement(this.genericSTVPage.toggleButton, 'toggleButton');

    await this.genericSTVPage.data.waitFor({state:'visible'});
        
    await this.helper.assertElementVisible(this.genericSTVPage.searchIcon, 'searchIcon');
    await this.helper.clickElement(this.genericSTVPage.searchIcon, 'searchIcon');

    await this.genericSTVPage.data.waitFor({state:'visible'});

    if(await this.genericSTVPage.salesCodeVisibility.isVisible()){
            console.log('sale code is visible, toggle is ON');
        }else{
            console.log('sales code is hidden, toggle is OFF');
        }    
    }

   

//search for STV data with class code
async navigateTo_search_STV_code_specific_creteria_class_code(){

    await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
    await this.helper.clickElement(this.homePage.genericDict, 'genericDict');

    await this.helper.assertElementVisible(this.homePage.search, 'search');
    await this.helper.clickElement(this.homePage.search, 'search');

    await this.helper.assertElementVisible(this.genericSTVPage.singleRadioButton, "singleRadioButton");
    await this.helper.clickElement(this.genericSTVPage.singleRadioButton, 'singleRadioButton');
        
    await this.helper.assertElementVisible(this.genericSTVPage.structureDropdown, "structureDropdown");
    await this.helper.clickElement(this.genericSTVPage.structureDropdown, "structureDropdown");
    await this.helper.clickElement(this.genericSTVPage.structureDropdownOption, "structureDropdown");

    await this.helper.assertElementVisible(this.genericSTVPage.arrowIcon, 'arrowIcon');
    await this.helper.clickElement(this.genericSTVPage.arrowIcon, 'arrowIcon');
     
    await this.helper.assertElementVisible(this.genericSTVPage.stvSpecificCriteria, 'stvSpecificCriteria');
    await this.helper.clickElement(this.genericSTVPage.stvSpecificCriteria, 'stvSpecificCriteria');

    await this.helper.assertElementVisible(this.genericSTVPage.classCodeSearch, "classCodeSearch");
    await this.helper.enterText(this.genericSTVPage.classCodeSearch, searchTestData_STV_FF.testData.classCodeSearch, "classCodeSearch");
   
    await this.helper.assertElementVisible(this.genericSTVPage.searchIcon, 'searchIcon');
    await this.helper.clickElement(this.genericSTVPage.searchIcon, 'searchIcon');

    await this.genericSTVPage.data.waitFor({state:'visible'});
        if(await this.genericSTVPage.data.isVisible()){
            console.log(`${searchTestData_STV_FF.testData.structure} data is available`);
        }else{
            console.log(`${searchTestData_STV_FF.testData.structure} data is not available`);
        }
     
    let availablibility =0;
    const countColumn = await this.genericSTVPage.columnAvailable.count();
    for(let i=0;i<countColumn;i++){
        let coloumtext = await this.genericSTVPage.columnAvailable.nth(i).textContent();
        if(coloumtext?.includes(searchTestData_STV_FF.moreColumn.classCode)){
            availablibility=1;
            break;
        }
    }
    if(availablibility==0){
    await this.helper.assertElementVisible(this.genericSTVPage.morecolumn,'Extracoloum');
    await this.helper.clickElement(this.genericSTVPage.morecolumn,'ExtraColoum');
    const count = await this.genericSTVPage.morecolumnOption.count();
    for(let i=1;i<= count;i++){
        let coloumtext = await this.genericSTVPage.morecolumnOption.nth(i).textContent();
        if(coloumtext?.includes(searchTestData_STV_FF.moreColumn.classCode)){
            await this.helper.assertElementVisible(this.genericSTVPage.visibilitybutton.nth(i),'visibilityBtn');
            await this.helper.clickElement(this.genericSTVPage.visibilitybutton.nth(i),'visibilityBtn');
            await this.page.keyboard.press('Tab');
            break;
        }
    }
    }else{
        console.log(`${searchTestData_STV_FF.moreColumn.classCode} is already visible`);
    }
}
    
//search for STV data with class code description
async navigateTo_search_STV_code_specific_creteria_class_code_desc(){

    await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
    await this.helper.clickElement(this.homePage.genericDict, 'genericDict');

    await this.helper.assertElementVisible(this.homePage.search, 'search');
    await this.helper.clickElement(this.homePage.search, 'search');

    await this.helper.assertElementVisible(this.genericSTVPage.singleRadioButton, "singleRadioButton");
    await this.helper.clickElement(this.genericSTVPage.singleRadioButton, 'singleRadioButton');
    
    await this.helper.assertElementVisible(this.genericSTVPage.structureDropdown, "structureDropdown");
    await this.helper.clickElement(this.genericSTVPage.structureDropdown, "structureDropdown");
    await this.helper.clickElement(this.genericSTVPage.structureDropdownOption, "structureDropdown");

    await this.helper.assertElementVisible(this.genericSTVPage.arrowIcon, 'arrowIcon');
    await this.helper.clickElement(this.genericSTVPage.arrowIcon, 'arrowIcon');
        
    await this.helper.assertElementVisible(this.genericSTVPage.stvSpecificCriteria, 'stvSpecificCriteria');
    await this.helper.clickElement(this.genericSTVPage.stvSpecificCriteria, 'stvSpecificCriteria');

    await this.helper.assertElementVisible(this.genericSTVPage.classCodeDescSearch, "classCodeDescSearch");
    await this.helper.enterText(this.genericSTVPage.classCodeDescSearch, searchTestData_STV_FF.testData.classCodeDescSearch, "classCodeDescSearch");

    await this.helper.assertElementVisible(this.genericSTVPage.searchIcon, 'searchIcon');
    await this.helper.clickElement(this.genericSTVPage.searchIcon, 'searchIcon');

    await this.genericSTVPage.data.waitFor({state:'visible'});
        if(await this.genericSTVPage.data.isVisible()){
            console.log(`${searchTestData_STV_FF.testData.structure} data is available`);
        }else{
            console.log(`${searchTestData_STV_FF.testData.structure} data is not available`);
        }

        let availablibility =0;
        const countColumn = await this.genericSTVPage.columnAvailable.count();
        for(let i=0;i<countColumn;i++){
            let coloumtext = await this.genericSTVPage.columnAvailable.nth(i).textContent();
            if(coloumtext?.includes(searchTestData_STV_FF.moreColumn.classCodeDesc)){
            availablibility=1;
            break;
        }
    }
        if(availablibility==0){
        await this.helper.assertElementVisible(this.genericSTVPage.morecolumn,'Extracoloum');
        await this.helper.clickElement(this.genericSTVPage.morecolumn,'ExtraColoum');
        const count = await this.genericSTVPage.morecolumnOption.count();
        for(let i=1;i<= count;i++){
        let coloumtext = await this.genericSTVPage.morecolumnOption.nth(i).textContent();
        if(coloumtext?.includes(searchTestData_STV_FF.moreColumn.classCodeDesc)){
            await this.helper.assertElementVisible(this.genericSTVPage.visibilitybutton.nth(i),'visibilityBtn');
            await this.helper.clickElement(this.genericSTVPage.visibilitybutton.nth(i),'visibilityBtn');
            await this.page.keyboard.press('Tab');
            break;
        }
    }
    }else{
        console.log(`${searchTestData_STV_FF.moreColumn.classCodeDesc} is already visible`);
    }
}



//search for STV data with creator id
async navigateTo_search_STV_code_specific_creteria_creator_id(){

    await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
    await this.helper.clickElement(this.homePage.genericDict, 'genericDict');

    await this.helper.assertElementVisible(this.homePage.search, 'search');
    await this.helper.clickElement(this.homePage.search, 'search');

    await this.helper.assertElementVisible(this.genericSTVPage.singleRadioButton, "singleRadioButton");
    await this.helper.clickElement(this.genericSTVPage.singleRadioButton, 'singleRadioButton');
    
    await this.helper.assertElementVisible(this.genericSTVPage.structureDropdown, "structureDropdown");
    await this.helper.clickElement(this.genericSTVPage.structureDropdown, "structureDropdown");
    await this.helper.clickElement(this.genericSTVPage.structureDropdownOption, "structureDropdown");

    await this.helper.assertElementVisible(this.genericSTVPage.arrowIcon, 'arrowIcon');
    await this.helper.clickElement(this.genericSTVPage.arrowIcon, 'arrowIcon');
        
    await this.helper.assertElementVisible(this.genericSTVPage.stvSpecificCriteria, 'stvSpecificCriteria');
    await this.helper.clickElement(this.genericSTVPage.stvSpecificCriteria, 'stvSpecificCriteria');

    await this.helper.assertElementVisible(this.genericSTVPage.classCreatorID, "classCreatorID");
    await this.helper.enterText(this.genericSTVPage.classCreatorID, credentials.validUser.username, "classCreatorID");

    //await this.helper.assertElementVisible(this.genericSTVPage.salesCreatorID, "salesCreatorID");
    // await this.helper.enterText(this.genericSTVPage.salesCreatorID, credentials.validUser.username, "salesCreatorID");

    await this.helper.assertElementVisible(this.genericSTVPage.searchIcon, 'searchIcon');
    await this.helper.clickElement(this.genericSTVPage.searchIcon, 'searchIcon');

    await this.genericSTVPage.data.waitFor({state:'visible'});
        if(await this.genericSTVPage.data.isVisible()){
            console.log(`${searchTestData_STV_FF.testData.structure} data is available`);
        }else{
            console.log(`${searchTestData_STV_FF.testData.structure} data is not available`);
        }

        let availablibility =0;
        const countColumn = await this.genericSTVPage.columnAvailable.count();
        for(let i=0;i<countColumn;i++){
            let coloumtext = await this.genericSTVPage.columnAvailable.nth(i).textContent();
            if(coloumtext?.includes(searchTestData_STV_FF.moreColumn.classCreatorID)){
                availablibility=1;
                break;
            }
        }
        if(availablibility==0){
        await this.helper.assertElementVisible(this.genericSTVPage.morecolumn,'Extracoloum');
        await this.helper.clickElement(this.genericSTVPage.morecolumn,'ExtraColoum');
        const count = await this.genericSTVPage.morecolumnOption.count();
        for(let i=1;i<= count;i++){
            let coloumtext = await this.genericSTVPage.morecolumnOption.nth(i).textContent();
            if(coloumtext?.includes(searchTestData_STV_FF.moreColumn.classCreatorID)){
                await this.helper.assertElementVisible(this.genericSTVPage.visibilitybutton.nth(i),'visibilityBtn');
                await this.helper.clickElement(this.genericSTVPage.visibilitybutton.nth(i),'visibilityBtn');
                await this.page.keyboard.press('Tab');
                break;
            }
        }
        }else{
            console.log(`${searchTestData_STV_FF.moreColumn.classCreatorID} is already visible`);
        }
   }



//search for STV data with sales code 
async navigateTo_search_STV_code_specific_creteria_sales_code(){

    await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
    await this.helper.clickElement(this.homePage.genericDict, 'genericDict');

    await this.helper.assertElementVisible(this.homePage.search, 'search');
    await this.helper.clickElement(this.homePage.search, 'search');

    await this.helper.assertElementVisible(this.genericSTVPage.singleRadioButton, "singleRadioButton");
    await this.helper.clickElement(this.genericSTVPage.singleRadioButton, 'singleRadioButton');
    
    await this.helper.assertElementVisible(this.genericSTVPage.structureDropdown, "structureDropdown");
    await this.helper.clickElement(this.genericSTVPage.structureDropdown, "structureDropdown");
    await this.helper.clickElement(this.genericSTVPage.structureDropdownOption, "structureDropdown");

    await this.helper.assertElementVisible(this.genericSTVPage.arrowIcon, 'arrowIcon');
    await this.helper.clickElement(this.genericSTVPage.arrowIcon, 'arrowIcon');
        
    await this.helper.assertElementVisible(this.genericSTVPage.stvSpecificCriteria, 'stvSpecificCriteria');
    await this.helper.clickElement(this.genericSTVPage.stvSpecificCriteria, 'stvSpecificCriteria');

    await this.helper.assertElementVisible(this.genericSTVPage.salesCodeSearch, "salesCodeSearch");
    await this.helper.enterText(this.genericSTVPage.salesCodeSearch, searchTestData_STV_FF.testData.salesCodeSearch, "salesCodeSearch");

    await this.helper.assertElementVisible(this.genericSTVPage.searchIcon, 'searchIcon');
    await this.helper.clickElement(this.genericSTVPage.searchIcon, 'searchIcon');

    await this.genericSTVPage.data.waitFor({state:'visible'});
       if(await this.genericSTVPage.data.isVisible()){
           console.log(`${searchTestData_STV_FF.testData.structure} data is available`);
       }else{
           console.log(`${searchTestData_STV_FF.testData.structure} data is not available`);
       }

       let availablibility =0;
       const countColumn = await this.genericSTVPage.columnAvailable.count();
       for(let i=0;i<countColumn;i++){
           let coloumtext = await this.genericSTVPage.columnAvailable.nth(i).textContent();
           if(coloumtext?.includes(searchTestData_STV_FF.moreColumn.salesCode)){
               availablibility=1;
               break;
           }
       }
       if(availablibility==0){
       await this.helper.assertElementVisible(this.genericSTVPage.morecolumn,'Extracoloum');
       await this.helper.clickElement(this.genericSTVPage.morecolumn,'ExtraColoum');
       const count = await this.genericSTVPage.morecolumnOption.count();
       for(let i=1;i<= count;i++){
           let coloumtext = await this.genericSTVPage.morecolumnOption.nth(i).textContent();
           if(coloumtext?.includes(searchTestData_STV_FF.moreColumn.salesCode)){
               await this.helper.assertElementVisible(this.genericSTVPage.visibilitybutton.nth(i),'visibilityBtn');
               await this.helper.clickElement(this.genericSTVPage.visibilitybutton.nth(i),'visibilityBtn');
               await this.page.keyboard.press('Tab');
               break;
           }
       }
       }else{
           console.log(`${searchTestData_STV_FF.moreColumn.salesCode} is already visible`);
       }
   }



//search for STV data with sales code description
async navigateTo_search_STV_code_specific_creteria_sales_code_Desc(){

    await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
    await this.helper.clickElement(this.homePage.genericDict, 'genericDict');

    await this.helper.assertElementVisible(this.homePage.search, 'search');
    await this.helper.clickElement(this.homePage.search, 'search');

    await this.helper.assertElementVisible(this.genericSTVPage.singleRadioButton, "singleRadioButton");
    await this.helper.clickElement(this.genericSTVPage.singleRadioButton, 'singleRadioButton');
    
    await this.helper.assertElementVisible(this.genericSTVPage.structureDropdown, "structureDropdown");
    await this.helper.clickElement(this.genericSTVPage.structureDropdown, "structureDropdown");
    await this.helper.clickElement(this.genericSTVPage.structureDropdownOption, "structureDropdown");

    await this.helper.assertElementVisible(this.genericSTVPage.arrowIcon, 'arrowIcon');
    await this.helper.clickElement(this.genericSTVPage.arrowIcon, 'arrowIcon');
        
    await this.helper.assertElementVisible(this.genericSTVPage.stvSpecificCriteria, 'stvSpecificCriteria');
    await this.helper.clickElement(this.genericSTVPage.stvSpecificCriteria, 'stvSpecificCriteria');

    await this.helper.assertElementVisible(this.genericSTVPage.salesCodeDescSearch, "salesCodeDescSearch");
    await this.helper.enterText(this.genericSTVPage.salesCodeDescSearch, searchTestData_STV_FF.testData.salesCodeDescSearch, "salesCodeDescSearch");

    await this.helper.assertElementVisible(this.genericSTVPage.searchIcon, 'searchIcon');
    await this.helper.clickElement(this.genericSTVPage.searchIcon, 'searchIcon');

    await this.genericSTVPage.data.waitFor({state:'visible'});
       if(await this.genericSTVPage.data.isVisible()){
           console.log(`${searchTestData_STV_FF.testData.structure} data is available`);
       }else{
           console.log(`${searchTestData_STV_FF.testData.structure} data is not available`);
       }

       let availablibility =0;
       const countColumn = await this.genericSTVPage.columnAvailable.count();
       for(let i=0;i<countColumn;i++){
           let coloumtext = await this.genericSTVPage.columnAvailable.nth(i).textContent();
           if(coloumtext?.includes(searchTestData_STV_FF.moreColumn.salesCodeDesc)){
               availablibility=1;
               break;
           }
       }
       if(availablibility==0){
       await this.helper.assertElementVisible(this.genericSTVPage.morecolumn,'Extracoloum');
       await this.helper.clickElement(this.genericSTVPage.morecolumn,'ExtraColoum');
       const count = await this.genericSTVPage.morecolumnOption.count();
       for(let i=1;i<= count;i++){
           let coloumtext = await this.genericSTVPage.morecolumnOption.nth(i).textContent();
           if(coloumtext?.includes(searchTestData_STV_FF.moreColumn.salesCodeDesc)){
               await this.helper.assertElementVisible(this.genericSTVPage.visibilitybutton.nth(i),'visibilityBtn');
               await this.helper.clickElement(this.genericSTVPage.visibilitybutton.nth(i),'visibilityBtn');
               await this.page.keyboard.press('Tab');
               break;
           }
       }
       }else{
           console.log(`${searchTestData_STV_FF.moreColumn.salesCodeDesc} is already visible`);
       }
   }
}