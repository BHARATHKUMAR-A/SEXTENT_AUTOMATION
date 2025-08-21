import { Locator, Page } from "@playwright/test";

export class GenericSearchHierarchySCLPage{
    search:Locator;
    hierarchyRadioButton : Locator;
    structure : Locator;
    structureWPC : Locator;
    structureSTV: Locator;
    firstToggleButton : Locator;
    panelToggle : Locator;
    description : Locator;
    searchIcon : Locator;
    firstRow : Locator;
    commonRow : Locator;
    editIcon : Locator;
    toggleButton : Locator;
    mappedCode : Locator;
    
    constructor(page:Page){
        this.search = page.locator("//*[@id='cdk-accordion-child-0']/div/mat-nav-list/a[1]/span");
        this.hierarchyRadioButton = page.locator("//label[text()='Hierarchy']");
        this.structure = page.locator("//mat-label[text()='Structure']");
        this.structureWPC = page.locator("//mat-option/span[contains(text(),'WPC ')]");
        this.structureSTV = page.locator("//mat-option/span[contains(text(),'STV ')]");
        this.firstToggleButton = page.locator("//mat-icon[text()='keyboard_arrow_down']");
        this.panelToggle = page.locator("//mat-panel-title[text()=' Multi structures filters ']");
        this.description = page.locator("//mat-label[text()='Description']");
        this.searchIcon = page.locator("//mat-icon[text()='search']");
        this.firstRow = page.locator("//mat-accordion//mat-expansion-panel[1]");
        this.commonRow = page.locator("//mat-accordion//mat-expansion-panel");
        this.editIcon = page.locator("//mat-accordion//mat-expansion-panel[1]//mat-icon[text()='edit']");
        this.toggleButton = page.locator("//*[@id='mat-mdc-slide-toggle-1-button']");
        this.mappedCode = page.locator("//span[contains(text(),'Feature family code :')]");

    }
}