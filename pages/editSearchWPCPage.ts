import { Page, Locator } from '@playwright/test';
import testData_wpc from '../test-data/testData_WPC_FamilyCode.json';
import { LoadHookContext } from 'module';
 
export class EditSearchWPCPage {
 
    isToggelOn: Locator;
    hierrarchyBtn: Locator;
    structureTab: Locator;
    SCLOption: Locator;
    STVOption: Locator;
    arrowDown: Locator;
    multiDescription: Locator;
    searchIcon: Locator;
    multiStructure: Locator;
    panelFamilyCode: Locator;
    headerOpt: Locator;
    panelDescription: Locator;
    panelDescriptionBtn: Locator;
    familyCode: Locator;
    panelBtns: Locator;
 
    constructor(page: Page) {
 
        //initial step locators
 
        this.isToggelOn = page.locator("//div[@class='mdc-switch__icons ng-star-inserted']//*[name()='svg'][2]");
        this.hierrarchyBtn = page.locator("//input[@type='radio' and @value='HIERARCHY']");
        this.structureTab = page.locator("//mat-label[contains(text(), 'Structure')]");
        this.SCLOption = page.locator("//div[@role='listbox']/mat-option/span[contains(text(),'SCL')]");
        this.STVOption = page.locator("//div[@role='listbox']/mat-option/span[contains(text(),'STV')]");
 
        this.arrowDown = page.locator("//button//mat-icon[text()='keyboard_arrow_down']");
        this.multiStructure = page.locator("//mat-panel-title[text()=' Multi structures filters ']");
        this.multiDescription = page.locator("//mat-chip-grid[@formcontrolname='multiDescription']//input[@class='mat-mdc-chip-input mat-mdc-input-element mdc-text-field__input mat-input-element mat-mdc-form-field-input-control']");
        this.searchIcon = page.locator("div[class='grid-1 clr-wht'] button:nth-child(1) span:nth-child(4)");
       this.headerOpt = page.locator("//div//mat-accordion//mat-expansion-panel//mat-expansion-panel-header[contains(@class,'mat-expansion-toggle-indicator-after ng-star-inserted')]");
        this.panelFamilyCode = page.locator("//mat-panel-title//span[@class='panel-title ng-star-inserted'][text()='!']");
        this.panelDescription = page.locator("//div[@class='feature-value-description'][text()='Test123']");
        this.panelDescriptionBtn = page.locator("//button[@class='mdc-button mdc-button--outlined mat-mdc-outlined-button mat-unthemed mat-mdc-button-base ng-star-inserted'][8]//mat-icon[text()='edit_outline']");
        this.panelBtns = page.locator("//button[@class='mdc-button mdc-button--outlined mat-mdc-outlined-button mat-unthemed mat-mdc-button-base ng-star-inserted']");
        this.familyCode = page.locator("//span[contains(text(),'WPC family code :')]");
    }
}