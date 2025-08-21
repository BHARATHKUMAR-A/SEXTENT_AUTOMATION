import { Page, Locator } from '@playwright/test';
import testData_WPC_FF from '../test-data/testData_WPC_FF.json' assert { type: 'json' };
import { EditWPCSteps } from '../steps/editWPCSteps';

export class FeatureWPCPage {
  createWPCFeature: Locator;
  createWPCFamilyCode: Locator;
  category: Locator;
  category_WPC_option: Locator;
  businessType: Locator;
  businessType_WPS_option: Locator;
  typologyType_WPS: Locator;
  typologyType_WPS_option: Locator;
  manualCode_WPC: Locator;
  searchCode: Locator;
  selectCode: Locator;
  selectCodeWPC: Locator;
  nextButton_WPC: Locator;
  longDescription: Locator;
  copyLongDescription: Locator;
  save: Locator;
  confirmation: Locator;
  familyCode_WPC: Locator;
  clickFamilyCode: Locator;
  featureCodeLength: Locator;
  subType: Locator;
  subTypeOption: Locator;
  shortDescription: Locator;
  copyShortDescription: Locator;
  featurePackageType: Locator;
  featurePackageTypeOption: Locator;
  featureApplication: Locator;
  featureApplicationOption: Locator;
  selectRandomCode: Locator;
  featureBusinessType: Locator;
  featureBusinessTypeOption: Locator;
  mediumDescription: Locator;
  successMessage: Locator;
  // firstCodeFromList: Locator;
  noSuggestionCode: Locator;
  manualCodeText: Locator;
  checkCode: Locator;
  unAvailableCode: Locator;
  rightFormatMessage: Locator;
  checkValidCode: Locator;
  historyIcon: Locator;
  historyClose: Locator;
  editLongDescription: Locator;
  editDescription: Locator;
  copyLongDescriptionIT: Locator;
  verifyEditMessage: Locator;
  editedDate: Locator;
  editedUser: Locator;
  oldLongDesEN: Locator;
  newLongDesEN: Locator;
  newLongDesIT: Locator
  oldLongDesIT: Locator;
  oldMedDesEN: Locator;
  newMedDesEN: Locator;
  newMedDesIT: Locator
  oldMedDesIT: Locator;
  editShortDesEN: Locator;
  oldShortDesIT: Locator;
  newShortDesIT: Locator;
  oldShortDesEN: Locator;
  newShortDesEN: Locator;
  featureCodeTextbox : Locator;
  valid : Locator;
  availability : Locator;
  format : Locator;
  manualCodeInput : Locator;
  editFeatureLongDescriptionEN : Locator;
  editFeatureLongDescriptionIT : Locator;
  longDescriptionEN : Locator;
  editFeatureShortDescriptionEN : Locator;
  failedToCreateWPC : Locator;
  failedFeatureAlreadyExists : Locator;
  nextButton : Locator;
  saveBtn : Locator;


