import { Page, Locator } from '@playwright/test';
import testData_STV_FF from '../test-data/testData_STV_FF.json';
import searchDataHierarchy_STV_FF from '../test-data/searchDataMapped_STV_FF.json';
export class GenericSearch_HierarchyPage {

    hierarchyToggleButton: Locator;
    hierarchyRadioButton: Locator;
    hierarchySearchIcon: Locator;
    hierarchyArrowIcon: Locator;
    hierarchyStructureDropdown: Locator;
    hierarchyStructureDropdownOptionSCL: Locator;
    hierarchyStructureDropdownOptionWPS: Locator;
    hierarchyMultiStructureFilters: Locator;
    hierarchyMultiDesc: Locator;
    hierarchyData: Locator;
    hierarchyEditIcon: Locator;
    hierarchyEditPage: Locator;
    hierarchyClassCodeSTV: Locator;
    hierarchyClassCodeEditPageSTV: Locator;

    constructor(page: Page) {
        this.hierarchyToggleButton = page.locator("//*[@id='mat-mdc-slide-toggle-1-button']");
        this.hierarchyRadioButton = page.locator("//label[normalize-space()='Hierarchy']");
        this.hierarchyStructureDropdown = page.locator("//mat-select[@formcontrolname='structures']");
        this.hierarchyStructureDropdownOptionSCL = page.locator("//mat-option[.='SCL ']");
        this.hierarchyStructureDropdownOptionWPS = page.locator("//mat-option[.='WPC ']");
        this.hierarchyArrowIcon = page.locator("//button[@class='arrow ng-star-inserted']");
        this.hierarchyMultiStructureFilters = page.locator("//mat-expansion-panel-header[@id='mat-expansion-panel-header-4']");
        this.hierarchyMultiDesc = page.locator("(//input[@id='mat-mdc-chip-list-input-2'])[1]");
        this.hierarchySearchIcon = page.locator("//body[1]/app-root[1]/div[1]/app-sidenav[1]/mat-sidenav-container[1]/mat-sidenav-content[1]/main[1]/app-search-with-filters[1]/div[1]/form[1]/div[1]/div[1]/div[3]/button[1]");
        this.hierarchyData = page.locator("//div[@class='search-result hierarchy-mode']");
        this.hierarchyEditIcon = page.locator("//mat-panel-description[@class='mat-expansion-panel-header-description ng-tns-c2690051721-37']//mat-icon[@role='img'][normalize-space()='edit']");
        this.hierarchyEditPage = page.locator("//h2[.='Edit Class Code']");
        this.hierarchyClassCodeSTV = page.locator("mat-panel-title[class='mat-expansion-panel-header-title ng-tns-c2690051721-37'] span[class='panel-title ng-star-inserted']");
        this.hierarchyClassCodeEditPageSTV = page.locator("div[class='subtitle ng-star-inserted'] span");
    }
}