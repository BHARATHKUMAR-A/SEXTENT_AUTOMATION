import { Page, Locator } from '@playwright/test';
import testData_SearchByCode_FF from '../test-data/testData_SearchByCode.json';
import { LoadHookContext } from 'module';
import { SearchByCodeStepsToggleOn } from '../steps/searchByCodeSteps_Mapping_FF_FV';
 
export class SearchByCodePageToggleOn {
 
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
    filter:Locator;
    sclColumns : Locator;
    projectColumn : Locator;
    familyCreatorIdColumn : Locator;
    featureCodeColumn : Locator
    featureDescColumn : Locator
    morecolumn:Locator;
    sclStvMappingDateColumn:Locator;
    morecolumnOption:Locator;
    visibilitybutton:Locator;
    mappingDateSCLSTV:Locator;
    mappingDateSCLWPC:Locator;
    familyCodeZ0V: Locator;
    creationDate:Locator;
   
    constructor(page: Page) {
 
        //initial step locators
 
        this.mappingValue = page.locator("//input[@id='mat-radio-3-input'][@value='MAPPING']");
        this.searchByCode = page.locator("//mat-label[contains(text(), 'Search by code')]")
 
        //feaure family..
        this.featureFamilyCode = page.locator('//mat-chip-grid[@formcontrolname="sclFamilyCode"]//input[@id="mat-mdc-chip-list-input-2"]');
        this.searchIcon = page.locator("div[class='button-grid mr-rt'] button:nth-child(1) span:nth-child(4)");
        this.searchResultTable = page.locator("//div[@id='wrapper-table']");
       
        this.CellsearhByCode = page.locator(`(//table//tbody//mat-row//mat-cell[contains(@class, 'featureFamilyCode')]//div//a//span[text()='${testData_SearchByCode_FF.testDataForCodeSearchToggleOn.searchByCode}'])[1]`);
        this.CellsearhTypology = page.locator(`(//table//tbody//mat-row//mat-cell[contains(@class, 'featureFamilyCode')]//div//a//span[text()='${testData_SearchByCode_FF.testDataForCodeSearchToggleOn.searchByCode}']//parent::a//parent::div//parent::mat-cell//following-sibling::mat-cell[contains(@class, 'typologyStv')])[1]`);
        this.CellsearhByClassCodeDesc = page.locator(`(//table//tbody//mat-row//mat-cell[contains(@class, 'featureFamilyCode')]//div//a//span[text()='${testData_SearchByCode_FF.testDataForCodeSearchToggleOn.searchByCode}']//parent::a//parent::div//parent::mat-cell//following-sibling::mat-cell[contains(@class, 'description')])[1]`);
        this.CellsearhByFamilyCode = page.locator(`(//table//tbody//mat-row//mat-cell[contains(@class, 'featureFamilyCode')]//div//a//span[text()='${testData_SearchByCode_FF.testDataForCodeSearchToggleOn.searchByCode}']//parent::a//parent::div//parent::mat-cell//following-sibling::mat-cell[contains(@class, 'code')])[1]`);
        this.CellSearchByDescription = page.locator(`(//table//tbody//mat-row//mat-cell[contains(@class, 'featureFamilyCode')]//div//a//span[text()='${testData_SearchByCode_FF.testDataForCodeSearchToggleOn.searchByCode}']//parent::a//parent::div//parent::mat-cell//following-sibling::mat-cell[contains(@class, 'featureFamilyDescription')])[1]`);
        this.CellSearchByLanguage = page.locator(`(//table//tbody//mat-row//mat-cell[contains(@class, 'featureFamilyCode')]//div//a//span[text()='${testData_SearchByCode_FF.testDataForCodeSearchToggleOn.searchByCode}']//parent::a//parent::div//parent::mat-cell//following-sibling::mat-cell[contains(@class, 'codificationLanguages')])[1]`);
        this.actualDescription = page.locator("//mat-label[contains(.,'Localized description EN')]");
        this.actualLanguage = page.locator("//mat-option[@aria-selected='true']");
        this.backBtn = page.locator("//mat-icon[contains(.,'arrow_back')]");
        this.MappingSection = page.locator("//div[@aria-controls='mat-tab-content-1-1']");
        this.DataSTVMap = page.locator("(//div[@class='mapping-box'])[2]");
        this.DataWPCMap = page.locator("(//div[@class='mapping-box'])[3]");
 
        this.MappingTab = page.locator("//div//span[contains(text(),'Mapping')]");
 
      //  this.CellsearhByClassCode = page.locator(`//table//tbody//mat-row//mat-cell[contains(@class, 'featureFamilyCode')]//div//a[text()='${testData_SearchByCode_FF.testDataForCodeSearchToggleOn.searchByCode}']//mat-cell[contains(@class,'classCode')]`);
        this.CellsearhByClassCode = page.locator(`(//table//tbody//mat-row//mat-cell[contains(@class, 'featureFamilyCode')]//div//a//span[text()='${testData_SearchByCode_FF.testDataForCodeSearchToggleOn.searchByCode}']//parent::a//parent::div//parent::mat-cell//following-sibling::mat-cell[contains(@class, 'classCode ')])[1]`)

        this.morecolumn = page.locator("//mat-icon[normalize-space()='more_vert']");
        this.sclColumns = page.locator("//mat-expansion-panel-header//span//mat-panel-title[text()=' SCL Columns ']");
        this.projectColumn = page.locator("//div[text()='Project Type (Family Code)']");
        this.sclStvMappingDateColumn = page.locator("//div[contains(text(),'Mapping date SCL/STV (Feature Family / Class Code)')]");
        this.featureCodeColumn = page.locator("//div[text()='Feature Code']");
        this.featureDescColumn = page.locator("//div[text()='Long Description EN (Feature Code)']");
        this.visibilitybutton = page.locator("//button[contains(.,'visibility')][1]");
        this.morecolumnOption = page.locator("//div[@style='touch-action: none; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; user-select: none;']");
        this.mappingDateSCLSTV = page.locator("//mat-cell[contains(@class,'featureFamilyCode')]//div//span[text()='Z0V']//ancestor::mat-cell//following-sibling::mat-cell[contains(@class,'featureValueStvMappingDate')]//span");
        this.mappingDateSCLWPC = page.locator("//mat-cell[contains(@class,'featureFamilyCode')]//div//span[text()='Z0V']//ancestor::mat-cell//following-sibling::mat-cell[contains(@class,'featureValueWpcMappingDate')]//span")
       this.familyCodeZ0V = page.locator("//mat-cell[contains(@class,'featureFamilyCode')]//div//span[text()='Z0V']");
       this.creationDate = page.locator("(//mat-label[text()='Creation Date']//ancestor::div//input)[7]");

    }
}
 
 