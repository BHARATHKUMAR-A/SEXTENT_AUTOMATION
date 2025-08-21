import { Page, Locator } from '@playwright/test';
import testData_SCL_FF from '../test-data/testData_SCL_FF.json';
import searchTestData_SCL_FF from '../test-data/searchData_SCL_FF.json';


export class FeatureSCLPage {
  createSCLFeature: Locator;
  nextBtn: Locator;
  saveBtn: Locator;
  natureDropdown: Locator;
  natureOptions: Locator;
  languageDropdown: Locator;
  languageOptions: Locator;
  radioSSR: Locator;
  manualCode: Locator;
  searchCode: Locator;
  selectRandomCode: Locator;
  newCodeMsg: Locator;
  radioChecked: Locator;
  classCodeSTV: Locator;
  checkClassCodeSTV: Locator;
  checkFamilyCodeWPC: Locator;
  familyCodeWPC: Locator;
  validateBtn: Locator;
  differentDescriptionConfirmationBox: Locator;
  confirmationBtn: Locator;
  errorMsg: Locator;
  rankingDropdown: Locator;
  rankingOption: Locator;
  rankingOptions: Locator;
  rankingOption123: Locator;
  rankingOption123_2: Locator;
  confidentialRadioBtn: Locator;
  localizedDescriptionEn: Locator;
  explicativeNotes: Locator;
  secondPageNextBtn: Locator;
  systemOption: Locator;
  searchClassCodeSTV: Locator;
  searchFamilyCodeWPC: Locator;
  searchClassCode: Locator;
  advancedSTVSearch: Locator;
  successMessage: Locator;
  transversalDescription: Locator;
  transversalNatureOptions: Locator;
  transversalFeatureFamilyTypeOption: Locator;
  otherDescription: Locator;
  savingWithoutMapping: Locator;
  transversalError: Locator;
  featureValuesTab: Locator;
  featureValuesBtn: Locator;
  createSCLFamilyValue: Locator;
  singleFeatureValueDesc: Locator;
  checkManualCodeIcon: Locator;
  manualCodeInput: Locator;
  secondOption: Locator;
  selectFeatureFamily: Locator;
  singleFeatureValueDescLang: Locator;
  fullShortDesc: Locator;
  fullLongDesc: Locator;
  otherDescXF: Locator;
  otherDescXp: Locator;
  explicativeNote: Locator;
  format: Locator;
  availability: Locator;
  valid: Locator;
  copyDestination: Locator;
  radioBtnOpts: Locator;
  radioBtn: Locator;
  nextButton: Locator;
  inputFamilydescEN: Locator;
  language1: Locator;
  language1Option: Locator;
  otherDesc: Locator;
  addBtn1: Locator;
  salesCodeSTV: Locator;
  featureValueWPC: Locator;
  confirmationBtn2: Locator;
  featureFamily: Locator;
  featureFamilyOption: Locator;
  featureValue: Locator;
  featureValueOption: Locator;
  featureFamilyOption2: Locator;
  featureValue2: Locator;
  otherWPCShortDesc: Locator;
  singleFeatureValueDescription: Locator;
  otherDescShortDesc: Locator;
  fullShortDescription: Locator;
  copyTextSCL: Locator;
  maxLengthError: Locator;
  selectCode: Locator;
  //nirbhay locator
  featureFamilyType: Locator;
  featureFamilyTypeOption: Locator;
  featureFamilyCategories: Locator;
  featureFamilyCategoriesOption: Locator;
  siExplicit: Locator;
  siExplicitOption: Locator;
  siExclusion: Locator;
  siExclusionOption: Locator;
  mandatoryWithStructure: Locator;
  mandatoryWithStructureOption: Locator;
  MandatorywithResponsibility: Locator;
  MandatorywithResponsibilityOption: Locator;

