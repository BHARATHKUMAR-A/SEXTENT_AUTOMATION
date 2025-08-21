import { Page, Locator } from '@playwright/test';
import testData_STV_FF from '../test-data/testData_STV_FF.json';
import searchDataMapped_STV_FF from '../test-data/searchDataMapped_STV_FF.json';
export class GenericSearch_MappingPage {
     //search for mapping stv
 
  mappingData:Locator;
  mappingToggleButton:Locator;
  mappingSearchIcon:Locator;
  mappingArrowIcon:Locator;
  mappingSTVSpecificCriteria:Locator;
  mappingClassCodeSearch:Locator;
  mappingRadioButton:Locator;
  mappingFeatureValueVisibility:Locator;
  mappingFeatureFamilyCodeHyperlink:Locator;
  mappingTab:Locator;
 
  tableFeatureFamilyCodeSCL:Locator;
  tableDescriptionSCL:Locator;
  tableLanguageSCL:Locator;
  tableTypologySTV:Locator;
  tableClassCodeSTV:Locator;
  tableDescriptionSTV:Locator;
  tableFamilyCodeWPS:Locator;
  tableLongDescWPS:Locator;
  tableMediumDescWPS:Locator;
  tableShortDescWPS:Locator;
 
  mappingFeatureFamilyCodeSCL:Locator;
  mappingDescriptionSCL:Locator;
  mappingLanguageSCL:Locator;
  mappingTypologySTV:Locator;
  mappingClassCodeSTV:Locator;
  mappingDescriptionSTV:Locator;
  mappingFamilyCodeWPS:Locator;
  mappingLongDescWPS:Locator;
  mappingMediumDescWPS:Locator;
  mappingShortDescWPS:Locator;
 
  rows:Locator;
  pageRange:Locator;
 
 
 
constructor(page: Page) {
 //search for mapping stv
 
 this.mappingData=page.locator("(//mat-row[@id='undefined'])[1]");
 this.mappingToggleButton = page.locator("//*[@id='mat-mdc-slide-toggle-1-button']");
 this.mappingRadioButton=page.locator("//label[normalize-space()='Mapping']");
 this.mappingSearchIcon=page.locator("//body[1]/app-root[1]/div[1]/app-sidenav[1]/mat-sidenav-container[1]/mat-sidenav-content[1]/main[1]/app-search-with-filters[1]/div[1]/form[1]/div[1]/div[1]/div[3]/button[1]");
 this.mappingArrowIcon=page.locator("//button[@class='arrow ng-star-inserted']");
 this.mappingSTVSpecificCriteria=page.locator("//mat-expansion-panel-header[@id='mat-expansion-panel-header-6']");
 this.mappingClassCodeSearch=page.locator("//input[@id='mat-mdc-chip-list-input-10']");
 this.mappingFeatureValueVisibility=page.locator("//div[@class='header-text ng-tns-c1267148319-174']");
 this.mappingFeatureFamilyCodeHyperlink=page.locator("tbody mat-row:nth-child(1) mat-cell:nth-child(1) div:nth-child(1) a:nth-child(1)");
 this.mappingTab=page.locator("(//span[@class='mdc-tab__content'])[2]");
 
 this.tableFeatureFamilyCodeSCL=page.locator("tbody mat-row:nth-child(4) mat-cell:nth-child(1) div:nth-child(1) a:nth-child(1)");
 this.tableDescriptionSCL=page.locator("tbody mat-row:nth-child(4) mat-cell:nth-child(2) div:nth-child(1) span:nth-child(1)");
 this.tableLanguageSCL=page.locator("tbody mat-row:nth-child(4) mat-cell:nth-child(3) div:nth-child(1) span:nth-child(1)");
 this.tableTypologySTV=page.locator("tbody mat-row:nth-child(4) mat-cell:nth-child(4) div:nth-child(1) span:nth-child(1)");
 this.tableClassCodeSTV=page.locator("tbody mat-row:nth-child(4) mat-cell:nth-child(5) div:nth-child(1) a:nth-child(1)");
 this.tableDescriptionSTV=page.locator("tbody mat-row:nth-child(4) mat-cell:nth-child(6) div:nth-child(1) span:nth-child(1)");
 this.tableFamilyCodeWPS=page.locator("tbody mat-row:nth-child(4) mat-cell:nth-child(7) div:nth-child(1) a:nth-child(1)");
 this.tableLongDescWPS=page.locator("tbody mat-row:nth-child(4) mat-cell:nth-child(8) div:nth-child(1) span:nth-child(1)");
 this.tableMediumDescWPS=page.locator("tbody mat-row:nth-child(4) mat-cell:nth-child(9) div:nth-child(1) span:nth-child(1)");
 this.tableShortDescWPS=page.locator("tbody mat-row:nth-child(4) mat-cell:nth-child(10) div:nth-child(1) span:nth-child(1)");
 
 this.mappingFeatureFamilyCodeSCL=page.locator("span[class='scl-value'] strong");
 this.mappingDescriptionSCL=page.locator(".mat-mdc-tooltip-trigger[aria-describedby='cdk-describedby-message-ng-1-6']");
 this.mappingLanguageSCL=page.locator("p[class='scl-section'] span[class='category']");
 this.mappingTypologySTV=page.locator(".category");
 this.mappingClassCodeSTV=page.locator("//div[@class='mapping-box-section']//div[2]//div[2]//p[1]//strong[1]");
 this.mappingDescriptionSTV=page.locator("p[class='multiple-lines ng-star-inserted']");
 this.mappingFamilyCodeWPS=page.locator("div:nth-child(3) div:nth-child(2) p:nth-child(1) strong:nth-child(1)");
 this.mappingLongDescWPS=page.locator(".multiple-lines.long-description-en.ng-star-inserted");
 this.mappingMediumDescWPS=page.locator(".multiple-lines.medium-description-en.ng-star-inserted");
 this.mappingShortDescWPS=page.locator(".multiple-lines.short-description-en.ng-star-inserted");
 
 this.rows=page.locator("//table/tbody/mat-row");
 this.pageRange=page.locator("app-table-tree-view[class='ng-star-inserted'] div[class='mat-mdc-paginator-range-actions'] div:nth-child(1)");
 
}
}