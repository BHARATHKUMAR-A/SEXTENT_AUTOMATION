import { Page, Locator } from '@playwright/test';
import testData_WPC_FF from '../test-data/testData_WPC_FF.json' assert { type: 'json' };
import searchData_WPC_FF from '../test-data/searchData_WPC_FF.json';  
 
export class SearchWPCPage {
    structure: Locator;
    WPCoption: Locator;
    arrowDown: Locator;    
    specificCriteriaDropdown: Locator;
    isToggleOn: Locator;
    singleValue: Locator;
    familyCodeInput: Locator;
    searchButton: Locator;
    table: Locator;
    tableHeaderColumn: Locator;
    firstRow: Locator;
    familyDescriptionInput: Locator;
    resetButton: Locator;
    firstRow1: Locator;
    businessTypeDropdown: Locator;
    businessTypeOption: Locator;
    randomClick: Locator;
    zeroRecord: Locator;
    expandButton: Locator;
    openCustomizeColumnBtn: Locator;
    closeCustomizeColumnBtn: Locator;
    toggleBtnType: Locator;
    firstRow2: Locator;
    tableHeaderColumn2: Locator;
    SingleButton:Locator;
    structureDropdown: Locator;
    structureDropdownOptions: Locator;
    searchByCode : Locator;
    searchByKeyword: Locator;
    searchBtn : Locator;
    data:Locator;
    toggleButton: Locator;
    featureValueVisibility: Locator;
    // structureDropdown: Locator;
    // dropdownArrowButton: Locator;
 
 
    constructor(page: Page) {
        this.structure = page.locator("//mat-label[contains(text(), 'Structure')]")
        this.WPCoption=page.locator("(//div[@role='listbox']/mat-option[3])")
        this.arrowDown=page.locator("//button//mat-icon[text()='keyboard_arrow_down']")
        this.specificCriteriaDropdown=page.locator("//mat-panel-title[text()=' WPC specific criteria ']")
        this.isToggleOn = page.locator("//div[@class='mdc-switch__icons ng-star-inserted']//*[name()='svg'][2]");
        this.singleValue = page.locator(" //input[@id='mat-radio-2-input']");
 
        //Family Code
        this.familyCodeInput = page.locator("#mat-mdc-chip-list-input-2");
        this.searchButton = page.locator("body > app-root > div > app-sidenav > mat-sidenav-container > mat-sidenav-content > main > app-search-with-filters > div > form > div > div.grid-1.clr-wht > div.button-grid.mr-rt > button:nth-child(1) > span.mat-mdc-button-touch-target");
        this.table = page.locator("#wrapper-table");
        this.tableHeaderColumn =page.locator("//table//mat-header-row//mat-header-cell//div/div/div[text()='Family Code']")
        this.firstRow = page.locator(`//table//tbody[@role='rowgroup']//mat-row[1]//mat-cell//div//a//span[text()='${testData_WPC_FF.testData.familyCode}']`)
        this.resetButton = page.locator("//button//mat-icon[text()='undo']")
 
        //Family Description
        this.familyDescriptionInput = page.locator("//mat-label[text()='Family Description']");
        this.firstRow1 = page.locator(`//table//tbody[@role='rowgroup']//mat-row[1]//mat-cell//div//span[contains(text(),'${testData_WPC_FF.testData.familyDescription}')]`)
 
        //Business Type
        this.businessTypeDropdown = page.locator("(//div[contains(@class, 'mat-mdc-form-field-infix')])[6]");
        this.businessTypeOption = page.locator(`//div[@role="listbox"]//mat-option[2]`)
        this.randomClick = page.locator("//div//h2[text()='Generic Dictionary - Search']")
        this.zeroRecord=page.locator("//div[@class='bottom-section']//mat-paginator//div//div//div[2]//div[text()=' 0 of 0 ']")
        this.openCustomizeColumnBtn=page.locator("//button//mat-icon[text()='more_vert']")
        this.closeCustomizeColumnBtn=page.locator("//button//mat-icon[text()='horizontal_distribute']")
        this.toggleBtnType=page.locator("//span[text()='Business Type (Family Code)']/following::button[2]")
        this.expandButton = page.locator(`//*[@id="tree-table"]/thead/mat-header-row/mat-header-cell[5]/div/button/mat-icon`)
        this.tableHeaderColumn2 = page.locator("//table//mat-header-row//mat-header-cell//div/div/div[text()='Business Type (Family Code)']")
        this.firstRow2 = page.locator(`//table//tbody[@role='rowgroup']//mat-row[1]//mat-cell//div//span[contains(text(),'${testData_WPC_FF.testData.businessType}')]`)
        // this.structureDropdown = page.locator("//div[contains(@class, 'mat-mdc-form-field-infix') and contains(@class, 'ng-star-inserted')]");
        // this.dropdownArrowButton = page.locator("//button[contains(@class, 'arrow') and contains(@class, 'ng-star-inserted')]");
        this.SingleButton=page.locator("//label[normalize-space()='Single']");
        this.structureDropdown=page.locator("//mat-select[@formcontrolname='structures']");
        this.structureDropdownOptions = page.locator(`(//mat-option/span[contains(text(),'${searchData_WPC_FF.Searching.structure}')])[1]`);
        this.searchByCode  = page.locator("//input[@id='mat-mdc-chip-list-input-0']");
        this.searchByKeyword  = page.locator("//input[@id='mat-mdc-chip-list-input-1']");
        this.searchBtn = page.locator("//body[1]/app-root[1]/div[1]/app-sidenav[1]/mat-sidenav-container[1]/mat-sidenav-content[1]/main[1]/app-search-with-filters[1]/div[1]/form[1]/div[1]/div[1]/div[3]/button[1]");
        this.data = page.locator("(//mat-row[@id='undefined'])[2]");
        this.toggleButton = page.locator("//*[@id='mat-mdc-slide-toggle-1-button']");
        this.featureValueVisibility = page.locator("//div[text()='Feature Value Code']");
    }
}
 