  //edit locator
  editFeatureFamilyCategoryOption: Locator;
  editSiExplicitOption: Locator;
  editSiExclusion: Locator;
  editMandatoryWithStructure: Locator;
  editMandatoryWithResponsible: Locator;
  editFeatureFamilyDropdown: Locator;
  editFeatureFamilyOption: Locator;
  editLocalisedDesc: Locator;
  editRankingOption: Locator;
  editExplicativeNotes: Locator;
  calBtn: Locator;
  calDate: Locator;
  systab: Locator;
  sysoption: Locator;
  familyDescription: Locator;
  languageOpt: Locator;
  saveWoMap: Locator;
  historyIcon: Locator;
  historyModal: Locator;
  newExplicativeNote: Locator;
  oldExplicativeNote: Locator;
  //scl of valorizatoin
  mandatoryOfValorizationDropdown: Locator;
  mandatoryOfValorizationOption: Locator;
  SingleButton: Locator;
  structureDropdown: Locator;
  structureDropdownOptions: Locator;
  arrowDown: Locator;
  advanceDropdownSearch: Locator;

  searchBtn: Locator;
  data: Locator;
  featureValueVisibility: Locator;
  toggleButton: Locator;

  morecolumn: Locator;
  morecolumnOption: Locator;
  columnAvailable: Locator;
  visibilitybutton: Locator;
  prohibitedDate: Locator;
  mandatoryWithResponsibilityOption: Locator;
  mandatoryWithResponsibility: Locator;
  systemDropdown: Locator;
  historyBlock: Locator;
  rankingHistory: Locator;
  oldRankingText: Locator;
  newRankingText: Locator;
  siexplicitHistory: Locator;
  oldSiExplicitText: Locator;
  newSiExplicitText: Locator;
  descHistory: Locator;
  oldDescText: Locator;
  newDescText: Locator;
  mandWithRespHistory: Locator;
  oldMandWithRespText: Locator;
  newMandWithRespText: Locator;
  mandWithStructHistory: Locator;
  oldMandWithStructText: Locator;
  newMandWithStructText: Locator;
  explicativeNoteHistory: Locator;
  oldExplicativeNoteText: Locator;
  newExplicativeNoteText: Locator;
  categoryHistory: Locator;
  oldCategoryText: Locator;
  newCategoryText: Locator;
  siExclusionHistory: Locator;
  oldSiExclusionText: Locator;
  newSiExclusionText: Locator;
  featureFamilyTypeHistory: Locator;
  oldFeatureFamilyTypeText: Locator;
  newFeatureFamilyTypeText: Locator;
  closeHistoryIcon: Locator;
  saveButton: Locator;
  historyIcon1: Locator;
  fullLongDescHis: Locator;
  oldOfullLongDescHis: Locator;
  newfullLongDescHis: Locator;

  fullShortDescHis: Locator;
  newfullShortDescHis: Locator;
  oldfullShortDescHis: Locator;

  SingleFeatureDescHis: Locator;
  newSingleFeatureDescHis: Locator;
  oldSingleFeatureDescHis: Locator;

  OtherDescHis: Locator;
  oldOtherDescHis: Locator;
  newOtherDescHis: Locator;

  ExplicativeDescHis: Locator;

  sclSpecificCriteria: Locator;
  mappingRadioButton: Locator;
  mappingArrowIcon: Locator;
  otherDescShortXF:Locator;