  constructor(page: Page) {
    this.createWPCFeature = page.locator("//span[contains(text(), 'Create WPC feature')]");
    this.createWPCFamilyCode = page.locator("//span[contains(text(), 'Create WPC family code')]");
    this.category = page.locator("//mat-select[@formcontrolname='categoryForm']");
    this.category_WPC_option = page.locator(`//span[contains(text(),'${testData_WPC_FF.testData.category_WPS_options} ')]`);

    if(testData_WPC_FF.testData.category_WPS_options == 'CC - Configuration'){
      this.typologyType_WPS_option = page.locator(`//span[contains(text(),'${testData_WPC_FF.configuration.typologyType_WPS_options} ')]`);
 
      this.businessType_WPS_option = page.locator(`//span[contains(text(),'${testData_WPC_FF.configuration.busineesType_WPS_options} ')]`);
    }
    else if(testData_WPC_FF.testData.category_WPS_options == 'CE - Enrichment'){
      this.businessType_WPS_option = page.locator(`//span[contains(text(),'${testData_WPC_FF.enrichment.busineesType_WPS_options} ')]`);
   
    }
    
    this.businessType = page.locator("//mat-select[@formcontrolname='businessForm']");
    this.typologyType_WPS = page.locator("//mat-select[@formcontrolname='typologyForm']");
    this.manualCode_WPC = page.locator("//button[@class='mdc-switch mdc-switch--selected mdc-switch--checked']");
    this.searchCode = page.locator("//mat-icon[text()='search']");
    this.selectCodeWPC = page.locator(`//td[contains(text(),'${testData_WPC_FF.testData.manualCodeWPC} ')]`);
    this.nextButton_WPC = page.locator("//button//span/following-sibling::span[contains(text(),'Next')]");
    this.longDescription = page.locator("//mat-label[text()='Long description EN']");
    this.copyLongDescription = page.locator("(//mat-icon[text()='filter_none'])[1]");
    this.save = page.locator("//span[contains(text(), 'Save')]");
    this.confirmation = page.locator("//span[text()=' CONFIRMATION ']");
    this.familyCode_WPC = page.locator("//input[@aria-label='select code']");
    this.featureCodeLength = page.locator("//input[@formcontrolname='featureCodeLength']");
    this.subType = page.locator("//mat-select[@formcontrolname='subType']");
    this.subTypeOption = page.locator(`//span[contains(text(),'${testData_WPC_FF.testData.subType} ')]`);
    this.shortDescription = page.locator("//mat-label[text()='Short description EN']");
    this.copyShortDescription = page.locator("(//mat-icon[text()='filter_none'])[3]");
    this.featurePackageType = page.locator("//div//mat-select[@formcontrolname='featurePackageType']");
    this.featurePackageTypeOption = page.locator(`//span[contains(text(),'${testData_WPC_FF.testData.featurePackageType} ')]`);
    this.featureApplication = page.locator("//mat-select[@formcontrolname='featureApplication']");
    this.featureApplicationOption = page.locator(`//span[contains(text(),'${testData_WPC_FF.testData.featureApplication} ')]`);
    this.selectRandomCode = page.locator("//div[@class='code-suggestion-table']//table//tr[2]//td[12]");
    this.featureBusinessType = page.locator("//mat-label[text()='Feature Business Type']");
    this.featureBusinessTypeOption = page.locator(`//span[contains(text(),'${testData_WPC_FF.testData.featureBusinessType} ')]`);
    this.mediumDescription = page.locator("(//input[@type='text'])[12]");
    this.successMessage = page.locator("//h4[contains(text(),'SUCCESS')]");
    this.noSuggestionCode = page.locator("//mat-hint[text()='No WPC suggestion codes available']");
    this.manualCodeText = page.locator("//input[@formcontrolname='familyCodeCtrl']");
    this.checkCode = page.locator("//mat-icon[text()='check_circle_outline']");
    this.unAvailableCode = page.locator("//li[contains(text(),'Code is not available')]");
    this.rightFormatMessage = page.locator("//li[contains(text(),'Code has not the right format')]");
    this.checkValidCode = page.locator("//ul[@class='code-valid-check-list ng-star-inserted']");
    this.historyIcon = page.locator("//mat-icon[text()='history']");
    this.historyClose = page.locator("//span[text()='CLOSE']");
    this.editLongDescription = page.locator("(//input[contains(@class, 'ng-touched ng-pristine ng-valid mat-mdc-form-field-input-control mdc-text-field__input cdk-text-field-autofill-monitored')])[1]");
    this.editDescription = page.locator("(//input[contains(@class, 'ng-touched ng-pristine ng-valid mat-mdc-form-field-input-control mdc-text-field__input cdk-text-field-autofill-monitored')])[2]");
    this.copyLongDescriptionIT = page.locator("(//mat-icon[text()='filter_none'])[2]");
    this.editedDate = page.locator("//table[@aria-describedby='history-table']//tbody//tr[1]//td[1]");
    this.editedUser = page.locator("//table[@aria-describedby='history-table']//tbody//tr[1]//td[2]");
    this.oldLongDesEN = page.locator("//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Long Description EN')]//following-sibling::li[contains(text(),'Old:')]//span");
    this.newLongDesEN = page.locator("//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Long Description EN')]//following-sibling::li[contains(text(),'New')]//span");
    this.oldLongDesIT = page.locator("//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Long Description IT')]//following-sibling::li[contains(text(),'Old:')]//span");
    this.newLongDesIT = page.locator("//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Long Description IT')]//following-sibling::li[contains(text(),'New')]//span");
    this.oldMedDesEN = page.locator("//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Medium Description EN')]//following-sibling::li[contains(text(),'Old:')]//span");
    this.newMedDesEN = page.locator("//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Medium Description EN')]//following-sibling::li[contains(text(),'New')]//span");
    this.oldMedDesIT = page.locator("//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Medium Description IT')]//following-sibling::li[contains(text(),'Old:')]//span");
    this.newMedDesIT = page.locator("//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Medium Description IT')]//following-sibling::li[contains(text(),'New')]//span");
    this.editShortDesEN = page.locator("(//input[contains(@class, 'ng-touched ng-pristine ng-valid mat-mdc-form-field-input-control mdc-text-field__input cdk-text-field-autofill-monitored')])[4]");
    this.oldShortDesIT = page.locator("//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Short description IT')]//following-sibling::li[contains(text(),'Old:')]//span");
    this.newShortDesIT = page.locator("//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Short description IT')]//following-sibling::li[contains(text(),'New:')]//span");
    this.oldShortDesEN = page.locator("//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Short description EN')]//following-sibling::li[contains(text(),'Old:')]//span");
    this.newShortDesEN = page.locator("//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Short description EN')]//following-sibling::li[contains(text(),'New:')]//span");
    this.featureCodeTextbox = page.locator("//input[@formcontrolname='featureCode']");
    this.format = page.locator("//li[contains(text(),'Code has the right format')]"); 
    this.availability =page.locator("//li[contains(text(),'Code is available')]");
    this.valid=page.locator("//li[contains(text(),'Code is valid')]");
    this.manualCodeInput = page.locator("//*[@id='mat-input-1']"); 
    this.editFeatureLongDescriptionEN = page.locator("(//mat-label[text()='Long description EN']//parent::label//parent::div//parent::div//parent::div)[1]//input");
    this.editFeatureLongDescriptionIT = page.locator("(//mat-label[text()='Long description IT']//parent::label//parent::div//parent::div//parent::div)[1]//input")
    this.longDescriptionEN = page.locator("(//mat-icon[text()='filter_none'])[2]");
    this.editFeatureShortDescriptionEN = page.locator("(//mat-label[text()='Short description EN']//parent::label//parent::div//parent::div//parent::div)[1]//input")
    this.failedToCreateWPC = page.locator("//p[text()='Create WPC family failed']");
    this.failedFeatureAlreadyExists = page.locator("//p[text()='WPC Feature Code already exist']");
    this.nextButton = page.locator("//span[contains(text(),'Next')]//parent::button");
    this.saveBtn = page.locator("//span[contains(text(), 'Save')]//parent::button");
  }
}
