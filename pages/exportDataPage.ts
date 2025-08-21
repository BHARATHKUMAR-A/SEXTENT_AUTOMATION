import { Page, Locator } from '@playwright/test';
import excelData from '../test-data/excelData.json' assert { type: 'json' };    
 
export class ExportDataPage {
searchSideBar:Locator
 structure:Locator
 SCLoption:Locator
 arrowDown:Locator
 specificCriteriaDropdown:Locator
 searchIcon:Locator
 openCustomizeColumnBtn:Locator
 closeCustomizeColumnBtn:Locator
isToggelOn:Locator
singleValue:Locator
downloadBtn:Locator
table:Locator
STVoption:Locator
WPCoption:Locator
exportMsg:Locator
searchByCode:Locator
structureValue :Locator
zeroRecord :Locator
isToggelOff :Locator

 
    constructor(page: Page) {
    this.searchSideBar = page.locator("//span[contains(text(), 'Search')]").first()
    this.structure = page.locator("//mat-label[contains(text(), 'Structure')]")
    this.SCLoption=page.locator("//div[@role='listbox']//span[contains(text(), 'SCL')]")
    this.arrowDown=page.locator("//button//mat-icon[text()='keyboard_arrow_down']")
    this.specificCriteriaDropdown=page.locator("//mat-panel-title[text()=' SCL specific criteria ']")
    this.searchIcon=page.locator("div[class='grid-1 clr-wht'] button:nth-child(1) span:nth-child(4)")
    this.openCustomizeColumnBtn=page.locator("//button//mat-icon[text()='more_vert']")
    this.closeCustomizeColumnBtn=page.locator("//button//mat-icon[text()='horizontal_distribute']")
    this.isToggelOn = page.locator("//div[@class='mdc-form-field']//button[@class='mdc-switch mdc-switch--selected mdc-switch--checked']");
    this.isToggelOff = page.locator("//div[@class='mdc-form-field']//button[@class='mdc-switch mdc-switch--unselected']");

    this.singleValue = page.locator(" //input[@id='mat-radio-2-input']");
    ///export data
    this.downloadBtn=page.locator("//mat-icon[text()='download']")
    //this.table=page.locator("//table//thead[@role='rowgroup']")
    this.STVoption=page.locator("//div[@role='listbox']//span[contains(text(), 'STV')]")
    this.table=page.locator("//table//thead[@role='rowgroup']")
    this.WPCoption=page.locator("//div[@role='listbox']//span[contains(text(), 'WPC')]")
    this.exportMsg=page.locator("//p[text()='Export search result in progress']")
    this.searchByCode=page.locator("//mat-label[text()='Search by code']")
    this.structureValue = page.locator(`//mat-option/span[contains(text(),'${excelData.testData.structureValue}')]`);
    this.zeroRecord=page.locator("//div[@class='bottom-section']//mat-paginator//div//div//div[2]//div[text()=' 0 of 0 ']")

}
}