  constructor(page: Page) {

    //SCL Feature Family
    this.createSCLFeature = page.locator("//span[text()='Create SCL feature family']");
    this.nextBtn = page.locator("(//span[contains(text(),'Next')]//parent::button)[1]");
    this.saveBtn = page.locator("//span[contains(text(), 'Save')]//parent::button");
    this.natureDropdown = page.locator("//mat-select[@formcontrolname='natureCtrl']");
    this.natureOptions = page.locator(`(//mat-option/span[contains(text(),'${testData_SCL_FF.testData.nature}')])[1]`);
    // this.featureFamilyType = page.locator("//mat-select[@formcontrolname='featureFamilyType']");
    // this.featureFamilyTypeOption = page.locator(`//*[@id='mat-select-0-panel']//mat-option//span[contains(text(),'${testData_SCL_FF.testData.feature_option}')]`)
    this.languageDropdown = page.locator("//mat-select[@formcontrolname='languageCtrl']");
    this.languageOptions = page.locator(`(//mat-option//span[contains(text(),'${testData_SCL_FF.testData.language}')])[1]`);
    this.radioChecked = page.locator("//mat-radio-group[@formcontrolname='interestCodeCtrl']//mat-radio-button[contains(@class,'mat-mdc-radio-checked')]");
    this.radioSSR = page.locator(`(//label[text()='${testData_SCL_FF.testData.specific_sales_range}']//parent::div//input)[1]`);
    this.manualCode = page.locator("(//button[@class='mdc-switch mdc-switch--selected mdc-switch--checked'])[1]");
    this.searchCode = page.locator("(//mat-icon[text()='search'])[1]");
    this.selectRandomCode = page.locator(`//div[@class='code-suggestion-table']//table//tr[2]//td[12]`);
    this.newCodeMsg = page.locator("//div[contains(text(),'For codes with 3 characters or less')]");
    this.classCodeSTV = page.locator("//input[@formcontrolname='classCodeField']");
    this.checkClassCodeSTV = page.locator("//div[@class='box-title colorOrange']//following-sibling::div//mat-icon[text()='check_circle_outline']");
    this.searchClassCodeSTV = page.locator("//div[@class='box-title colorOrange']//following-sibling::div//mat-icon[text()='search']");
    this.checkFamilyCodeWPC = page.locator("//div[@class='box-title colorGreen']//following-sibling::div//mat-icon[text()='check_circle_outline']");
    this.searchFamilyCodeWPC = page.locator("//div[@class='box-title colorGreen']//following-sibling::div//mat-icon[text()='search']");
    this.familyCodeWPC = page.locator("//input[@formcontrolname='familyCodeField']");
    this.validateBtn = page.locator("//span[text()='Validate']//parent::button");
    this.differentDescriptionConfirmationBox = page.locator("//div[@class='confirmation-dialog app-colored-bg1 stellar-theme']");
    this.confirmationBtn = page.locator("//span[contains(text(),'CONFIRMATION')]//parent::button");
    this.errorMsg = page.locator("//*[@id='mat-snack-bar-container-live-0']/div/app-toast/div/div[2]/p");
    this.rankingDropdown = page.locator(" //mat-label[text()='Ranking']//parent::label//parent::div//parent::div//parent::div//following-sibling::mat-select//div//div//following-sibling::div//div");
    this.rankingOption = page.locator(`(//span[contains(text(),'${testData_SCL_FF.testData.ranking}')])[1]`);
    this.rankingOption123 = page.locator("(//span[text()=' 123 '])[1]");
    this.rankingOption123_2 = page.locator("(//span[text()=' 123 '])[2]");
    this.confidentialRadioBtn = page.locator(`//span[contains(text(),'Confidential*')]//parent::mat-radio-group//mat-radio-button//div//label[contains(text(),'${testData_SCL_FF.testData.confidentialRadio}')]//preceding-sibling::div//input`);
    this.localizedDescriptionEn = page.locator("(//mat-label[text()='Localized description EN']//parent::label//parent::div//parent::div//parent::div)[1]//input");
    this.explicativeNotes = page.locator("//mat-label[text()='Explicative notes - EN']");
    this.secondPageNextBtn = page.locator("(//span[contains(text(),'Next')]//parent::button)[2]");
    this.searchClassCode = page.locator("//mat-chip-grid[@formcontrolname='classCodeField']//input");
    this.advancedSTVSearch = page.locator("//div[@class='twoColumn']//following-sibling::div//mat-icon[contains(text(),'search')]");
    this.successMessage = page.locator("//h4[contains(text(),'SUCCESS')]");
    this.transversalDescription = page.locator("//button[@role='switch']//following-sibling::label[contains(text(),'Transversal description')]");
    this.transversalNatureOptions = page.locator(`(//mat-option/span[contains(text(),'${testData_SCL_FF.transversalData.nature}')])[1]`);
    this.transversalFeatureFamilyTypeOption = page.locator(`(//span[contains(text(),'${testData_SCL_FF.transversalData.featureFamilyType}')])[1]`);
    this.otherDescription = page.locator("//mat-label[contains(text(),'Other description')]");
    this.savingWithoutMapping = page.locator("//button//span[text()='Save without mapping']");
    this.transversalError = page.locator(`//p[text()='Transversal Description must be set to No for Family Type “W” or “G” ']`);
    this.featureValuesTab = page.locator("//span[text()='Feature values']");
    this.featureValuesBtn = page.locator("//button//span[text()='Feature values']");
    this.featureFamily = page.locator("//mat-label[text()='Feature Family']");
    this.featureFamilyOption = page.locator(`(//span[contains(text(),'${testData_SCL_FF.transversalData.featureFamily}')])[1]`);
    this.featureValue = page.locator("//mat-label[text()='Feature Value']");
    this.featureValueOption = page.locator(`(//span[contains(text(),'${testData_SCL_FF.transversalData.featueValue}')])[1]`);
    this.featureFamilyOption2 = page.locator(`(//span[contains(text(),'${testData_SCL_FF.transversalData.featureFamily2}')])[1]`);
    this.featureValue2 = page.locator("(//mat-label[text()='Feature Value'])[2]");
   
    this.otherWPCShortDesc = page.locator("//mat-label[contains(text(),'Other description  - WPC Short Description  - EN')]");
   
   
    this.singleFeatureValueDescription = page.locator("//mat-label[text()='Single feature value description EN']//parent::label//parent::div//parent::div//parent::div//following-sibling::div//input");
    this.otherDescShortDesc = page.locator("//mat-label[text()=' Other description  - xP Short Description  - EN']//parent::label//parent::div//parent::div//parent::div//following-sibling::div//input");
    this.otherDescShortXF = page.locator("//mat-label[text()=' Other description  - XF Short Description  - EN']//parent::label//parent::div//parent::div//parent::div//following-sibling::div//input");
    this.fullShortDescription = page.locator("//mat-label[text()='Full short description EN']//parent::label//parent::div//parent::div//parent::div//following-sibling::div//input");
    this.copyTextSCL = page.locator("//mat-icon[text()='filter_none']");
    this.maxLengthError = page.locator("//mat-error[contains(text(),'Max length for this field')]");
    this.prohibitedDate = page.locator("//input[contains(@data-mat-calendar,'mat-datepicker')]");
    this.mandatoryWithResponsibilityOption = page.locator(`(//mat-option//span[contains(text(),'${testData_SCL_FF.testData.Mandatory_with_Responsibility}')])[1]`);
    this.mandatoryWithStructureOption = page.locator(`(//mat-option//span[contains(text(),'${testData_SCL_FF.testData.Mandatory_With_Structure}')])[1]`);
    this.systemDropdown = page.locator("//mat-select[@formcontrolname='selectSystem']");
    this.selectCode = page.locator("//input[@aria-label='select code']");
    this.fullLongDescHis = page.locator("//p[contains(text(),' Full Long description EN  ')]");
    this.oldOfullLongDescHis = page.locator("//table//tbody//tr[*]//td[3]//ul/p[contains(text(),' Full Long description EN  ' )]//following-sibling::li[contains(text(),'Old:')]//span"); //new1
    this.newfullLongDescHis = page.locator("//table//tbody//tr[*]//td[3]//ul/p[contains(text(),' Full Long description EN  ' )]//following-sibling::li[contains(text(),'New:')]//span"); //new1

    this.fullShortDescHis = page.locator("//p[contains(text(),' Full Short description EN  ')]");
    this.oldfullShortDescHis = page.locator("//table//tbody//tr[*]//td[3]//ul/p[contains(text(),' Full Short description EN  ' )]//following-sibling::li[contains(text(),'Old:')]//span"); //new1
    this.newfullShortDescHis = page.locator("//table//tbody//tr[*]//td[3]//ul/p[contains(text(),' Full Short description EN  ' )]//following-sibling::li[contains(text(),'New:')]//span"); //new1

    this.SingleFeatureDescHis = page.locator("//p[contains(text(),' Single feature description EN  ')]");
    this.oldSingleFeatureDescHis = page.locator("//table//tbody//tr[*]//td[3]//ul/p[contains(text(),' Single feature description EN  ' )]//following-sibling::li[contains(text(),'Old:')]//span"); //new1
    this.newSingleFeatureDescHis = page.locator("//table//tbody//tr[*]//td[3]//ul/p[contains(text(),' Single feature description EN  ' )]//following-sibling::li[contains(text(),'New:')]//span"); //new1

    this.OtherDescHis = page.locator("//p[contains(text(),' Other Description SXP EN  ')]");
    this.oldOtherDescHis = page.locator("//table//tbody//tr[*]//td[3]//ul/p[contains(text(),' Other Description SXP EN  ' )]//following-sibling::li[contains(text(),'Old:')]//span"); //new1
    this.newOtherDescHis = page.locator("//table//tbody//tr[*]//td[3]//ul/p[contains(text(),' Other Description SXP EN  ' )]//following-sibling::li[contains(text(),'New:')]//span"); //new1

    this.ExplicativeDescHis = page.locator("//p[contains(text(),' Explicative note EN  ')]");
    this.oldExplicativeNote = page.locator("//table//tbody//tr[*]//td[3]//ul/p[contains(text(),' Explicative note EN  ' )]//following-sibling::li[contains(text(),'Old:')]//span"); //new1
    this.newExplicativeNote = page.locator("//table//tbody//tr[*]//td[3]//ul/p[contains(text(),' Explicative note EN  ' )]//following-sibling::li[contains(text(),'New:')]//span"); //new1
    // this.language1 = page.locator("//mat-panel-title[text()=' Single feature value description ']//parent::span//parent::mat-expansion-panel-header//following-sibling::div//form//div[@class='select-lang other-description']/mat-form-field/div/div/div/div/following-sibling::div/label/mat-label[contains(text(),'Language')]")
    // this.languageOpt = page.locator("//div[@id='mat-select-0-panel']//mat-option//span//span[text()='DE']");

    //nirbhay locator
    this.featureFamilyType = page.locator("//mat-select[@formcontrolname='featureFamilyType']");
    this.featureFamilyTypeOption = page.locator(`(//mat-option/span[contains(text(),'${testData_SCL_FF.testData.feature_family_type}')])[1]`);
    this.editFeatureFamilyDropdown = page.locator("//mat-label[text()='Feature family type']");
    this.editFeatureFamilyOption = page.locator(`(//mat-option/span[contains(text(),'${testData_SCL_FF.editTestData.feature_family_type}')])[1]`);
    this.featureFamilyCategories = page.locator("//mat-label[text()='Feature Family Categories']");
    this.featureFamilyCategoriesOption = page.locator(`(//mat-option//span[contains(text(),'${testData_SCL_FF.testData.feature_family_categories}')])[1]`);
    this.editFeatureFamilyCategoryOption = page.locator(`(//mat-option//span[contains(text(),'${testData_SCL_FF.editTestData.feature_family_categories}')])[1]`);
    this.siExplicit = page.locator("//mat-label[text()='Si Explicit']");
    this.siExplicitOption = page.locator(`(//mat-option//span[contains(text(),'${testData_SCL_FF.testData.Si_Explicit}')])[1]`);
    this.editSiExplicitOption = page.locator(`(//mat-option//span[contains(text(),'${testData_SCL_FF.editTestData.Si_Explicit}')])[1]`);
    this.siExclusion = page.locator("//mat-label[text()='Si Exclusion']");
    this.siExclusionOption = page.locator(`(//mat-option//span[contains(text(),'${testData_SCL_FF.testData.Si_Exclusion}')])[1]`);
    this.editSiExclusion = page.locator(`(//mat-option//span[contains(text(),'${testData_SCL_FF.editTestData.Si_Exclusion}')])[1]`);
    this.mandatoryWithStructure = page.locator("//mat-label[text()='Mandatory with Structure']");
    this.mandatoryWithStructureOption = page.locator(`(//mat-option//span[contains(text(),'${testData_SCL_FF.testData.Mandatory_With_Structure}')])[1]`)
    this.editMandatoryWithStructure = page.locator(`(//mat-option//span[contains(text(),'${testData_SCL_FF.editTestData.Mandatory_With_Structure}')])[1]`)
    this.mandatoryWithResponsibility = page.locator("//mat-label[text()='Mandatory with Responsibility']//parent::label//parent::div//parent::div//parent::div//following-sibling::mat-select//div//div//following-sibling::div//div");

    this.MandatorywithResponsibility = page.locator("//mat-label[text()='Mandatory with Responsibility']");
    this.MandatorywithResponsibilityOption = page.locator(`(//mat-option//span[contains(text(),'${testData_SCL_FF.testData.Mandatory_with_Responsibility}')])[1]`);
    this.editMandatoryWithResponsible = page.locator(`(//mat-option//span[contains(text(),'${testData_SCL_FF.editTestData.Mandatory_with_Responsibility}')])[1]`);
    this.editRankingOption = page.locator(`(//span[contains(text(),'${testData_SCL_FF.editTestData.ranking}')])[1]`);
    this.editLocalisedDesc = page.locator("(//mat-label[text()='Localized description EN']//parent::label//parent::div//parent::div//parent::div)[1]//input");
    this.editExplicativeNotes = page.locator("//mat-label[text()='Explicative notes - EN']");
    this.createSCLFamilyValue = page.locator("//span[contains(text(), 'Create SCL feature value')]");
    this.selectFeatureFamily = page.locator("(//mat-label[contains(text(),'Select Feature Family')])");
    this.secondOption = page.locator("//mat-option[1]");
    this.manualCodeInput = page.locator("//input[@formcontrolname='featureValue']");
    this.checkManualCodeIcon = page.locator("//mat-icon[text()='check_circle_outline']").first();
    this.singleFeatureValueDesc = page.locator("//mat-label[contains(text(),'Single feature value description EN')]")
    this.singleFeatureValueDescLang = page.locator(`(//mat-label[text()='Single feature value description ${testData_SCL_FF.testData.language1Option}'])`)
    this.fullShortDesc = page.locator("//mat-label[contains(text(),'Full short description EN')]")
    this.fullLongDesc = page.locator("//mat-label[contains(text(),'Full long description EN')]")
    this.otherDescXF = page.locator("//mat-label[contains(text(),' Other description  - XF Short Description  - EN')]")
    this.otherDescXp = page.locator("//mat-label[contains(text(),' Other description  - xP Short Description  - EN')]")
    this.explicativeNote = page.locator("//mat-label[contains(text(),'Explicative note - EN')]")
    this.format = page.locator("//li[contains(text(),'Code has the right format')]");
    this.availability = page.locator("//li[contains(text(),'Code is available')]");
    this.valid = page.locator("//li[contains(text(),'Code is valid')]");
    this.copyDestination = page.locator("//mat-icon[contains(text(),'filter_none')]");
    this.radioBtnOpts = page.locator("//div[contains(@class,'field-section-inner')]//mat-radio-group[contains(@class,'mat-mdc-radio-group')]");//new1
    this.radioBtn = page.locator(`(//label[text()='${testData_SCL_FF.testData.confidential}']//parent::div//input)[1]`);
    this.nextButton = page.locator("//span[text()='Next']")
    this.successMessage = page.locator("//h4[contains(text(),'SUCCESS')]")
    this.inputFamilydescEN = page.locator("//div//div//div//mat-form-field[3]//div//div[2]//input")
    this.language1 = page.locator("//mat-panel-title[text()=' Single feature value description ']//parent::span//parent::mat-expansion-panel-header//following-sibling::div//form//div[@class='select-lang other-description']/mat-form-field/div/div/div/div/following-sibling::div/label/mat-label[contains(text(),'Language')]")
    this.language1Option = page.locator(`(//div[@role="listbox"]//mat-option//span//span[text()='${testData_SCL_FF.testData.language1Option}'])`)
    this.otherDesc = page.locator("//mat-label[contains(text(),'System')]")
    this.systemOption = page.locator(`(//div[@role="listbox"]//mat-option//span//span[text()= '${testData_SCL_FF.testData.systemOption}'])`)
    this.addBtn1 = page.locator("//mat-icon[text()='add']").first()
    this.salesCodeSTV = page.locator("//input[@formcontrolname='stvField']")
    this.featureValueWPC = page.locator("//input[@formcontrolname='wpcField']")
    this.confirmationBtn2 = page.locator("//div[@class='confirmation-dialog app-colored-bg1 stellar-theme']//div[2]//button[2]").last()
    this.calBtn = page.locator("(//button//span[@class='mat-mdc-button-touch-target'])[10]"); //new1

    this.calDate = page.locator("(//button//span[@class='mat-calendar-body-cell-content mat-focus-indicator'])[10]"); //new1

    this.systab = page.locator("//mat-form-field//mat-label[contains(text(),' System ')]"); //new1
    this.sysoption = page.locator(`(//div[@id='mat-select-4-panel']//mat-option//span//span[text()= '${testData_SCL_FF.testData1.systemOption}'])`); //new1

    this.familyDescription = page.locator("//input[@formcontrolname='familyDescEn']"); //new1

    this.languageOpt = page.locator("//div[@id='mat-select-0-panel']//mat-option//span//span[text()='DE']"); //new1
    this.saveWoMap = page.locator("//span[text()= 'Save without mapping']") //new1

    this.historyIcon = page.locator("//mat-icon[@data-mat-icon-name='history']"); //new1
    this.historyModal = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]"); //new1
    this.oldExplicativeNote = page.locator("//table//tbody//tr[*]//td[3]//ul/p[contains(text(),' Explicative note EN  ' )]//following-sibling::li[contains(text(),'Old:')]//span"); //new1
    this.newExplicativeNote = page.locator("//table//tbody//tr[*]//td[3]//ul/p[contains(text(),' Explicative note EN  ' )]//following-sibling::li[contains(text(),'New:')]//span"); //new1


