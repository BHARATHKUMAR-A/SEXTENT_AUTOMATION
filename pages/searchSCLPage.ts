import { Page, Locator } from '@playwright/test';
import searchData_SCL_FF from '../test-data/searchData_SCL_FF.json';
import testData_SCL_FF from '../test-data/testData_SCL_FF.json';
 
export class SearchSCLPage {
 
    isToggelOn: Locator;
    singleValue: Locator;
    searchDropdown: Locator;
    searchOption: Locator;
    specificCriteriaDropdown: Locator;
    arrowDown: Locator;
    featureFamilyCode: Locator;
    //searchIcon: Locator;
    searchResultTable: Locator;
    firstCell: Locator;
    resetBTN: Locator;
    familyDescription: Locator;
    secondCell: Locator;
    languagetab: Locator;
    languageOption: Locator;
    thirdCell: Locator;
    randomclick: Locator;
    natureOption: Locator;
    naturetab: Locator;
    fourthCell: Locator;
    manStructuretab: Locator;
    manStructureOption: Locator;
    mandStrucCell: Locator;
    manResponceOption: Locator;
    manResponcetab: Locator;
    mandResponceCell: Locator;
    moreVert: Locator;
    ManStrucvisBTN: Locator;
    ManRanvisBTN: Locator;
    SingleButton: Locator;
    structureDropdown: Locator;
    structureDropdownOptions: Locator;
    arrowDropDown: Locator;
    advanceDropdownSearch: Locator;
    categoryDropdown: Locator;
    categoryDropdownOption: Locator;
    transversalDropdown: Locator;
    transversalDropdownOption: Locator;
    creatorId: Locator;
    siExplicit: Locator;
    siExplicitOption: Locator;
    siExclusion: Locator;
    siExclusionOption: Locator;
    searchBtn: Locator;
    data: Locator;
    featureValueVisibility: Locator;
    toggleButton: Locator;
    morecolumn: Locator;
    morecolumnOption: Locator;
    visibilitybutton: Locator;
    data1: Locator;
 
    searchSideBar: Locator
    structure: Locator
    SCLoption: Locator
    //arrowDown:Locator
    //specificCriteriaDropdown:Locator
    type: Locator
    typeOption: Locator
    searchIcon: Locator
    openCustomizeColumnBtn: Locator
    closeCustomizeColumnBtn: Locator
    tableHeaderColumnType: Locator
    rankingDropdownOption: Locator
    catGrpOption: Locator
    catGrp: Locator
    ranking: Locator
    featureFamilyStartDate: Locator
    featureFamilyEndDate: Locator
    customizeColumnName: Locator
    //isToggelOn:Locator
    //singleValue:Locator
    firstRowType: Locator
    zeroRecord: Locator
    tableHeaderColumnRanking: Locator
    tableHeaderColumnCatGrp: Locator
    firstRowRanking: Locator
    //resetBTN:Locator
    firstRowCatGrp: Locator
    tableHeaderColumnDate: Locator
    date: Locator
    genericDictSearch: Locator
    toggleBtnType: Locator
    toggleBtnRanking: Locator
    toggleBtnDate: Locator
    firstRowDate: Locator
    headerRow: Locator
    columnAvailable: Locator;
    featureValueCode: Locator;
    featureValueDescription: Locator;
 
