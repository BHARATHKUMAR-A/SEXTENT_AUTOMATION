import { Locator, Page, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { SearchMappingPage } from '../pages/searchMappingPage';
import searchData_Mapping_FF from '../test-data/searchData_Mapping_FF.json';
import { Console, log } from 'console';
import { attachment } from 'allure-js-commons';
import * as fs from 'fs';

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
    getRandomNumber: (locator: any, name: any) => Promise<number>;
    assertElementDisabled: (element: any, elementName: string)=> Promise<boolean>;
    toggleButtonAction: (locator: Locator,element: string)=> Promise<void>;
}

export class SearchMappingSteps{
    private page: Page;
    private testInfo: TestInfo;
    private helper: StepHelper;
    private homePage: HomePage;
    private searchMappingPage: SearchMappingPage;

    constructor(page:Page,testInfo:TestInfo,stepHelper: StepHelper) {
            this.page=page;
            this.testInfo=testInfo;
            this.helper=stepHelper;
            this.homePage=new HomePage(page);
            this.searchMappingPage=new SearchMappingPage(page);
        }

    async navigateTo_search_Mapping_SCL_ToggleOff_STV_Mapping(){
        await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
        await this.helper.clickElement(this.homePage.genericDict, 'genericDict');

        //go to search SCL Feature
        await this.helper.assertElementVisible(this.homePage.search,'search');
        await this.helper.clickElement(this.homePage.search, 'search');
        
        //toggle button off
        await this.helper.toggleButtonAction(this.searchMappingPage.toggleButton,'toggleButton');

        //Mapping Button
        await this.helper.assertElementVisible(this.searchMappingPage.mappingBtn,'MappingButton');
        await this.helper.clickElement(this.searchMappingPage.mappingBtn,'MappingButton');
        
        //Advance Search Dropdown
        await this.helper.assertElementVisible(this.searchMappingPage.arrowDown,'arrowDown');
        await this.helper.clickElement(this.searchMappingPage.arrowDown,'arrowDown');

        //SCL Advance search Dropdown
        await this.helper.assertElementVisible(this.searchMappingPage.arrowDownSCL,'SCLSpeificCriteria');
        await this.helper.clickElement(this.searchMappingPage.arrowDownSCL,'SCLSpeificCriteria');
        
        //Search with family code
        await this.helper.assertElementVisible(this.searchMappingPage.familyCode,'FamilyCode');
        await this.helper.clickElement(this.searchMappingPage.familyCode,'FamilyCode');
        await this.helper.enterText(this.searchMappingPage.familyCode,searchData_Mapping_FF.testData.FamilyCode,'FamilyCode');
        
        //search button
        await this.helper.assertElementVisible(this.searchMappingPage.searchBtn,'searchButton');
        await this.helper.clickElement(this.searchMappingPage.searchBtn,'searchButton');
        
        //data visibility check
        await this.searchMappingPage.data.waitFor({state:'visible'});
        await this.helper.assertElementVisible(this.searchMappingPage.data,'Data');
        let message_report: string;
        if(await this.searchMappingPage.data.isVisible()){
            message_report=`${searchData_Mapping_FF.testData.FamilyCode} data is available`;
        }else{
            message_report=`${searchData_Mapping_FF.testData.FamilyCode} data is not available`;
        }
        console.log(message_report);
        attachment('Data Visibility Check',message_report,'text/plain');
        if(await this.searchMappingPage.featureValueVisibility.isVisible()){
            message_report="all feature value column are visible";
        }else{
            message_report="all feature value column are hidden";
        }
        console.log(message_report);
        attachment('Feature family column Visibility',message_report,'text/plain');

        //validate the data
        const description=await this.searchMappingPage.expecteddescription.textContent();
        
        message_report=`Description EN (Feature Family) for SCL: ${description}`;
        console.log(message_report);
        attachment('SCL Description',message_report,'text/plain');
        const language=await this.searchMappingPage.expectedLanguage.textContent();
        message_report=`Language (Feature Family) for SCL: ${language}`;
        console.log(message_report);
        attachment('SCL Language',message_report,'text/plain');
        await this.helper.assertElementVisible(this.searchMappingPage.clickFamilyCode,'familyCodeBtn');
        await this.helper.clickElement(this.searchMappingPage.clickFamilyCode,'familyCodeBtn');
        if(await this.searchMappingPage.actualDescription.inputValue()==description){
            message_report="Expected Description Data same as Actual Data ✅";
        }else{
            message_report="Expected Description Data not same as Actual Data ❌";
        }
        console.log(message_report);
        attachment('SCL Description data matching',message_report,'text/plain');
        const count =await this.searchMappingPage.actualLanguage.count();
        let check=0;
        for(let i=0;i<count;i++){
            const word=await this.searchMappingPage.actualLanguage.nth(i).textContent();
            if(language?.includes(`${word}`)){
                check++;
                continue;
            }
            break;
        }
        if(check==count){
            message_report="Expected Language Data same as Actual Data ✅";   
        }else{
            message_report="Expected Language Data not same as Actual Data ❌";
        }
        console.log(message_report);
        attachment('SCL Language data matching',message_report,'text/plain');
        //back to list
        await this.helper.assertElementVisible(this.searchMappingPage.backBtn,'BackButton');
        await this.helper.clickElement(this.searchMappingPage.backBtn,'BackButton');
        await this.helper.clickElement(this.searchMappingPage.clickFamilyCode,'familyCodeBtn');
        await this.helper.assertElementVisible(this.searchMappingPage.MappingSection,'Mappingsection');
        await this.helper.clickElement(this.searchMappingPage.MappingSection,'Mappingsection');
        let STVData= await this.searchMappingPage.DataSTVMap.allTextContents();
        let WPCData=await this.searchMappingPage.DataWPCMap.allTextContents();
        await this.helper.assertElementVisible(this.searchMappingPage.backBtn,'BackButton');
        await this.helper.clickElement(this.searchMappingPage.backBtn,'BackButton');
        //check mapping with STV
        if(!(await this.searchMappingPage.expectedTopology.textContent()=="-")){
            message_report=`${searchData_Mapping_FF.testData.FamilyCode} code Mapped 🔀 with STV`;
            console.log(message_report);
            attachment('STV Mapping with SCL',message_report,'text/plain');
            const topology=await this.searchMappingPage.expectedTopology.textContent();
            message_report=`Topology for STV: ${topology}`;
            console.log(message_report);
            attachment('STV Topology',message_report,'text/plain');
            const classCode=await this.searchMappingPage.expectedclassCode.textContent();
            message_report=`Class Code for STV: ${classCode}`;
            console.log(message_report);
            attachment('STV Class Code',message_report,'text/plain');
            const descriptionclassCode= await this.searchMappingPage.expecteddescriptionClassCode.textContent();
            message_report=`Description (Class Code) for STV: ${descriptionclassCode}`;
            console.log(message_report);
            attachment('STV Description',message_report,'text/plain');
            
            
            if(STVData.some(text=>text.search(`${topology}`))){
                message_report="expected topology data same as actual data ✅"; 
            }else{
                message_report="expected topology data not same as actual data ❌";
            }
            console.log(message_report);
            attachment('STV Topology data matching',message_report,'text/plain');
            if(STVData.some(text=>text.search(`${descriptionclassCode}`))){
                message_report="expected descriptionclassCode data same as actual data ✅"; 
            }else{
                message_report="expected descriptionclassCode data not same as actual data ❌";
            }
            console.log(message_report);
            attachment('STV Description data matching',message_report,'text/plain');
        }else{
            message_report=`${searchData_Mapping_FF.testData.FamilyCode} code is not❌ Mapped 🔀 with STV`;
            console.log(message_report);
            attachment('STV Mapping with SCL',message_report,'text/plain');
        }

 
        //check mapping with WPC
        if(!(await this.searchMappingPage.expectedWPCfamilyCode.textContent()=="-"||await this.searchMappingPage.expectedWPCfamilyCode.textContent()=="")){
            message_report=`${searchData_Mapping_FF.testData.FamilyCode} code Mapped 🔀 with WPC`;
            console.log(message_report);
            attachment('WPC mapping with SCL',message_report,'text/plain');

            const wpcclascode= await this.searchMappingPage.expectedWPCfamilyCode.textContent();
            message_report=`Class Code for WPC: ${wpcclascode}`;
            console.log(message_report);
            attachment('WPC Family code',message_report,'text/plain');
            
            const longdescription = await this.searchMappingPage.expectedlongdescriptionfamilyCode.textContent();
            message_report=`Long Description for WPC: ${longdescription}`;
            console.log(message_report);
            attachment('WPC Long Description',message_report,'text/plain');
            
            const mediumdescription= await this.searchMappingPage.expectedmediumDescriptionFamilycode.textContent();
            message_report=`Medium Description for WPC: ${mediumdescription}`;
            console.log(message_report);
            attachment('WPC Medium Description',message_report,'text/plain');
            
            const shortdescription=  await this.searchMappingPage.expectedshortDescription.textContent();
            message_report=`Short Description for WPC: ${shortdescription}`;
            console.log(message_report);
            attachment('WPC Short Description',message_report,'text/plain');
            
            //const allData= await this.searchMappingPage.DataWPCMap.allTextContents();
            
            
            if(WPCData.some(text=>text.search(`${longdescription}`))){
                message_report="expected long description data same as actual data ✅"; 
            }else{
                message_report="expected long description data not same as actual data ❌";
            }
            console.log(message_report);
            attachment('WPC Long Description data matching',message_report,'text/plain');

            if(WPCData.some(text=>text.search(`${mediumdescription}`))){
                message_report="expected Medium description data same as actual data ✅"; 
            }else{
                message_report="expected Medium description data not same as actual data ❌";
            }
            console.log(message_report);
            attachment('WPC Nedium Description data matching',message_report,'text/plain');

            if(WPCData.some(text=>text.search(`${shortdescription}`))){
                message_report="expected short description data same as actual data ✅"; 
            }else{
                message_report="expected Short description data not same as actual data ❌";
            }
            console.log(message_report);
            attachment('WPC Short Description data matching',message_report,'text/plain');
        }else{
             message_report=`${searchData_Mapping_FF.testData.FamilyCode} code is not❌ Mapped 🔀 with WPC`;
            console.log(message_report);
            attachment('WPC Mapping with SCL',message_report,'text/plain');
        }

    }



