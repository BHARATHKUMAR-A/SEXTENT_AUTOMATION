import { Page, Locator } from '@playwright/test';
import searchData_Hierarchy_FF from '../test-data/searchData_Hierarchy_FF.json';
import { LoadHookContext } from 'module';
import { SearchHierarchySteps } from '../steps/searchWPCHierarchySteps';

export class SearchHierarchyPage{

    toggleButton: Locator;
    arrowDown : Locator;
    hierarchyBtn: Locator;
    structureDropdown: Locator;
    deselectSCL : Locator;
    deselectSTV : Locator;
    searchBtn : Locator;
    data: Locator;
    expectedWPCCOde:Locator;
    editClickable:Locator;
    actualWPCCode:Locator;
    visibility:Locator;
    

    constructor(page:Page){

        this.toggleButton = page.locator("//*[@id='mat-mdc-slide-toggle-1-button']");
        this.arrowDown = page.locator("//button[@class='arrow ng-star-inserted']");
        this.hierarchyBtn = page.locator("//div//mat-radio-group//div//div//input[@value='HIERARCHY']");
        this.structureDropdown = page.locator("//div//mat-form-field//div//div//div//mat-select[@formcontrolname='structures']");
        this.deselectSCL = page.locator("//mat-option[.='SCL ']");
        this.deselectSTV = page.locator("//mat-option[.='STV ']");
        this.searchBtn = page.locator("//mat-icon[contains(.,'search')]");
        this.data = page.locator("//div[@class='search-result hierarchy-mode']");
        this.expectedWPCCOde = page.locator(".panel-title.ng-star-inserted");
        this.editClickable = page.locator("(//mat-icon[@role='img'][normalize-space()='edit'])[2]");
        this.actualWPCCode = page.locator("div[class='subtitle ng-star-inserted'] span");
        this.visibility = page.locator("//h2[.='Edit Family Code']");
        
    }
}