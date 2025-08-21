import { Page, Locator } from '@playwright/test';
import testData_SearchByCode_FF from '../test-data/testData_SearchByCode.json';
import { LoadHookContext } from 'module';
import { SearchByCodeSteps } from '../steps/searchByCodeSteps_Mapping_FF';

export class SearchByCodePage {

    isToggelOff: Locator;
    mappingValue: Locator;
    searchByCode: Locator;
    searchIcon: Locator;
    searchResultTable: Locator;
    featureFamilyCode: Locator;
    CellsearhByCode: Locator;
    CellsearhByClassCode: Locator;
    CellsearhByFamilyCode: Locator;
    MappingTab: Locator;
    TxtMandatory: Locator;
    MappingTable: Locator;
    CellsearhTypology: Locator;
    CellsearhByClassCodeDesc: Locator;
    TxtDesc: Locator;
    CellSearchByDescription: Locator;
    CellSearchByLanguage: Locator;
    TxtSTV: Locator;
    TxtWPC: Locator;
    actualDescription: Locator;
    actualLanguage: Locator;
    backBtn: Locator;
    MappingSection : Locator;
    DataSTVMap: Locator;
    DataWPCMap: Locator;

    constructor(page: Page) {

        //initial step locators

        this.isToggelOff = page.locator("//div[@class='mdc-switch__icons ng-star-inserted']//*[name()='svg'][1]");
        this.mappingValue = page.locator("//input[@id='mat-radio-3-input'][@value='MAPPING']");
        this.searchByCode = page.locator("//mat-label[contains(text(), 'Search by code')]")

        //feaure family..
        this.featureFamilyCode = page.locator('//mat-chip-grid[@formcontrolname="sclFamilyCode"]//input[@id="mat-mdc-chip-list-input-2"]');
        this.searchIcon = page.locator("div[class='button-grid mr-rt'] button:nth-child(1) span:nth-child(4)");
        this.searchResultTable = page.locator("//div[@id='wrapper-table']");
       
        this.CellsearhByCode = page.locator(`//table//tbody//mat-row//mat-cell//div//a[.='${testData_SearchByCode_FF.testDataForCodeSearch.searchByCode}']`);
        this.CellsearhByClassCode = page.locator(`//table//tbody//mat-row//mat-cell//div//a[.='${testData_SearchByCode_FF.testDataForCodeSearch.searchByCode}']//ancestor::mat-row//mat-cell[contains(@class,'classCode')]`);
        this.CellsearhTypology = page.locator(`//table//tbody//mat-row//mat-cell//div//a[.='${testData_SearchByCode_FF.testDataForCodeSearch.searchByCode}']//ancestor::mat-row//mat-cell[contains(@class,'typologyStv')]`);
        this.CellsearhByClassCodeDesc = page.locator(`//table//tbody//mat-row//mat-cell//div//a[.='${testData_SearchByCode_FF.testDataForCodeSearch.searchByCode}']//ancestor::mat-row//mat-cell[contains(@class,'description')]`);
        this.CellsearhByFamilyCode = page.locator(`//table//tbody//mat-row//mat-cell//div//a[.='${testData_SearchByCode_FF.testDataForCodeSearch.searchByCode}']//ancestor::mat-row//mat-cell[contains(@class,'code')]`);
        this.CellSearchByDescription = page.locator(`//table//tbody//mat-row//mat-cell//div//a[.='${testData_SearchByCode_FF.testDataForCodeSearch.searchByCode}']//ancestor::mat-row//mat-cell[contains(@class,'featureFamilyDescription')]`);
        this.CellSearchByLanguage = page.locator(`//table//tbody//mat-row//mat-cell//div//a[.='${testData_SearchByCode_FF.testDataForCodeSearch.searchByCode}']//ancestor::mat-row//mat-cell[contains(@class,'codificationLanguages')]`);
        this.actualDescription = page.locator("//mat-label[contains(.,'Localized description EN')]");
        this.actualLanguage = page.locator("//mat-option[@aria-selected='true']");
        this.backBtn = page.locator("//mat-icon[contains(.,'arrow_back')]");
        this.MappingSection = page.locator("//div[@aria-controls='mat-tab-content-1-1']");
        this.DataSTVMap = page.locator("(//div[@class='mapping-box'])[2]");
        this.DataWPCMap = page.locator("(//div[@class='mapping-box'])[3]");

        this.MappingTab = page.locator("//div//span[contains(text(),'Mapping')]");
        // this.TxtMandatory = page.locator(`//span[@class='category'][text()='${testData_SearchByCode_FF.testDataForCodeSearch.TxtMandatory}']`);
       
        this.TxtSTV =page.locator("//div[@class='mapping-box-section']//div[2]//div[2]//p[1]//strong[1]");
        this.TxtWPC = page.locator("//div[@class='mapping-box-section']//div[3]//div[2]//p[1]//strong[1]");
        
        // this.TxtDesc = page.locator(`//p[@class='multiple-lines ng-star-inserted']//span[@class='mat-mdc-tooltip-trigger'][text()='${testData_SearchByCode_FF.testDataForCodeSearch.TxtDesc}']`);
        this.MappingTable = page.locator("//div[@class='mat-mdc-tab-body-wrapper']");

    }
}