    constructor(page: Page) {
 
        //initial step locators
 
        this.isToggelOn = page.locator("//div[@class='mdc-switch__icons ng-star-inserted']//*[name()='svg'][2]");
        //this.singleValue = page.locator(" //input[@id='mat-radio-2-input']");
        this.searchDropdown = page.locator("//mat-label[contains(text(), 'Structure')]")
        this.searchOption = page.locator("(//div[@role='listbox']/mat-option[1])");
        // this.arrowDown = page.locator("//button//mat-icon[text()='keyboard_arrow_down']")
        this.specificCriteriaDropdown = page.locator("//mat-panel-title[text()=' SCL specific criteria ']")
 
        //feaure family..
        this.featureFamilyCode = page.locator('//mat-chip-grid[@formcontrolname="sclFamilyCode"]//input[@id="mat-mdc-chip-list-input-2"]');
        this.searchIcon = page.locator("div[class='grid-1 clr-wht'] button:nth-child(1) span:nth-child(4)");
        this.searchResultTable = page.locator("//div[@id='wrapper-table']");
        this.firstCell = page.locator(`//table//tbody[@role='rowgroup']//mat-row[1]//mat-cell//div//a//span[text()='${testData_SCL_FF.testDataForSearch.familycode}']`);
 
        this.resetBTN = page.locator("//button//mat-icon[text()='undo']");
 
        //feature family description
        this.familyDescription = page.locator('//mat-chip-grid[@formcontrolname="sclFamilyDescription"]//input[@class="mat-mdc-chip-input mat-mdc-input-element mdc-text-field__input mat-input-element mat-mdc-form-field-input-control"]');
        ////mat-chip-grid[@formcontrolname="sclFamilyDescription"]//input[@id="mat-mdc-chip-list-input-9"]
        this.secondCell = page.locator(`//table//tbody[@role='rowgroup']//mat-row[1]//mat-cell//div//span[contains(text(),'${testData_SCL_FF.testDataForSearch.familydescription}')]`);
 
        //language...
        this.languagetab = page.locator('//mat-select[@formcontrolname="sclLanguage"]');
        this.languageOption = page.locator('//div[@role="listbox"]//mat-option[2]');
        //this.thirdCell = page.locator("//table//tbody[@role='rowgroup']//mat-row[2]//mat-cell//div//span[contains(text(),'P - x-PSA')]");
 
        this.thirdCell = page.locator(`(//span[contains(text(), "${testData_SCL_FF.testDataForSearch.language}")])[1]`);
 
 
        //nature..
        this.naturetab = page.locator('//mat-select[@formcontrolname="sclNature"]');
        this.natureOption = page.locator('//div[@role="listbox"]//mat-option[2]');
        this.fourthCell = page.locator("(//table//tbody[@role='rowgroup']//mat-row[1]//mat-cell//div//a)[1]");
 
        //mandatory structure...
        this.manStructuretab = page.locator("//mat-label[text()=' Mandatory with structure ']");  ////mat-select[@formcontrolname='sclMandatoryWithStructure']
        this.manStructureOption = page.locator("//div[@role='listbox']//mat-option[1]");
        this.mandStrucCell = page.locator("(//tbody[@role='rowgroup']//mat-row[1]//mat-cell[4]//div//span[contains(text(),'C - x-FCA NA')])[1]");
 
        //more steps
        this.moreVert = page.locator("//mat-icon[text()='more_vert']");
        this.ManStrucvisBTN = page.locator("//div[@class='cdk-drag column-item ng-star-inserted'][19]//div[@class='colunm-attributes']//mat-icon[text()='visibility_off']");
        this.ManRanvisBTN = page.locator("//div[@class='cdk-drag column-item ng-star-inserted'][20]//div[@class='colunm-attributes']//mat-icon[text()='visibility_off']");
 
 
        //mandatory structure...
        this.manResponcetab = page.locator("//mat-label[text()=' Mandatory with responsibility ']");
        this.manResponceOption = page.locator("//mat-option//span[text()=' Homologation ']");
        this.mandResponceCell = page.locator("(//table//tbody[@role='rowgroup']//mat-row[1]//mat-cell//div//span[contains(text(),'H')])[2]");
        this.SingleButton = page.locator("//label[normalize-space()='Single']");
        this.structureDropdown = page.locator("//mat-select[@formcontrolname='structures']");
        this.structureDropdownOptions = page.locator(`(//mat-option/span[contains(text(),'${searchData_SCL_FF.Searching.structure}')])[1]`);
        this.arrowDropDown = page.locator("//button[@class='arrow ng-star-inserted']");
        this.advanceDropdownSearch = page.locator("//mat-panel-title[.=' SCL specific criteria ']");
        this.categoryDropdown = page.locator("//mat-select[@formcontrolname='sclCategory']");
        this.categoryDropdownOption = page.locator(`(//mat-option/span[contains(.,'${searchData_SCL_FF.Searching.category}')])`);
        this.transversalDropdown = page.locator("//mat-select[@formcontrolname='sclTransversalDescription']");
        this.transversalDropdownOption = page.locator(`(//mat-option/span[contains(.,'${searchData_SCL_FF.Searching.Transversal_Description}')])`);
        this.creatorId = page.locator("//input[@id='mat-mdc-chip-list-input-4']");
        this.siExplicit = page.locator("//mat-select[@formcontrolname='sclSiExplicit']");
        this.siExplicitOption = page.locator(`(//mat-option//span[contains(text(),'${searchData_SCL_FF.Searching.Si_Explicit}')])[1]`);
        this.siExclusion = page.locator("//mat-select[@formcontrolname='sclSiExclusion']");
        this.siExclusionOption = page.locator(`(//mat-option//span[contains(text(),'${searchData_SCL_FF.Searching.Si_Exclusion}')])[1]`);
        this.searchBtn = page.locator("//body[1]/app-root[1]/div[1]/app-sidenav[1]/mat-sidenav-container[1]/mat-sidenav-content[1]/main[1]/app-search-with-filters[1]/div[1]/form[1]/div[1]/div[1]/div[3]/button[1]");
        this.data = page.locator("(//mat-row[@id='undefined'])[2]");
        this.featureValueVisibility = page.locator("//div[text()='Feature Value Code']");
        this.toggleButton = page.locator("//*[@id='mat-mdc-slide-toggle-1-button']");
        this.morecolumn = page.locator("//mat-icon[normalize-space()='more_vert']");
        //div[contains(text(),'Feature')]
        this.morecolumnOption = page.locator("//div[@style='touch-action: none; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; user-select: none;']");
        this.visibilitybutton = page.locator("//button[contains(.,'visibility')][1]");
        this.columnAvailable = page.locator("//mat-header-cell[@role='columnheader']");
        this.featureValueCode = page.locator("//input[@id='mat-mdc-chip-list-input-5']");
        this.featureValueDescription = page.locator("//mat-label[contains(.,'Feature Value Description')]");
 
        this.searchSideBar = page.locator("//span[contains(text(), 'Search')]").first()
        this.structure = page.locator("//mat-label[contains(text(), 'Structure')]")
        this.SCLoption = page.locator("(//div[@role='listbox']/mat-option[1])")
        this.arrowDown = page.locator("//button//mat-icon[text()='keyboard_arrow_down']")
        // this.specificCriteriaDropdown=page.locator("//mat-panel-title[text()=' SCL specific criteria ']")
        //this.resetBTN = page.locator("//button//mat-icon[text()='undo']");
        this.genericDictSearch = page.locator("//h2[text()='Generic Dictionary - Search']")
 
        this.type = page.locator("//label//mat-label[text()='Type']")
        this.typeOption = page.locator(`//div[@role='listbox']//mat-option//span[contains(text(),'${testData_SCL_FF.testData.typeOptionValue}')]`)
 
        this.ranking = page.locator("//label//mat-label[text()='Ranking']")
        this.rankingDropdownOption = page.locator(`//div[@role='listbox']//mat-option//span[contains(text(),'${testData_SCL_FF.testData.rankingDropdownOptionValue}')]`)
 
        this.catGrp = page.locator("//label//mat-label[text()='Category group']")
        this.catGrpOption = page.locator(`//div[@role='listbox']//mat-option//span[contains(text(),'${testData_SCL_FF.testData.catGrpOptionValue}')]`)
 
 
        /// this.searchIcon=page.locator("div[class='grid-1 clr-wht'] button:nth-child(1) span:nth-child(4)")
        this.openCustomizeColumnBtn = page.locator("//button//mat-icon[text()='more_vert']")
        this.closeCustomizeColumnBtn = page.locator("//button//mat-icon[text()='horizontal_distribute']")
        this.tableHeaderColumnType = page.locator("//table//mat-header-row//mat-header-cell//div/div/div[text()='Type (Feature Family)']")
        this.tableHeaderColumnRanking = page.locator("//table//mat-header-row//mat-header-cell//div/div/div[text()='Ranking Path (Feature Family)']")
        //this.tableHeaderColumnCatGrp=page.locator("//table//mat-header-row//mat-header-cell//div/div/div[text()='Ranking Path (Feature Family)']")
        //this.customizeColumnName=page.locator(`(//div[@class='cdk-drop-list']//div//div/div[1]//span[text()=' ${testData_SCL_FF.testData.customizeColumnNameValue}'])`)
        //this.isToggelOn = page.locator("//div[@class='mdc-switch__icons ng-star-inserted']//*[name()='svg'][2]");
        this.singleValue = page.locator(" //input[@id='mat-radio-2-input']");
        this.firstRowType = page.locator(`//table//tbody[@role='rowgroup']//mat-row[1]//mat-cell//div//span[contains(text(),'${testData_SCL_FF.testData.typeOptionValue}')]`).first()
        this.firstRowRanking = page.locator(`//table//tbody[@role='rowgroup']//mat-row[1]//mat-cell//div//span[contains(text(),'${testData_SCL_FF.testData.rankingDropdownOptionValue}')]`).first()
        //this.firstRowCatGrp=page.locator(`//table//tbody[@role='rowgroup']//mat-row[1]//mat-cell//div//span[text()='${testData_SCL_FF.testData.rankingDropdownOptionValue}']`)
        this.zeroRecord = page.locator("//div[@class='bottom-section']//mat-paginator//div//div//div[2]//div[text()=' 0 of 0 ']")
        this.toggleBtnType = page.locator("//span[contains(text(),'Type (Feature Family)')]/following::button[2]")
        this.toggleBtnRanking = page.locator("//span[text()='Ranking Path (Feature Family)']/following::button[2]")
        this.toggleBtnDate = page.locator("//span[text()='Prohibited for new use (Feature Family)']/following::button[2]")
 
        this.featureFamilyStartDate = page.locator("(//mat-label[text()='From'])[1]")
        this.featureFamilyEndDate = page.locator("(//mat-label[text()='To'])[1]")
        this.tableHeaderColumnDate = page.locator("//table//mat-header-row//mat-header-cell//div/div/div[text()='Prohibited for new use (Feature Family)']")
 
 
        this.headerRow = page.locator("//table//mat-header-row//mat-header-cell")
        this.data1 = page.locator("(//mat-expansion-panel-header[@role='button'])[9]");
 
    }
}