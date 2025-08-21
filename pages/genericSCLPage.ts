import { Page, Locator } from '@playwright/test';
import testData_generic_SCL from '../test-data/testData_generic_SCL.json';

export class GenericSCLPage{
    classCode : Locator;
    search:Locator;
    rowLine : Locator;
    structure : Locator;
    structureValue : Locator;
    searchByCode : Locator;
    searchIcon : Locator;
    toggleButton : Locator;
    featureValueButton : Locator;

    constructor(page : Page){

        //generic SCL search locator
        this.search = page.locator("//*[@id='cdk-accordion-child-0']/div/mat-nav-list/a[1]/span");
        this.classCode = page.locator("//*[@id='tree-table']/tbody/mat-row[2]/mat-cell[2]/div/a");
        this.structure = page.locator("//mat-label[text()='Structure']");
        this.structureValue = page.locator(`//mat-option/span[contains(text(),'${testData_generic_SCL.genericSearchData.structure}')]`);
        this.searchByCode = page.locator("//input[@id='mat-mdc-chip-list-input-0']");
        this.searchIcon = page.locator("//mat-icon[text()='search']");
        this.rowLine = page.locator("//*[@id='undefined'][1]");
        this.toggleButton = page.locator("//*[@id='mat-mdc-slide-toggle-1-button']");
        this.featureValueButton = page.locator("//div[text()='Feature Value Code']");

    }
}