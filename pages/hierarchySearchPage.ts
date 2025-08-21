import { Page, Locator } from '@playwright/test';
import testData_generic_SCL from '../test-data/testData_generic_SCL.json';

export class HierarchySearchPage {

    hierarchyRadio: Locator;
    structureDropdown: Locator;
    stvStructure: Locator;
    wpcStructure: Locator;
    searchIcon: Locator;
    featureValue: Locator;
    displayArrowDown: Locator;
    multiStructurePanel: Locator;
    description: Locator;
    firstRowDescription: Locator;
    countOfButton: Locator;
    featureFamilyCode: Locator;

    constructor(page: Page) {

        this.hierarchyRadio = page.locator("//input[@value='HIERARCHY']");
        this.structureDropdown = page.locator("//mat-select[@formcontrolname='structures']//div[@role='presentation']");
        this.stvStructure = page.locator("//mat-pseudo-checkbox//following-sibling::span[contains(text(),'STV')]");
        this.wpcStructure = page.locator("//mat-pseudo-checkbox//following-sibling::span[contains(text(),'WPC')]");
        this.searchIcon = page.locator("//mat-icon[text()='search']");
        this.featureValue = page.locator("(//div[contains(@class,'hierarchy-mode')]//mat-expansion-panel//mat-panel-title//span)[2]");
        this.displayArrowDown = page.locator("//mat-icon[text()='keyboard_arrow_down']");
        this.multiStructurePanel = page.locator("//mat-panel-title[text()=' Multi structures filters ']");
        this.description = page.locator("//mat-chip-grid[@formcontrolname='multiDescription']//div//input");
        this.firstRowDescription = page.locator("(//mat-panel-description//div//span)[1]");
        this.countOfButton = page.locator("//div[@class='value-list SCL']//button");
        this.featureFamilyCode = page.locator("(//mat-form-field//input)[1]");
    }
}