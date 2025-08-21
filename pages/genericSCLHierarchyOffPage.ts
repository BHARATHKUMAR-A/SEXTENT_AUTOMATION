import { Page, Locator } from '@playwright/test';
 
export class GenericSCLHierarchyOffPage{
    search:Locator;
    rowLine : Locator;
    structure : Locator;
    structureValue : Locator;
    structureValue1 : Locator;
    searchIcon : Locator;
    toggleButton : Locator;
    hierarchyButton : Locator;
    editButton : Locator;
    famCode : Locator;
    famCodecheck : Locator;
 
    constructor(page : Page){
 
        //generic SCL search locator
        this.search = page.locator("//*[@id='cdk-accordion-child-0']/div/mat-nav-list/a[1]/span");
        //this.classCode = page.locator("//*[@id='tree-table']/tbody/mat-row[2]/mat-cell[2]/div/a");
        //this.rowLine = page.locator("//*[@id='tree-table']/tbody/mat-row[2]");
        this.structure = page.locator("//mat-label[text()='Structure']");
        this.structureValue = page.locator("//mat-option/span[contains(text(),'STV ')]");
        this.structureValue1 = page.locator("//mat-option/span[contains(text(),'WPC ')]");
        //this.searchByCode = page.locator("//input[@id='mat-mdc-chip-list-input-0']");
        this.searchIcon = page.locator("//mat-icon[text()='search']");
        this.rowLine = page.locator("//*[@id='undefined'][1]");
        this.toggleButton = page.locator("//*[@id='mat-mdc-slide-toggle-1-button']");
        this.hierarchyButton = page.locator("//label[text()='Hierarchy']");
        this.editButton = page.locator("//mat-accordion//mat-expansion-panel[1]//mat-expansion-panel-header//mat-panel-description//mat-icon");
        this.famCode = page.locator("//mat-accordion//mat-expansion-panel[1]//mat-expansion-panel-header//mat-panel-title//span[2]");
        this.famCodecheck = page.locator("//span[contains(text(),'Feature family code')]");
}
}