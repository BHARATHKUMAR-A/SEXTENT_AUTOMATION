import { Page, Locator } from '@playwright/test';
import testData_STV_FF from '../test-data/testData_STV_FF.json';

export class FeatureSTVPage {
  createWPCFeature: Locator;
  createSTVClassCode: Locator;
  manualCode: Locator;
  searchCode: Locator;
  selectRandomCode: Locator;
  errorMessage: Locator;
  nextButton_WPC: Locator;
  descriptionControl: Locator;
  typology: Locator;
  typologyOptions: Locator;
  category: Locator;
  categoryOptions: Locator;
  itemType: Locator;
  itemTypeOption: Locator;
  responsibleGroup: Locator;
  responsibleGroupOption: Locator;
  vpm: Locator;
  vpmOption: Locator;
  explicativeNote : Locator;
  save : Locator;
  confirmation : Locator;
  successMessage : Locator;
  createSTVSalesCode : Locator;
  salesCode : Locator;
  firstSalesCode : Locator;
  salesCodeDescription : Locator;
  application : Locator;
  applicationOption : Locator;
  validateBtn : Locator;

  //edit
  manualCodeTextbox : Locator;
  checkManualCodeIcon : Locator;
  manualCodeMessage : Locator;
  format : Locator;
  availability : Locator;
  valid : Locator;
  nextButton : Locator;
  editTypologyOption : Locator;
  editCategoryOption : Locator;
  editItemTypeOption : Locator;
  editResponsibleGroupOption : Locator;
  editVpmOption : Locator;
  historyBlock : Locator;
  closeHistory : Locator;
  itemHistory : Locator;
  oldItemHistory : Locator;
  newItemHistory : Locator;
  descHistory: Locator;
  oldDescHistory : Locator;
  newDescHistory : Locator;
  cateHistory : Locator;
  oldCateHistory : Locator;
  newcateHistory : Locator;
  stdHistory : Locator;
  oldStdHistory : Locator;
  newStdHistory : Locator;
  expNoteHistory : Locator;
  oldExpNoteHistory : Locator;
  newExpNoteHistory : Locator;
  respHistory : Locator;
  oldRespHistory : Locator;
  newRespHistory : Locator;
  typoHistory: Locator;
  oldTypoHistory: Locator;
  newTypoHistory : Locator;
  historyIcon : Locator;
  manualCodeInput : Locator;
  salesCodeDescriptionInput : Locator;
  editapplicationOption : Locator;
  historyModal : Locator;
  closeHistoryModal : Locator;
  description : Locator;
  oldDescription :Locator;
  newDescription : Locator;
  appDesc : Locator;
  oldAppDesc : Locator;
  newAppDesc : Locator;
  ExplicativeNote:Locator;
  oldExplicativeNote : Locator;
  newExplicativeNote : Locator;
  saveBtn : Locator;
  validateButton : Locator;
  salesCodeSTV : Locator;
  firstOption : Locator;
  salesCode_STV : Locator;