    async navigateTo_search_Mapping_WPC_ToggleOff_STV_Mapping(){
        await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
        await this.helper.clickElement(this.homePage.genericDict, 'genericDict');

        //go to search SCL Feature
        await this.helper.assertElementVisible(this.homePage.search,'search');
        await this.helper.clickElement(this.homePage.search, 'search');
        

        //toggle button off
        await this.helper.toggleButtonAction(this.searchMappingPage.toggleButton,'toggleButton');

        //Mapping Button
        await this.helper.assertElementVisible(this.searchMappingPage.mappingBtn,'MappingButton');
        await this.helper.clickElement(this.searchMappingPage.mappingBtn,'MappingButton');
        
        //Advance Search Dropdown
        await this.helper.assertElementVisible(this.searchMappingPage.arrowDown,'arrowDown');
        await this.helper.clickElement(this.searchMappingPage.arrowDown,'arrowDown');

        //SCL Advance search Dropdown
        await this.helper.assertElementVisible(this.searchMappingPage.arrowDownWPC,'WPCSpeificCriteria');
        await this.helper.clickElement(this.searchMappingPage.arrowDownWPC,'WPCSpeificCriteria');
        
        //Search with family code
        await this.helper.assertElementVisible(this.searchMappingPage.WPCFamilyCode,'FamilyCode');
        await this.helper.clickElement(this.searchMappingPage.WPCFamilyCode,'FamilyCode');
        await this.helper.enterText(this.searchMappingPage.WPCFamilyCode,searchData_Mapping_FF.WPC_testData.FamilyCode,'FamilyCode');
        
        //search button
        await this.helper.assertElementVisible(this.searchMappingPage.searchBtn,'searchButton');
        await this.helper.clickElement(this.searchMappingPage.searchBtn,'searchButton');
        
        //data visibility check
        await this.searchMappingPage.data.waitFor({state:'visible'});
        await this.helper.assertElementVisible(this.searchMappingPage.data,'Data');
        let message_report: string;
        let mapping =0;
        if(await this.searchMappingPage.data.isVisible()){
            message_report=`${searchData_Mapping_FF.WPC_testData.FamilyCode} data is available`;
        }else{
            message_report=`${searchData_Mapping_FF.WPC_testData.FamilyCode} data is not available`;
        }
        console.log(message_report);
        attachment('Data Visibility Check',message_report,'text/plain');
        if(await this.searchMappingPage.featureValueVisibility.isVisible()){
            message_report="all feature value column are visible";
        }else{
            message_report="all feature value column are hidden";
        }
        console.log(message_report);
        attachment('Feature family column Visibility',message_report,'text/plain');
        let CodeSCL;
        //validate the data
        if(!(await this.searchMappingPage.SCLCode.textContent()=="")){
        message_report=`${searchData_Mapping_FF.WPC_testData.FamilyCode} code Mapped 🔀 with WPC`;
        console.log(message_report);
        attachment('SCL Description data matching',message_report,'text/plain');
        
        const description=await this.searchMappingPage.expecteddescriptionByWPC.textContent();
        
        message_report=`Description EN (Feature Family) for SCL: ${description}`;
        console.log(message_report);
        attachment('SCL Description',message_report,'text/plain');
        const language=await this.searchMappingPage.expectedLanguageByWPC.textContent();
        message_report=`Language (Feature Family) for SCL: ${language}`;
        console.log(message_report);
        attachment('SCL Language',message_report,'text/plain');
        await this.helper.assertElementVisible(this.searchMappingPage.SCLCode,'familyCodeBtn');
        CodeSCL=await this.searchMappingPage.SCLCode.textContent();
        await this.helper.clickElement(this.page.locator(`//table//tbody//mat-row//mat-cell//div//a[.='${CodeSCL}']`),'SCLCOde');
        // await this.helper.clickElement(this.searchMappingPage.SCLCode,'familyCodeBtn');
        if(await this.searchMappingPage.actualDescription.inputValue()==description){
            message_report="Expected Description Data same as Actual Data ✅";
            mapping++;
        }else{
            message_report="Expected Description Data not same as Actual Data ❌";
        }
        console.log(message_report);
        attachment('SCL Description data matching',message_report,'text/plain');
        const count =await this.searchMappingPage.actualLanguage.count();
        let check=0;
        for(let i=0;i<count;i++){
            const word=await this.searchMappingPage.actualLanguage.nth(i).textContent();
            if(language?.includes(`${word}`)){
                check++;
                continue;
            }
            break;
        }
        if(check==count){
            message_report="Expected Language Data same as Actual Data ✅";
            mapping++;
        }else{
            message_report="Expected Language Data not same as Actual Data ❌";
        }
        console.log(message_report);
        attachment('SCL Language data matching',message_report,'text/plain');
        
        
        //back to list
        await this.helper.assertElementVisible(this.searchMappingPage.backBtn,'BackButton');
        await this.helper.clickElement(this.searchMappingPage.backBtn,'BackButton');
        await this.helper.clickElement(this.page.locator(`//table//tbody//mat-row//mat-cell//div//a[.='${CodeSCL}']`),'SCLCOde');
        
        await this.helper.assertElementVisible(this.searchMappingPage.MappingSection,'Mappingsection');
        await this.helper.clickElement(this.searchMappingPage.MappingSection,'Mappingsection');
        let STVData= await this.searchMappingPage.DataSTVMap.allTextContents();
        let WPCData=await this.searchMappingPage.DataWPCMap.allTextContents();
        await this.helper.assertElementVisible(this.searchMappingPage.backBtn,'BackButton');
        await this.helper.clickElement(this.searchMappingPage.backBtn,'BackButton');
        //check mapping with STV
        if(!(await this.searchMappingPage.expectedTopologyByWPC.textContent()=="-")){
            message_report=`${searchData_Mapping_FF.WPC_testData.FamilyCode} code Mapped 🔀 with STV`;
            console.log(message_report);
            attachment('STV Mapping with SCL',message_report,'text/plain');
            const topology=await this.searchMappingPage.expectedTopologyByWPC.textContent();
            message_report=`Topology for STV: ${topology}`;
            console.log(message_report);
            attachment('STV Topology',message_report,'text/plain');
            const classCode=await this.searchMappingPage.expectedclassCodeByWPC.textContent();
            message_report=`Class Code for STV: ${classCode}`;
            console.log(message_report);
            attachment('STV Class Code',message_report,'text/plain');
            const descriptionclassCode= await this.searchMappingPage.expecteddescriptionClassCodeByWPC.textContent();
            message_report=`Description (Class Code) for STV: ${descriptionclassCode}`;
            console.log(message_report);
            attachment('STV Description',message_report,'text/plain');
            
            
            if(STVData.some(text=>text.search(`${topology}`))){
                message_report="expected topology data same as actual data ✅"; 
            }else{
                message_report="expected topology data not same as actual data ❌";
            }
            console.log(message_report);
            attachment('STV Topology data matching',message_report,'text/plain');
            if(STVData.some(text=>text.search(`${descriptionclassCode}`))){
                message_report="expected descriptionclassCode data same as actual data ✅"; 
            }else{
                message_report="expected descriptionclassCode data not same as actual data ❌";
            }
            console.log(message_report);
            attachment('STV Description data matching',message_report,'text/plain');
        }else{
            message_report=`${searchData_Mapping_FF.WPC_testData.FamilyCode} code is not❌ Mapped 🔀 with STV`;
            console.log(message_report);
            attachment('STV Mapping with SCL',message_report,'text/plain');
        }
        }else{
            message_report=`${searchData_Mapping_FF.WPC_testData.FamilyCode} code is not❌ Mapped 🔀 with WPC`;
            console.log(message_report);
            attachment('SCL Description data matching',message_report,'text/plain');
            message_report=`${searchData_Mapping_FF.WPC_testData.FamilyCode} code do not❌ Have SCL Code `;
            console.log(message_report);
            attachment('SCL Description data matching',message_report,'text/plain');
        
        }
    }
}