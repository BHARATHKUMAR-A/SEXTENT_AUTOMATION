import { Locator, Page, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { attachment } from 'allure-js-commons';
import testData_SearchByCode_FF from '../test-data/testData_SearchByCode.json';
import { log } from 'node:console';
import { SearchByCodePageToggleOn } from '../pages/searchByCodePage_Mapping_FF_FV';

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
    generateRandomManualCode: (length: number) => Promise<string>;
    checkLocators: (locator1: any, locator2: any, locator3: any) => Promise<boolean>;
    clearText: (locator: any, text: string) => Promise<void>;
    codeLength: () => Promise<number>;
    assertTextboxValue: (locator: Locator, expectedValue: string, label: string) => Promise<void>;
}
export class SearchByCodeStepsToggleOn {
    private page: Page;
    private testInfo: TestInfo;
    private helper: StepHelper;
    private homePage: HomePage;
    private searchByCodePage: SearchByCodePageToggleOn;

    //constructor to initialize the objects
    constructor(page: Page, testInfo: TestInfo, stepHelper: StepHelper) {
        this.page = page;
        //  this.testInfo = testInfo;
        this.helper = stepHelper;
        this.homePage = new HomePage(page);
        this.searchByCodePage = new SearchByCodePageToggleOn(page);
    }



