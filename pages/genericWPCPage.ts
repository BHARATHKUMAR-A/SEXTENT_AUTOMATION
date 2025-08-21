import { Page, Locator } from '@playwright/test';
import testData_generic_SCL from '../test-data/testData_generic_SCL.json';

export class GenericWPCPage { 
    classCode : Locator;
    search:Locator;
    rowLine : Locator;
    structure : Locator;
    structureValue : Locator;
    searchByCode : Locator;
    searchIcon : Locator;
    firstKeyBoardToggle : Locator;
    secondSpanToggle : Locator;
    businessType: Locator;
    businessTypeOption : Locator;
    businessColumn : Locator;
    featurePackage:Locator;
    featurePackageOption : Locator;
    featureApplicationColumn : Locator;
    packageType : Locator;
    packageTypeOption : Locator;
    featurePackageTypeColumn : Locator;
    componentType : Locator;
    featureCreatorId : Locator;

    morecolumn: Locator;
    morecolumnOption: Locator;
    visibilitybutton:Locator;
    bypass:Locator;
    bypassValue : Locator;
    bypassColumn : Locator;
    newStructureValue : Locator;


    //bhavesh
    projectType : Locator;
    projectTypeOption : Locator;
    creatorId : Locator;
    featureCode : Locator;
    featureDescription : Locator;
    projectColumn : Locator;
    familyCreatorIdColumn : Locator;
    featureCodeColumn : Locator
    featureDescColumn : Locator
    

    constructor (page:Page){
        //baidehi
        this.search = page.locator("//*[@id='cdk-accordion-child-0']/div/mat-nav-list/a[1]/span");
        this.structure = page.locator("//mat-label[text()='Structure']");
        this.structureValue = page.locator(`//mat-option/span[contains(text(),'${testData_generic_SCL.genericWPCDataValues.structure}')]`);
        this.searchIcon = page.locator("//mat-icon[text()='search']");
        this.rowLine = page.locator("//*[@id='undefined'][1]");
        this.firstKeyBoardToggle = page.locator("//mat-icon[text()='keyboard_arrow_down']");
        this.secondSpanToggle = page.locator("//*[@id='mat-expansion-panel-header-4']/span[2]");
        this.businessType = page.locator("//mat-select[@formcontrolname='wpcFeatureBusinessType']");
        this.businessTypeOption = page.locator(`(//mat-option//span[contains(text(),'${testData_generic_SCL.genericWPCDataValues.businessTypeOption}')])[1]`);
        this.featurePackage = page.locator("//mat-select[@formcontrolname='wpcFeatureApplication']");
        this.featurePackageOption = page.locator(`(//mat-option//span[contains(text(),'${testData_generic_SCL.genericWPCDataValues.featurePackageOption}')])[1]`)
        this.packageType = page.locator("//mat-select[@formcontrolname='wpcFeaturePackageType']");
        this.packageTypeOption = page.locator(`(//mat-option//span[contains(text(),'${testData_generic_SCL.genericWPCDataValues.packageTypeOption}')])[1]`);
        this.componentType = page.locator("//mat-label[text()='Component feature']");
        this.featureCreatorId = page.locator("//label[@id='mat-mdc-form-field-label-32']/mat-label[text()='Creator ID']");
        this.businessColumn = page.locator("//div[text()='Business Type (Feature Code)']");
        this.featureApplicationColumn = page.locator("//div[text()='Application (Feature Code)']");
        this.featurePackageTypeColumn = page.locator("//div[text()='Feature Package Type (Feature Code)']");



        this.morecolumn = page.locator("//mat-icon[normalize-space()='more_vert']");
        this.visibilitybutton = page.locator("//button[contains(.,'visibility')][1]");
         this.morecolumnOption = page.locator("//div[@style='touch-action: none; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; user-select: none;']");
       this.newStructureValue = page.locator(`//mat-option/span[contains(text(),'${testData_generic_SCL.genericWPCDataValues.sclStructure}')]`);
        this.bypass = page.locator("//label/mat-label[text()=' Mandatory for Definition Bypass ']");
        this.bypassValue = page.locator(`//mat-option/span[text()="${testData_generic_SCL.genericWPCDataValues.bypassValue}"]`);
        this.bypassColumn = page.locator("//div[text()='Mandatory for Definition Bypass']");


        
        //bhavesh
        this.projectType = page.locator("//mat-select[@formcontrolname='wpcFamilyProjectType']");
        this.projectTypeOption = page.locator(`//mat-option/span[contains(text(),'${testData_generic_SCL.genericWPCDataValues.projectTypeOption}')]`);
        this.creatorId = page.locator("//*[@id='mat-mdc-chip-list-input-4']");
        this.featureCode = page.locator("//mat-label[text()='Feature code']");
        this.featureDescription = page.locator("//mat-label[text()='Feature description']");
        this.projectColumn = page.locator("//div[text()='Project Type (Family Code)']");
        this.familyCreatorIdColumn = page.locator("//div[text()='Creator ID (Family Code)']");
        this.featureCodeColumn = page.locator("//div[text()='Feature Code']");
        this.featureDescColumn = page.locator("//div[text()='Long Description EN (Feature Code)']");


        
    }
}