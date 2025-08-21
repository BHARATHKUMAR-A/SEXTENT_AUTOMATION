import { Page, Locator } from '@playwright/test';
import searchData_Mapping_FF from '../test-data/searchData_Mapping_FF.json';
import { LoadHookContext } from 'module';
import { SearchMappingSteps } from '../steps/searchMappingSteps';


export class SearchMappingPage{
    toggleButton: Locator;
    arrowDown : Locator;
    mappingBtn: Locator;
    arrowDownSCL:Locator;
    arrowDownWPC:Locator
    familyCode: Locator;
    WPCFamilyCode:Locator;
    searchBtn : Locator;
    data: Locator;
    featureValueVisibility: Locator;
    expecteddescription: Locator;
    expecteddescriptionByWPC:Locator;
    expectedLanguage: Locator;
    expectedLanguageByWPC: Locator;
    clickFamilyCode: Locator;
    actualDescription: Locator;
    actualLanguage: Locator;
    backBtn: Locator;
    expectedTopology: Locator;
    expectedTopologyByWPC: Locator;
    expectedclassCode: Locator;
    expectedclassCodeByWPC: Locator;
    expecteddescriptionClassCode:Locator;
    expecteddescriptionClassCodeByWPC:Locator;
    expectedWPCfamilyCode:Locator;
    expectedWPCfamilyCodeByWPC:Locator;
    expectedlongdescriptionfamilyCode: Locator;
    expectedmediumDescriptionFamilycode: Locator;
    expectedshortDescription: Locator;
    MappingSection : Locator;
    DataSTVMap: Locator;
    DataWPCMap: Locator;
    SCLCode:Locator;
    sclColumn:Locator;

    constructor(page: Page){
        this.arrowDownWPC = page.locator("//mat-panel-title[.=' WPC specific criteria ']");
        this.WPCFamilyCode = page.locator("//mat-label[.='Family code']");
        this.toggleButton = page.locator("//*[@id='mat-mdc-slide-toggle-1-button']");
        this.arrowDown = page.locator("//button[@class='arrow ng-star-inserted']");
        this.mappingBtn = page.locator("//mat-radio-group[contains(.,'Mapping')]");
        this.arrowDownSCL = page.locator("//mat-panel-title[contains(.,'SCL specific criteria')]");
        this.familyCode = page.locator("//mat-label[contains(.,'Feature family code')]");
        this.searchBtn = page.locator("//mat-icon[contains(.,'search')]");
        this.data = page.locator("tbody[role='rowgroup']");
        this.featureValueVisibility = page.locator("//div[text()='Feature Value Code']");
        this.expecteddescription = page.locator("//mat-cell[contains(@class,'mat-mdc-cell mdc-data-table__cell cdk-cell cdk-column-featureFamilyDescription mat-column-featureFamilyDescription SCL_COLUMNS ng-star-inserted')]");
        this.expectedLanguage = page.locator("mat-cell[class='mat-mdc-cell mdc-data-table__cell cdk-cell cdk-column-codificationLanguages mat-column-codificationLanguages SCL_COLUMNS ng-star-inserted']");
        this.clickFamilyCode = page.locator(`(//a[contains(.,'${searchData_Mapping_FF.testData.FamilyCode}')])`);
        this.actualDescription = page.locator("//mat-label[contains(.,'Localized description EN')]");
        this.actualLanguage = page.locator("//mat-option[@aria-selected='true']");
        this.backBtn = page.locator("//mat-icon[contains(.,'arrow_back')]");
        this.expectedTopology = page.locator("mat-cell[class='mat-mdc-cell mdc-data-table__cell cdk-cell cdk-column-typologyStv mat-column-typologyStv STV_COLUMNS ng-star-inserted']");
        this.expectedclassCode = page.locator("mat-cell[class='mat-mdc-cell mdc-data-table__cell cdk-cell cdk-column-classCode mat-column-classCode STV_COLUMNS ng-star-inserted']");
        this.expecteddescriptionClassCode = page.locator("mat-cell[class='mat-mdc-cell mdc-data-table__cell cdk-cell cdk-column-description mat-column-description STV_COLUMNS ng-star-inserted']");
        this.expectedWPCfamilyCode = page.locator("mat-cell[class='mat-mdc-cell mdc-data-table__cell cdk-cell cdk-column-code mat-column-code WPC_COLUMNS ng-star-inserted']");
        this.expectedlongdescriptionfamilyCode = page.locator("mat-cell[class='mat-mdc-cell mdc-data-table__cell cdk-cell cdk-column-wpclongDescriptionEn mat-column-wpclongDescriptionEn WPC_COLUMNS ng-star-inserted']");
        this.expectedmediumDescriptionFamilycode = page.locator("mat-cell[class='mat-mdc-cell mdc-data-table__cell cdk-cell cdk-column-wpcFamilyMediumDescriptionEn mat-column-wpcFamilyMediumDescriptionEn WPC_COLUMNS ng-star-inserted']");
        this.expectedshortDescription = page.locator("mat-cell[class='mat-mdc-cell mdc-data-table__cell cdk-cell cdk-column-wpcFamilyShortDescriptionEn mat-column-wpcFamilyShortDescriptionEn WPC_COLUMNS ng-star-inserted']");
        this.MappingSection = page.locator("//div[@aria-controls='mat-tab-content-1-1']");
        this.DataSTVMap = page.locator("(//div[@class='mapping-box'])[2]");
        this.DataWPCMap = page.locator("(//div[@class='mapping-box'])[3]");
        this.expecteddescriptionByWPC = page.locator(`//table//tbody//mat-row//mat-cell//div//a[.='${searchData_Mapping_FF.WPC_testData.FamilyCode}']//ancestor::mat-row//mat-cell[contains(@class,'featureFamilyDescription')]`);
        this.expectedLanguageByWPC = page.locator(`//table//tbody//mat-row//mat-cell//div//a[.='${searchData_Mapping_FF.WPC_testData.FamilyCode}']//ancestor::mat-row//mat-cell[contains(@class,'codificationLanguages')]`)
        this.expectedclassCodeByWPC = page.locator(`//table//tbody//mat-row//mat-cell//div//a[.='${searchData_Mapping_FF.WPC_testData.FamilyCode}']//ancestor::mat-row//mat-cell[contains(@class,'classCode')]`);
        this.expectedTopologyByWPC = page.locator(`//table//tbody//mat-row//mat-cell//div//a[.='${searchData_Mapping_FF.WPC_testData.FamilyCode}']//ancestor::mat-row//mat-cell[contains(@class,'typologyStv')]`);
        this.expecteddescriptionClassCodeByWPC = page.locator(`//table//tbody//mat-row//mat-cell//div//a[.='${searchData_Mapping_FF.WPC_testData.FamilyCode}']//ancestor::mat-row//mat-cell[contains(@class,'description')]`);
        this.expectedWPCfamilyCodeByWPC = page.locator(`//table//tbody//mat-row//mat-cell//div//a[.='${searchData_Mapping_FF.WPC_testData.FamilyCode}']//ancestor::mat-row//mat-cell[contains(@class,'code')]`);
        this.SCLCode = page.locator(`//table//tbody//mat-row//mat-cell//div//a[.='${searchData_Mapping_FF.WPC_testData.FamilyCode}']//ancestor::mat-row//mat-cell[contains(@class,'featureFamilyCode')]`);
        this.sclColumn = page.locator("//mat-panel-title[text()=' SCL Columns ']");
    }
}