    //scl value of valorization
    this.mandatoryOfValorizationDropdown = page.locator("//mat-label[text()=' Mandatory for Valorization ']//parent::label");
    this.mandatoryOfValorizationOption = page.locator(`(//mat-option/span[contains(text(),'${searchTestData_SCL_FF.testData.mandatoryByValorization}')])[1]`);
    this.SingleButton = page.locator("//label[normalize-space()='Single']");
    this.structureDropdown = page.locator("//mat-select[@formcontrolname='structures']");
    this.structureDropdownOptions = page.locator(`(//mat-option/span[contains(text(),'${searchTestData_SCL_FF.testData.structure}')])[1]`);
    this.arrowDown = page.locator("//button[@class='arrow ng-star-inserted']");
    this.advanceDropdownSearch = page.locator("//mat-panel-title[.=' SCL specific criteria ']");

    this.searchBtn = page.locator("//body[1]/app-root[1]/div[1]/app-sidenav[1]/mat-sidenav-container[1]/mat-sidenav-content[1]/main[1]/app-search-with-filters[1]/div[1]/form[1]/div[1]/div[1]/div[3]/button[1]");
    this.data = page.locator("(//mat-row[@id='undefined'])[2]");
    this.featureValueVisibility = page.locator("//div[text()='Feature Value Code']");
    this.toggleButton = page.locator("//*[@id='mat-mdc-slide-toggle-1-button']");

