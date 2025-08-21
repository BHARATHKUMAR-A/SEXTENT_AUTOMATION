import { Page, Locator } from '@playwright/test';
import testData_SCL_FF from '../test-data/testData_SCL_FF.json';
import { LoadHookContext } from 'module';
import { FeatureSCLSteps } from '../steps/featureSCLSteps';
import { time } from 'console';

export class FeatureTransverseSearchPage {


  transversalModelInput: Locator;
  searchIcon: Locator;
  searchTable: Locator;
  historyIcon: Locator;
  historyClose: Locator;
  deleteIcon: Locator;
  singleFeatureValueDes: Locator;
  fullShortDesc: Locator;
  otherDesc: Locator;
  fullLongDescOld: Locator;
  fullLongDescNew: Locator;
  singleFeatureDescOld: Locator;
  singleFeatureDescNew: Locator;
  otherDescOld: Locator;
  otherDescNew: Locator;
  fullShortDescOld: Locator;
  fullShortDescNew: Locator;
  editedUser: Locator;
  editedDate: Locator;
  alreadyExistDesc: Locator;
  errorPopup: Locator;
  successMessage: Locator;
  otherDescNewEdit: Locator;
  fullLongDescOldEdit: Locator;
  fullLongDescNewEdit: Locator;
  fullShortDescNewEdit: Locator;
  singleFeatureDescNewEdit: Locator;
  singleFeatureDescOldEdit: Locator;
  otherDescOldEdit: Locator;
  fullShortDescOldEdit:Locator;
  deleteTransversalRow: Locator;

  constructor(page: Page) {
    this.transversalModelInput = page.locator("//mat-chip-grid[@formcontrolname='transversal']//div//input");
    this.searchIcon = page.locator("//button//mat-icon[text()='search']");
    this.searchTable = page.locator("//table[@aria-describedby='data-tree-table']//tbody");
    this.historyIcon = page.locator("//mat-icon[@data-mat-icon-name='history']");
    this.historyClose = page.locator("//span[text()='CLOSE']");
    this.deleteIcon = page.locator("(//mat-icon[text()='delete_outline'])[1]");
    this.singleFeatureValueDes = page.locator("//mat-label[text()='Single feature value description EN']//parent::label//parent::div//parent::div//parent::div//following-sibling::div//input");
    this.fullShortDesc = page.locator("//mat-label[text()='Full short description EN']//parent::label//parent::div//parent::div//parent::div//following-sibling::div//input");
    this.otherDesc = page.locator("//mat-label[text()=' Other description  - xP Short Description  - EN']//parent::label//parent::div//parent::div//parent::div//following-sibling::div//input");
    this.fullLongDescOld = page.locator("//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Full Long description EN')]//following-sibling::li[contains(text(),'Old:')]//span");
    this.fullLongDescNew = page.locator("//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Full Long description EN')]//following-sibling::li[contains(text(),'New:')]//span");
    this.singleFeatureDescOld = page.locator("//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Single feature description EN')]//following-sibling::li[contains(text(),'Old:')]//span");
    this.singleFeatureDescNew = page.locator("//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Single feature description EN')]//following-sibling::li[contains(text(),'New:')]//span");
    this.otherDescOld = page.locator("//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Other Description SXP EN')]//following-sibling::li[contains(text(),'Old:')]//span");
    this.otherDescNew = page.locator("//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Other Description SXP EN')]//following-sibling::li[contains(text(),'New:')]//span");
    this.fullShortDescOld = page.locator("//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Full Short description EN')]//following-sibling::li[contains(text(),'Old:')]//span");
    this.fullShortDescNew = page.locator("//table//tbody//tr[1]//td[3]//ul//p[contains(text(),'Full Short description EN')]//following-sibling::li[contains(text(),'New:')]//span");
    this.editedDate = page.locator("//table[@aria-describedby='history-table']//tbody//tr[1]//td[1]");
    this.editedUser = page.locator("//table[@aria-describedby='history-table']//tbody//tr[1]//td[2]");
    this.alreadyExistDesc = page.locator(`//p[contains(text(),"already exist : 'EN' with value")]//preceding-sibling::h4[contains(text(),'ERROR')]`);
    this.errorPopup = page.locator("/div/mat-snack-bar-container/div/div/div/div/app-toast/div/div[2]/h4");
    this.successMessage = page.locator("//h4[contains(text(),'SUCCESS')]");

    this.singleFeatureDescOldEdit = page.locator("//table//tbody//tr[2]//td[3]//p[contains(text(),'Single feature description ')]//parent::ul//li[contains(text(),'Old')]//span");
    this.singleFeatureDescNewEdit = page.locator("//table//tbody//tr[2]//td[3]//p[contains(text(),'Single feature description ')]//parent::ul//li[contains(text(),'New')]//span");
    this.fullShortDescNewEdit = page.locator("//table//tbody//tr[2]//td[3]//p[contains(text(),'Full Short description EN')]//parent::ul//li[contains(text(),'New')]//span");
    this.fullShortDescOldEdit = page.locator("//table//tbody//tr[2]//td[3]//p[contains(text(),'Full Short description EN')]//parent::ul//li[contains(text(),'Old')]//span")
    this.fullLongDescOldEdit = page.locator("//table//tbody//tr[2]//td[3]//p[contains(text(),'Full Long description EN')]//parent::ul//li[contains(text(),'Old')]//span")
    this.fullLongDescNewEdit = page.locator("//table//tbody//tr[2]//td[3]//p[contains(text(),'Full Long description EN')]//parent::ul//li[contains(text(),'New')]//span");
    this.otherDescOldEdit = page.locator("//table//tbody//tr[2]//td[3]//p[contains(text(),'Other Description')]//parent::ul//li[contains(text(),'Old')]//span");
    this.otherDescNewEdit = page.locator("//table//tbody//tr[2]//td[3]//p[contains(text(),'Other Description')]//parent::ul//li[contains(text(),'New')]//span");

    this.deleteTransversalRow = page.locator("(//mat-icon[text()='close'])[1]");
  }
}