    async search_by_code_initial_steps_Toggle_on() {

        //navigate to Generic Dictionary
        await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
        await this.helper.clickElement(this.homePage.genericDict, 'genericDict');

        //navigate to search tab
        await this.helper.assertElementVisible(this.homePage.search, 'searchTab');
        await this.helper.clickElement(this.homePage.search, 'searchTab');

        //check is toggel off and mapping button is enabled
        await this.helper.clickElement(this.searchByCodePage.mappingValue, 'mappingValue');
        await this.helper.assertElementEnabled(this.searchByCodePage.mappingValue, 'MappingValue');

        //select search by code
        await this.helper.assertElementVisible(this.searchByCodePage.searchByCode, 'searchByCode');
        await this.helper.enterText(this.searchByCodePage.searchByCode, testData_SearchByCode_FF.testDataForCodeSearchToggleOn.searchByCode, 'searchByCode');


        await this.helper.assertElementVisible(this.searchByCodePage.searchIcon, 'searchIcon');
        await this.helper.clickElement(this.searchByCodePage.searchIcon, 'searchIcon');
        let message_report;
        if (await this.searchByCodePage.searchResultTable.isVisible()) {
            message_report = `${testData_SearchByCode_FF.testDataForCodeSearchToggleOn.searchByCode} data is available`;
        } else {
            message_report = `${testData_SearchByCode_FF.testDataForCodeSearchToggleOn.searchByCode} data is not available`;
        }
        console.log(message_report);
        attachment('Data availablilty check', message_report, 'text/plain');

        //await this.helper.assertElementVisible(this.searchByCodePage.CellSearchByDescription, 'Description');
        const SearchByDescription = await this.searchByCodePage.CellSearchByDescription.textContent();
        message_report = `Description EN (Feature Family) for SCL: ${SearchByDescription}`;
        console.log(message_report);
        attachment('Description data for SCL', message_report, 'text/plain');

        await this.helper.assertElementVisible(this.searchByCodePage.CellSearchByLanguage, 'Language');
        const SearchByLanguage = await this.searchByCodePage.CellSearchByLanguage.textContent();
        message_report = `Language for SCL: ${SearchByLanguage}`;
        console.log(message_report);
        attachment('Language data for SCL', message_report, 'text/plain');

        await this.helper.clickElement(this.searchByCodePage.CellsearhByCode, 'Feature family code');
        //console.log(await this.searchByCodePage.actualDescription.inputValue());

        if (await this.searchByCodePage.actualDescription.inputValue() == SearchByDescription) {
            message_report = "Expected Description Data same as Actual Data ✅";
        } else {
            message_report = "Expected Description Data not same as Actual Data ❌";
        }
        console.log(message_report);
        attachment('Description Data Comparison', message_report, 'text/plain');

        const count = await this.searchByCodePage.actualLanguage.count();
        let check = 0;
        for (let i = 0; i < count; i++) {
            const word = await this.searchByCodePage.actualLanguage.nth(i).textContent();
            if (SearchByLanguage?.includes(`${word}`)) {
                check++;
                continue;
            }
            break;
        }
        if (check == count) {
            message_report = "Expected Language Data same as Actual Data ✅";
        } else {
            message_report = "Expected Language Data not same as Actual Data ❌";
        }
        console.log(message_report);
        attachment('Language Data Comparison', message_report, 'text/plain');

        await this.helper.assertElementVisible(this.searchByCodePage.backBtn, 'BackButton');
        await this.helper.clickElement(this.searchByCodePage.backBtn, 'BackButton');
        await this.helper.clickElement(this.searchByCodePage.CellsearhByCode, 'Feature family code');
        await this.helper.clickElement(this.searchByCodePage.MappingSection, 'Mappingsection');
        let STVData = await this.searchByCodePage.DataSTVMap.allTextContents();
        let WPCData = await this.searchByCodePage.DataWPCMap.allTextContents();
        await this.helper.assertElementVisible(this.searchByCodePage.backBtn, 'BackButton');
        await this.helper.clickElement(this.searchByCodePage.backBtn, 'BackButton');






        //check mapping with STV
        if (!(await this.searchByCodePage.CellsearhByClassCode.textContent() == "-" || await this.searchByCodePage.CellsearhByClassCode.textContent() == "")) {

            message_report = `${testData_SearchByCode_FF.testDataForCodeSearchToggleOn.searchByCode} code Mapped 🔀 with STV`;
            console.log(message_report);
            attachment('STV Mapping check', message_report, 'text/plain');

            await this.helper.assertElementVisible(this.searchByCodePage.CellsearhTypology, 'Typology');
            const searhTypology = await this.searchByCodePage.CellsearhTypology.textContent();
            message_report = `Topology for STV: ${searhTypology}`;
            console.log(message_report);
            attachment('Topology Data for STV', message_report, 'text/plain');



            await this.helper.assertElementVisible(this.searchByCodePage.CellsearhByClassCode, 'class code');
            const searhByClassCode = await this.searchByCodePage.CellsearhByClassCode.textContent();
            message_report = `Class Code for STV: ${searhByClassCode}`;
            console.log(message_report);
            attachment('Class Code for STV', message_report, 'text/plain');


            await this.helper.assertElementVisible(this.searchByCodePage.CellsearhByClassCodeDesc, 'class code description');
            const searhByClassCodeDesc = await this.searchByCodePage.CellsearhByClassCodeDesc.textContent();
            message_report = `Description (Class Code) for STV: ${searhByClassCodeDesc}`;
            console.log(message_report);
            attachment('Description data for STV', message_report, 'text/plain');

            if (STVData.some(text => text.search(`${searhTypology}`))) {
                message_report = "expected topology data same as actual data ✅";
            } else {
                message_report = "expected topology data not same as actual data ❌";
            }
            console.log(message_report);
            attachment('Topology Data Comparison', message_report, 'text/plain');


            if (STVData.some(text => text.search(`${searhByClassCodeDesc}`))) {
                message_report = "expected descriptionclassCode data same as actual data ✅";
            } else {
                message_report = "expected descriptionclassCode data not same as actual data ❌";
            }
            console.log(message_report);
            attachment('Description data comparison', message_report, 'text/plain');

        } else {
            message_report = `${testData_SearchByCode_FF.testDataForCodeSearchToggleOn.searchByCode} code is not❌ Mapped 🔀 with STV`;
            console.log(message_report);
            attachment('STV Mapping check', message_report, 'text/plain');


        }



        //check mapping with WPC
        if (!(await this.searchByCodePage.CellsearhByFamilyCode.textContent() == "-" || await this.searchByCodePage.CellsearhByFamilyCode.textContent() == "")) {
            message_report = `${testData_SearchByCode_FF.testDataForCodeSearchToggleOn.searchByCode} code Mapped 🔀 with WPC`;
            console.log(message_report);
            attachment('WPC Mapping check', message_report, 'text/plain');


            await this.helper.assertElementVisible(this.searchByCodePage.CellsearhByFamilyCode, 'WPC Family Code');
            const WPCFamilyCode = await this.searchByCodePage.CellsearhByFamilyCode.textContent();
            message_report = `Family Code for WPC: ${WPCFamilyCode}`;
            console.log(message_report);
            attachment('Family Code Data for WPC', message_report, 'text/plain');


            if (WPCData.some(text => text.search(`${WPCFamilyCode}`))) {
                message_report = "expected Family code data same as actual data ✅";
            } else {
                message_report = "expected Family code data not same as actual data ❌";
            }
            console.log(message_report);
            attachment('Family Code Comparison', message_report, 'text/plain');

        } else {
            message_report = `${testData_SearchByCode_FF.testDataForCodeSearchToggleOn.searchByCode} code is not❌ Mapped 🔀 with WPC`;
            console.log(message_report);
            attachment('WPC Mapping Check', message_report, 'text/plain');


        }






    }

