import { Page, Locator } from '@playwright/test';


export class GenericSearchHierarchyPage {
    searchSideBar: Locator
    searchIcon: Locator
    isToggelOn: Locator
    hierarchyValue: Locator
    itemsPerPage: Locator
    nextBtn: Locator
    itemsPerPageOption1: Locator
    itemsPerPageOption2: Locator
    rowCount: Locator

    constructor(page: Page) {
        this.searchSideBar = page.locator("//span[contains(text(), 'Search')]").first()
        this.searchIcon = page.locator("div[class='grid-1 clr-wht'] button:nth-child(1) span:nth-child(4)")
        this.isToggelOn = page.locator("//div[@class='mdc-form-field']//button[@class='mdc-switch mdc-switch--selected mdc-switch--checked']");
        this.hierarchyValue = page.locator("//input[@type='radio' and @value='HIERARCHY']");
        this.itemsPerPage = page.locator("(//div[text()=' Items per page: ']/following::mat-select[@role='combobox'][1]//span[contains(@class,'mat-mdc-select-min-line')])").last()
        this.nextBtn = page.locator("//button[@aria-label='Next page']//span[@class='mat-mdc-button-touch-target']").last()
        this.itemsPerPageOption1 = page.locator("//mat-option[@role='option']//span[text()=5]")
        this.itemsPerPageOption2 = page.locator("//mat-option[@role='option']//span[text()=100]")
        this.rowCount = page.locator("//mat-expansion-panel//mat-expansion-panel-header[@role='button']")
    }
}
