import { Page, Locator } from '@playwright/test';
 
 
export class ExportForMappingPage {
searchSideBar:Locator
 arrowDown:Locator
 specificCriteriaDropdown:Locator
 searchIcon:Locator
isToggelOn:Locator
mappingValue:Locator
downloadBtn:Locator
exportMsg:Locator
zeroRecord :Locator
isToggelOff :Locator;
sclFeatureFamCode:Locator
 
 
    constructor(page: Page) {
    this.searchSideBar = page.locator("//span[contains(text(), 'Search')]").first()
    this.arrowDown=page.locator("//button//mat-icon[text()='keyboard_arrow_down']")
    this.specificCriteriaDropdown=page.locator("//mat-panel-title[text()=' SCL specific criteria ']")
    this.searchIcon=page.locator("div[class='grid-1 clr-wht'] button:nth-child(1) span:nth-child(4)")
    this.isToggelOn = page.locator("//div[@class='mdc-form-field']//button[@class='mdc-switch mdc-switch--selected mdc-switch--checked']");
    this.isToggelOff = page.locator("//div[@class='mdc-form-field']//button[@class='mdc-switch mdc-switch--unselected']");
    this.mappingValue = page.locator("//input[@id='mat-radio-3-input']");
    this.downloadBtn=page.locator("//mat-icon[text()='download']")
    this.exportMsg=page.locator("//p[text()='Export search result in progress']")
    this.zeroRecord=page.locator("//div[@class='bottom-section']//mat-paginator//div//div//div[2]//div[text()=' 0 of 0 ']")
    this.sclFeatureFamCode=page.locator("//mat-label[text()='Feature family code']")
}
}