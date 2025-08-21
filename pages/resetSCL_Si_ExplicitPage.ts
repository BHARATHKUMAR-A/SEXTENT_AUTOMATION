import { Page, Locator } from '@playwright/test';
import testData_generic_SCL from "../test-data/testData_generic_SCL.json";
 
 
export class resetSCL_Si_ExplicitPage {
    genericDict: Locator;
    search: Locator;
    structure: Locator;
    structureValue: Locator;
    searchIcon: Locator;
    arrowDown: Locator;
    arrowDownSCL: Locator;
    siExplicit: Locator;
    save: Locator;
    confirm: Locator;
    backBtn: Locator;
    resetBTN: Locator;
    familyDescription: Locator;
    cancel: Locator;
    totalCount : Locator;
 
 
 
 
    constructor(page: Page) {
        this.genericDict = page.locator("//span[contains(text(), 'Generic Dictionary')]");
        this.search = page.locator("//*[@id='cdk-accordion-child-0']/div/mat-nav-list/a[1]/span");
        this.structure = page.locator("//mat-label[text()='Structure']");
        this.structureValue = page.locator(`//mat-option/span[contains(text(),'${testData_generic_SCL.genericSearchData.structure}')]`);
         this.cancel = page.locator("//span[text()='Cancel']");
        this.searchIcon = page.locator("//mat-icon[text()='search']");
        this.arrowDownSCL = page.locator("//mat-panel-title[contains(.,'SCL specific criteria')]");
        this.save = page.locator("//span[text()='Save']");
        this.confirm = page.locator("//span[text()=' CONFIRMATION ']");
        this.backBtn = page.locator("//mat-icon[text()='arrow_back']");
        this.resetBTN = page.locator("//button//mat-icon[text()='undo']");
        this.arrowDown = page.locator("//button[@class='arrow ng-star-inserted']");
        this.siExplicit = page.locator("//mat-label[contains(text(), 'Si Explicit')]");
         this.familyDescription = page.locator('//mat-chip-grid[@formcontrolname="sclFamilyDescription"]//input[@class="mat-mdc-chip-input mat-mdc-input-element mdc-text-field__input mat-input-element mat-mdc-form-field-input-control"]');
        this.totalCount=page.locator("//mat-paginator[@style='display: block;']//div[@aria-live='polite']");
 
 
 
    }
}
 