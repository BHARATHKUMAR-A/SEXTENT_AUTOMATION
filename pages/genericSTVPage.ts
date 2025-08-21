import { Page, Locator } from '@playwright/test';
import searchTestData_STV_FF from '../test-data/searchTestData_STV_FF.json'
export class GenericSTVPage { 

    //search stv 1st block
  singleRadioButton:Locator;
  structureDropdown:Locator;
  structureDropdownOption:Locator;
  searchByCode:Locator;
  searchByKeyword:Locator;
  searchIcon:Locator;
  data:Locator;

  //search stv 2nd 
  toggleButton:Locator;
  classData:Locator;
  salesData:Locator;
  salesCodeVisibility:Locator;

  //search stv 3rd
  arrowIcon:Locator;
  stvSpecificCriteria:Locator;
  classCodeSearch:Locator;
  classCodeDescSearch:Locator;
  salesCodeSearch:Locator;
  salesCodeDescSearch:Locator;
  classCreatorID:Locator;
  salesCreatorID:Locator;
  morecolumn:Locator;
  columnAvailable:Locator;
  morecolumnOption:Locator;
  visibilitybutton:Locator;

    constructor(page : Page){



        //search stv search by code and keyword
        this.singleRadioButton=page.locator("//label[normalize-space()='Single']");
        this.structureDropdown=page.locator("//mat-select[@formcontrolname='structures']");
        this.structureDropdownOption=page.locator(`(//mat-option/span[contains(text(),'${searchTestData_STV_FF.testData.structure}')])[1]`);
        this.searchByCode  = page.locator("//input[@id='mat-mdc-chip-list-input-0']");
        this.searchByKeyword  = page.locator("//input[@id='mat-mdc-chip-list-input-1']");
        this.searchIcon=page.locator("//body[1]/app-root[1]/div[1]/app-sidenav[1]/mat-sidenav-container[1]/mat-sidenav-content[1]/main[1]/app-search-with-filters[1]/div[1]/form[1]/div[1]/div[1]/div[3]/button[1]");
        this.data = page.locator("(//mat-row[@id='undefined'])[1]");

         //search stv for toggle button
        this.toggleButton = page.locator("//*[@id='mat-mdc-slide-toggle-1-button']");
        this.classData = page.locator("//div[@class='header-text ng-tns-c1267148319-21']");
        this.salesData = page.locator("//div[@class='header-text ng-tns-c1267148319-45']");
        this.salesCodeVisibility=page.locator("//div[@class='header-text ng-tns-c1267148319-53']");

        //search stv class and sales code
        this.arrowIcon=page.locator("//button[@class='arrow ng-star-inserted']");
        this.stvSpecificCriteria=page.locator("//mat-expansion-panel-header[@id='mat-expansion-panel-header-4']");
        this.classCodeSearch=page.locator("//input[@id='mat-mdc-chip-list-input-2']");
        this.classCodeDescSearch=page.locator("//input[@id='mat-mdc-chip-list-input-3']");
        this.classCreatorID=page.locator("//input[@id='mat-mdc-chip-list-input-4']");
        this.salesCodeSearch=page.locator("(//input[@id='mat-mdc-chip-list-input-5'])[1]");
        this.salesCodeDescSearch=page.locator("//input[@id='mat-mdc-chip-list-input-6']");
        this.salesCreatorID=page.locator("(//input[@id='mat-mdc-chip-list-input-7'])[1]");
        this.morecolumn = page.locator("//mat-icon[normalize-space()='more_vert']");
        this.columnAvailable = page.locator("//mat-header-cell[contains(.,'')]");
        this.morecolumnOption = page.locator("//div[@style='touch-action: none; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; user-select: none;']");
        this.visibilitybutton = page.locator("//button[contains(.,'visibility')][1]");

    }
}