    async creation_date_in_table() {
        // Navigate to Generic Dictionary
        await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
        await this.helper.clickElement(this.homePage.genericDict, 'genericDict');

        // Navigate to Search tab
        await this.helper.assertElementVisible(this.homePage.search, 'searchTab');
        await this.helper.clickElement(this.homePage.search, 'searchTab');

        // Ensure toggle is off and mapping button is enabled
        await this.helper.clickElement(this.searchByCodePage.mappingValue, 'mappingValue');
        await this.helper.assertElementEnabled(this.searchByCodePage.mappingValue, 'MappingValue');

        // Enter search code
        await this.helper.assertElementVisible(this.searchByCodePage.searchByCode, 'searchByCode');
        await this.helper.enterText(
            this.searchByCodePage.searchByCode,
            testData_SearchByCode_FF.testDataForCodeSearchToggleOn.searchBySCLCode,
            'searchByCode'
        );

        // Click search icon
        await this.helper.assertElementVisible(this.searchByCodePage.searchIcon, 'searchIcon');
        await this.helper.clickElement(this.searchByCodePage.searchIcon, 'searchIcon');
        await this.page.waitForTimeout(3000);


        // Click family code and get creation date
        await this.helper.clickElement(this.searchByCodePage.familyCodeZ0V, 'Family code');
        const creationDateRaw = await this.searchByCodePage.creationDate.inputValue();
        const creationDate = creationDateRaw?.trim();
        console.log(`Creation Date:${creationDate}`);

        //click on back btn
        await this.helper.clickElement(this.searchByCodePage.backBtn, "Back btn");

        // // Scroll right using browser context
        // await this.page.evaluate(() => window.scrollBy({ left: 300, behavior: 'smooth' }));

        // // Check if project column is hidden
        // if (await this.searchByCodePage.projectColumn.isHidden()) {
        //     await this.helper.assertElementVisible(this.searchByCodePage.morecolumn, 'ExtraColumn');
        //     await this.helper.clickElement(this.searchByCodePage.morecolumn, 'ExtraColumn');
        //     await this.page.waitForTimeout(3000);

        //     await this.helper.clickElement(this.searchByCodePage.sclColumns, 'SCL columns');
        //     await this.page.waitForTimeout(3000);

        //     // Scroll down the page by 500 pixels
        //     // await this.page.evaluate(() => window.scrollBy(0, 500));

        //     const count = await this.searchByCodePage.morecolumnOption.count();
        //     console.log(count);

        //     // for (let i = 0; i < count; i++) {
        //     //     // Trim unwanted prefix from column text
        //     //     const columnTextRaw = await this.searchByCodePage.morecolumnOption.nth(i).textContent();
        //     //     const columnText = columnTextRaw?.replace(/^drag_indicator\s*/, '');

        //         // console.log(columnText + " and " + testData_SearchByCode_FF.testDataForCodeSearchToggleOn.projectColumn);
        //         // // Check if column matches expected value
        //         // if (columnText?.includes(testData_SearchByCode_FF.testDataForCodeSearchToggleOn.projectColumn)) {
        //         //     await this.page.waitForTimeout(3000);

        //             // // Click visibility button at index i
        //             // console.log(i);
        //             // const visibilityBtn = this.searchByCodePage.visibilitybutton.nth(i);
        //             // await visibilityBtn.scrollIntoViewIfNeeded();
        //             // await this.helper.assertElementVisible(visibilityBtn, 'visibilityBtn');
        //             // await this.helper.clickElement(visibilityBtn, 'visibilityBtn');

        //             // // Click visibility button at index i + 1 (if it exists)
        //             // if (i + 1 < count) {
        //             //     const visibilityBtn1 = this.searchByCodePage.visibilitybutton.nth(i + 1);
        //             //     await visibilityBtn1.scrollIntoViewIfNeeded();
        //             //     await this.helper.assertElementVisible(visibilityBtn1, 'visibilityBtn');
        //             //     await this.helper.clickElement(visibilityBtn1, 'visibilityBtn');
        //             // }

        //             await this.page.keyboard.press("Tab");
        //             // break; // Exit loop after handling the match
        //         // }
                
        //         await this.page.waitForTimeout(6000);

        //     // }
        // // } else {
        // //     console.log('Column is already visible');
        // }

        // // Validate mapping dates
        // const stvMappingDateRaw = await this.searchByCodePage.mappingDateSCLSTV.textContent();
        // const wpcMappingDateRaw = await this.searchByCodePage.mappingDateSCLWPC.textContent();

        // const stvMappingDate = stvMappingDateRaw?.trim();
        // const wpcMappingDate = wpcMappingDateRaw?.trim();


        // console.log(`STV Mapping Date:${stvMappingDate}, WPC Mapping Date:${wpcMappingDate}`);

        // // Validate creation date matches mapping dates
        // if (creationDate === wpcMappingDate && creationDate === stvMappingDate) {
        //     console.log(`Creation Date: ${creationDate} validated`);
        // }



    }

}