    this.morecolumn = page.locator("//mat-icon[normalize-space()='more_vert']");

    this.columnAvailable = page.locator("//mat-header-cell[contains(.,'')]");
    this.morecolumnOption = page.locator("//div[@style='touch-action: none; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; user-select: none;']");
    this.visibilitybutton = page.locator("//button[contains(.,'visibility')][1]");

    this.historyBlock = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]");
    this.rankingHistory = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Ranking description')]");
    this.oldRankingText = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Ranking description')]//following-sibling::li[contains(text(),'Old:')]//span");
    this.newRankingText = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Ranking description')]//following-sibling::li[contains(text(),'New:')]//span");
    this.siexplicitHistory = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Si Explicit')]");
    this.oldSiExplicitText = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Si Explicit')]//following-sibling::li[contains(text(),'Old:')]//span");
    this.newSiExplicitText = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Si Explicit')]//following-sibling::li[contains(text(),'New:')]//span");
    this.descHistory = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Description EN')]");
    this.oldDescText = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Description EN')]//following-sibling::li[contains(text(),'Old:')]//span");
    this.newDescText = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Description EN')]//following-sibling::li[contains(text(),'New:')]//span");
    this.mandWithRespHistory = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Mandatory With Responsibility')]");
    this.oldMandWithRespText = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Mandatory With Responsibility')]//following-sibling::li[contains(text(),'Old:')]//span");
    this.newMandWithRespText = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Mandatory With Responsibility')]//following-sibling::li[contains(text(),'New:')]//span");
    this.mandWithStructHistory = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Mandatory With Structure')]");
    this.oldMandWithStructText = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Mandatory With Structure')]//following-sibling::li[contains(text(),'Old:')]//span");
    this.newMandWithStructText = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Mandatory With Structure')]//following-sibling::li[contains(text(),'New:')]//span");
    this.explicativeNoteHistory = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Explicative note EN')]");
    this.oldExplicativeNoteText = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Explicative note EN')]//following-sibling::li[contains(text(),'Old:')]//span");
    this.newExplicativeNoteText = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Explicative note EN')]//following-sibling::li[contains(text(),'New:')]//span");
    this.categoryHistory = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Category')]");
    this.oldCategoryText = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Category')]//following-sibling::li[contains(text(),'Old:')]//span");
    this.newCategoryText = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Category')]//following-sibling::li[contains(text(),'New:')]//span");
    this.siExclusionHistory = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Si Exclusion')]");
    this.oldSiExclusionText = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Si Exclusion')]//following-sibling::li[contains(text(),'Old:')]//span");
    this.newSiExclusionText = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Si Exclusion')]//following-sibling::li[contains(text(),'New:')]//span");
    this.featureFamilyTypeHistory = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Feature family type description')]");
    this.oldFeatureFamilyTypeText = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Feature family type description')]//following-sibling::li[contains(text(),'Old:')]//span");
    this.newFeatureFamilyTypeText = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Feature family type description')]//following-sibling::li[contains(text(),'New:')]//span");
    this.closeHistoryIcon = page.locator("//span[contains(text(), 'CLOSE')]");
    this.saveButton = page.locator("//span[text()='Save']");
    this.historyIcon1 = page.locator("//mat-icon[text()='history']");
    this.sclSpecificCriteria = page.locator("//mat-panel-title[text()=' SCL specific criteria ']//parent::span//following-sibling::span");
    this.mappingRadioButton=page.locator("//input[@value='MAPPING']");
    this.mappingArrowIcon=page.locator("//mat-icon[text()='keyboard_arrow_down']");
  }
}