  constructor(page: Page) {
    //STV class code
    this.createWPCFeature = page.locator("//span[contains(text(), 'Create WPC feature')]");
    this.createSTVClassCode = page.locator("//span[contains(text(), 'Create STV class code')]");
    this.manualCode = page.locator("(//button[@class='mdc-switch mdc-switch--selected mdc-switch--checked'])[1]");
    this.searchCode = page.locator("//mat-icon[text()='search']");
    this.selectRandomCode = page.locator(`//div[@class='code-suggestion-table']//table//tr[2]//td[12]`);
    this.errorMessage = page.locator("//h4[contains(text(),'ERROR')]");
    this.nextButton_WPC = page.locator("//button//span/following-sibling::span[contains(text(),'Next')]");
    this.descriptionControl = page.locator("//input[@formcontrolname='descriptionControl']");
    this.typology = page.locator("//mat-select[@formcontrolname='typologyControl']");
    this.category = page.locator("//mat-select[@formcontrolname='categoryControl']");
    this.typologyOptions = page.locator(`//span[contains(text(),'${testData_STV_FF.testData.typology} ')]`);
    this.categoryOptions = page.locator(`//span[contains(text(),'${testData_STV_FF.testData.category} ')]`);
    this.itemType = page.locator("//mat-label[text()='Item Type']");   
    this.itemTypeOption = page.locator(`//span[contains(text(),'${testData_STV_FF.testData.itemType} ')]`);
    this.responsibleGroup = page.locator("//mat-label[text()='Responsible Group']");
    this.responsibleGroupOption = page.locator(`//span[contains(text(),'${testData_STV_FF.testData.responsibleGroup} ')]`);
    this.vpm = page.locator("//mat-label[text()='VPM']");   
    this.vpmOption = page.locator(`//span[contains(text(),'${testData_STV_FF.testData.vpm} ')]`);
    this.explicativeNote = page.locator("//mat-label[text()='Explicative note - EN']");  
    this.save = page.locator("//span[contains(text(), 'Save')]");
    this.confirmation = page.locator("//span[text()=' CONFIRMATION ']");
    this.successMessage = page.locator("//h4[contains(text(),'SUCCESS')]");
    this.saveBtn = page.locator("//span[contains(text(), 'Save')]//parent::button");
    this.validateButton = page.locator("//span[contains(text(),'Validate')]//parent::button");

    //STV sales code
    this.createSTVSalesCode = page.locator("//span[text()='Create STV sales code']");
    this.salesCode = page.locator("(//mat-label[contains(text(),'STV Class Code')])[1]");
    this.firstSalesCode = page.locator("//mat-option[1]");
    this.salesCodeDescription = page.locator("//mat-label[contains(text(),'Sales code description')]");
    this.application = page.locator("//mat-select[@formcontrolname='applicationControl']");
    this.applicationOption = page.locator(`//span[contains(text(),'${testData_STV_FF.testData.application} ')]`);
    this.validateBtn = page.locator("//span[contains(text(),'Validate')]");
    this.salesCodeSTV=page.locator("//input[@formcontrolname='stvField']")
    this.firstOption = page.locator("//mat-option[1]");
    this.salesCode_STV = page.locator("//input[@aria-label='select code']");
 

    //edit
    this.manualCodeTextbox = page.locator("//input[@formcontrolname='manuelClassCodeCtrl']");
    this.checkManualCodeIcon = page.locator("//mat-icon[text()='check_circle_outline']");
    this.manualCodeMessage = page.locator("//li[starts-with(text(), 'Code')]").first();
    this.format = page.locator("//li[contains(text(),'Code has the right format')]"); //new1
    this.availability = page.locator("//li[contains(text(),'Code is available')]");//new1
    this.valid = page.locator("//li[contains(text(),'Code is valid')]");//new1
    this.nextButton = page.locator("//button[@type='submit']");
    this.editTypologyOption = page.locator(`//span[contains(text(),'${testData_STV_FF.editTestData.typology} ')]`);
    this.editCategoryOption = page.locator(`//span[contains(text(),'${testData_STV_FF.editTestData.category} ')]`);
    this.editItemTypeOption = page.locator(`//span[contains(text(),'${testData_STV_FF.editTestData.itemType} ')]`);
    this.editResponsibleGroupOption = page.locator(`//span[contains(text(),'${testData_STV_FF.editTestData.responsibleGroup} ')]`);
    this.editVpmOption = page.locator(`//span[contains(text(),'${testData_STV_FF.editTestData.vpm} ')]`);
    this.historyIcon = page.locator("//mat-icon[@data-mat-icon-name='history']");
    this.historyBlock = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]");
    this.itemHistory = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Item Type description')]");
    this.oldItemHistory = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Item Type description')]//following-sibling::li[contains(text(),'Old:')]//span");
    this.newItemHistory = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Item Type description')]//following-sibling::li[contains(text(),'New:')]//span");
    this.descHistory = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Description')]");
    this.oldDescHistory = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Description')]//following-sibling::li[contains(text(),'Old:')]//span");
    this.newDescHistory = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Description')]//following-sibling::li[contains(text(),'New:')]//span");
    this.cateHistory = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Category Stv')]");
    this.oldCateHistory = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Category Stv')]//following-sibling::li[contains(text(),'Old:')]//span");
    this.newcateHistory = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Category Stv')]//following-sibling::li[contains(text(),'New:')]//span");
    this.stdHistory = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Std Required')]");
    this.oldStdHistory = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Std Required')]//following-sibling::li[contains(text(),'Old:')]//span");
    this.newStdHistory = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Std Required')]//following-sibling::li[contains(text(),'New:')]//span");
    this.expNoteHistory = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Explicative note EN')]");
    this.oldExpNoteHistory = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Explicative note EN')]//following-sibling::li[contains(text(),'Old:')]//span");
    this.newExpNoteHistory = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Explicative note EN')]//following-sibling::li[contains(text(),'New:')]//span");
    this.respHistory = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Responsible Group description')]");
    this.oldRespHistory = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Responsible Group description')]//following-sibling::li[contains(text(),'Old:')]//span");
    this.newRespHistory = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Responsible Group description')]//following-sibling::li[contains(text(),'New:')]//span");
    this.typoHistory = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Typology Stv description')]");
    this.oldTypoHistory = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Typology Stv description')]//following-sibling::li[contains(text(),'Old:')]//span");
    this.newTypoHistory = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Typology Stv description')]//following-sibling::li[contains(text(),'New:')]//span");
    this.closeHistory = page.locator("//span[contains(text(), 'CLOSE')]");
    this.manualCodeInput = page.locator("//input[@formcontrolname='salesCode']"); //new1
    this.salesCodeDescriptionInput = page.locator("//input[@formcontrolname='descriptionControl']");//new1
    this.editapplicationOption = page.locator(`//span[contains(text(),'${testData_STV_FF.editTestData.editapplicationDescription} ')]`);
    this.historyModal = page.locator("//div[contains(@class, 'history-dialog') and contains(@class, 'history-dialog-main')]"); //new1
    this.closeHistoryModal = page.locator("//button//span[text()='CLOSE']");//new1
    this.description = page.locator("//table//tbody//tr[*]//td[3]//ul/p[contains(text(),'Description' )] ");//new1
    this.oldDescription = page.locator("//table//tbody//tr[*]//td[3]//ul/p[contains(text(),'Description' )]//following-sibling::li[contains(text(),'Old:')]//span"); //new1
    this.newDescription = page.locator("//table//tbody//tr[*]//td[3]//ul/p[contains(text(),'Description' )]//following-sibling::li[contains(text(),'New:')]//span"); //new1
    this.appDesc = page.locator("//table//tbody//tr[*]//td[3]//ul/p[contains(text(),' Application description' )]");//new1
    this.oldAppDesc = page.locator("//table//tbody//tr[*]//td[3]//ul/p[contains(text(),'Application description' )]//following-sibling::li[contains(text(),'Old:')]//span"); //new1
    this.newAppDesc = page.locator("//table//tbody//tr[*]//td[3]//ul/p[contains(text(),'Application description' )]//following-sibling::li[contains(text(),'New:')]//span"); //new1
    this.ExplicativeNote = page.locator("//table//tbody//tr[*]//td[3]//ul/p[contains(text(),'Explicative note EN' )]");//new1
    this.oldExplicativeNote = page.locator("//table//tbody//tr[*]//td[3]//ul/p[contains(text(),' Explicative note EN  ' )]//following-sibling::li[contains(text(),'Old:')]//span"); //new1
    this.newExplicativeNote = page.locator("//table//tbody//tr[*]//td[3]//ul/p[contains(text(),' Explicative note EN  ' )]//following-sibling::li[contains(text(),'New:')]//span"); //new1
    
  }
}
