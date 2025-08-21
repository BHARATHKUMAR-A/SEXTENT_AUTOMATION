import { Locator, Page, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { FeatureSTVPage } from '../pages/featureSTVPage';
import { GenericSearch_MappingPage } from '../pages/genericSearch_MappingPage';
import searchDataMapped_STV_FF from '../test-data/searchDataMapped_STV_FF.json';
import credentials from '../test-data/credentials.json';
import { attachment } from 'allure-js-commons';

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

export class GenericSearch_MappingSteps {
    private page: Page;
    private testInfo: TestInfo;
    private helper: StepHelper;
    private homePage: HomePage;
    private genericSearch_MappingPage: GenericSearch_MappingPage;
    private featureSTVPage: FeatureSTVPage;
    private selectRandomCode: Locator;
    private classCode: string;
    private tableValueFeatureFamilyCodeSCL: any;
    private tableValueDescriptionSCL: any;
    private tableValueFamilyCodeWPS: any;
    private mappedFeatureFamilyCodeSCL: any;
    private mappedDescriptionSCL: any;
    private mappedFamilyCodeWPS: any;
    private tableValueLongDescWPS: any;

    //constructor to initialize the objects
    constructor(page: Page, testInfo: TestInfo, stepHelper: StepHelper) {
        this.page = page;
        this.testInfo = testInfo;
        this.helper = stepHelper;
        this.homePage = new HomePage(page);
        this.featureSTVPage = new FeatureSTVPage(page);
        this.genericSearch_MappingPage = new GenericSearch_MappingPage(page);
        this.classCode = '';
    }

    async navigateTo_search_STV_code_mapping_ff() {

        await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
        await this.helper.clickElement(this.homePage.genericDict, 'genericDict');

        await this.helper.assertElementVisible(this.homePage.search, 'search');
        await this.helper.clickElement(this.homePage.search, 'search');

        await this.helper.assertElementVisible(this.genericSearch_MappingPage.mappingToggleButton, 'mappingToggleButton');
        await this.helper.clickElement(this.genericSearch_MappingPage.mappingToggleButton, 'mappingToggleButton');

        await this.helper.assertElementVisible(this.genericSearch_MappingPage.mappingRadioButton, "mappingRadioButton");
        await this.helper.clickElement(this.genericSearch_MappingPage.mappingRadioButton, 'mappingRadioButton');

        await this.helper.assertElementVisible(this.genericSearch_MappingPage.mappingArrowIcon, 'mappingArrowIcon');
        await this.helper.clickElement(this.genericSearch_MappingPage.mappingArrowIcon, 'mappingArrowIcon');

        await this.helper.assertElementVisible(this.genericSearch_MappingPage.mappingSTVSpecificCriteria, 'mappingSTVSpecificCriteria');
        await this.helper.clickElement(this.genericSearch_MappingPage.mappingSTVSpecificCriteria, 'mappingSTVSpecificCriteria');

        await this.helper.assertElementVisible(this.genericSearch_MappingPage.mappingClassCodeSearch, "mappingClassCodeSearch");
        await this.helper.enterText(this.genericSearch_MappingPage.mappingClassCodeSearch, searchDataMapped_STV_FF.testData.classCode, "mappingClassCodeSearch");

        await this.helper.assertElementVisible(this.genericSearch_MappingPage.mappingSearchIcon, 'mappingSearchIcon');
        await this.helper.clickElement(this.genericSearch_MappingPage.mappingSearchIcon, 'mappingSearchIcon');

        await this.genericSearch_MappingPage.mappingData.waitFor({ state: 'visible' });

        //data is visible in table
        let isAvail: boolean = false;
        let message;
        if (await this.genericSearch_MappingPage.mappingData.isVisible()) {
            isAvail = true;
            message = `${searchDataMapped_STV_FF.testData.mappedData}mapped data is available`;
        } else {
            message = `${searchDataMapped_STV_FF.testData.mappedData}mapped data is not available`;
        }
        console.log(message);
        attachment('Mapped Data Visible', message, 'text/plain');

        //toggle off
        if (await this.genericSearch_MappingPage.mappingFeatureValueVisibility.isVisible()) {
            message = 'feature value is visible, toggle is ON';
        } else {
            message = 'feature Value is hidden, toggle is OFF';
        }
        console.log(message);
        attachment('toggle off', message, 'text/plain');

        let rowValue = await this.genericSearch_MappingPage.pageRange.textContent();
        let rowCount: any = rowValue?.split(" ")[5];
        console.log(rowCount);


        if (isAvail) {
            for (let i = 0; i < rowCount; i++) {
                if (await this.genericSearch_MappingPage.rows.nth(i).isVisible()) {

                    this.tableValueFeatureFamilyCodeSCL = await this.genericSearch_MappingPage.rows.nth(i).locator('mat-cell:nth-of-type(1)').textContent();
                    this.tableValueDescriptionSCL = await this.genericSearch_MappingPage.rows.nth(i).locator('mat-cell:nth-of-type(2)').textContent();

                    this.tableValueFamilyCodeWPS = await this.genericSearch_MappingPage.rows.nth(i).locator('mat-cell:nth-of-type(7)').textContent();
                    this.tableValueLongDescWPS = await this.genericSearch_MappingPage.rows.nth(i).locator('mat-cell:nth-of-type(8)').textContent();

                    console.log(`SCL Class code is ${this.tableValueFeatureFamilyCodeSCL}`);
                    console.log(`Table Localised Desc is: ${this.tableValueDescriptionSCL}`);
                    console.log(`WPC Class code is ${this.tableValueFamilyCodeWPS}`);

                    attachment('SCL Class code is', `${this.tableValueFeatureFamilyCodeSCL}`, 'text/plain');
                    attachment('Table Localised Desc is', `${this.tableValueDescriptionSCL}`, 'text/plain');
                    attachment('WPC Class code is', ` ${this.tableValueFamilyCodeWPS}`, 'text/plain');


                    if (this.tableValueFeatureFamilyCodeSCL == searchDataMapped_STV_FF.testData.featureFamilyCode && this.tableValueLongDescWPS != '-') {
                        await this.helper.clickElement(this.genericSearch_MappingPage.rows.nth(i).locator('//mat-cell[1]/div/a'), 'click_feature_family_code');

                        await this.helper.assertElementVisible(this.genericSearch_MappingPage.mappingTab, 'mappingTab');
                        await this.helper.clickElement(this.genericSearch_MappingPage.mappingTab, 'mappingTab');

                        await this.helper.assertElementVisible(this.genericSearch_MappingPage.mappingFeatureFamilyCodeSCL, 'mappingFeatureFamilyCodeSCL');
                        this.mappedFeatureFamilyCodeSCL = await this.genericSearch_MappingPage.mappingFeatureFamilyCodeSCL.textContent();
                        console.log(`Mapped SCL Class Code is ${this.mappedFeatureFamilyCodeSCL}`);

                        attachment('Mapped SCL Class Code is', `${this.mappedFeatureFamilyCodeSCL}`, 'text/plain');

                        // await this.helper.assertElementVisible(this.genericSearch_MappingPage.mappingDescriptionSCL, 'mappingDescriptionSCL');
                        // this.mappedDescriptionSCL = await this.genericSearch_MappingPage.mappingDescriptionSCL.textContent();
                        // console.log(this.mappedDescriptionSCL);

                        attachment('Mapped description data', `${this.mappedDescriptionSCL}`, 'text/plain');

                        await this.helper.assertElementVisible(this.genericSearch_MappingPage.mappingFamilyCodeWPS, 'mappingFamilyCodeWPS');
                        let mappedWpcClassCode = await this.genericSearch_MappingPage.mappingFamilyCodeWPS.textContent();
                        this.mappedFamilyCodeWPS = mappedWpcClassCode?.split(" ")[0];
                        console.log(`Mapped WPC Class Code is ${this.mappedFamilyCodeWPS}.`);

                        attachment('Mapped WPC class code', `${this.mappedFamilyCodeWPS}`, 'text/plain');

                        break;

                    } else {
                        continue;
                    }
                }
            }

            if (this.tableValueFeatureFamilyCodeSCL == this.mappedFeatureFamilyCodeSCL && this.tableValueFamilyCodeWPS == this.mappedFamilyCodeWPS && this.tableValueDescriptionSCL == this.mappedDescriptionSCL) {
                message = "STV data is mapped with WPS and SCL, Ui table data is verified with mapped data";
            } else {
                message = "STV data not mapped, Ui data is different in mapped data";
            }
            console.log(message);
            attachment('Mapped Data is equal to ui data', message, 'text/plain');
        } else {
            message = `data not displayed`;
            console.log(message);
            attachment('not displayed', message, 'text/plain');
        }


    }

}
