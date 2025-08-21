import { Locator, Page, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { ExportForMappingPage } from '../pages/exportForMappingPage';
import excelData from '../test-data/excelData.json';
import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';
import { attachment } from 'allure-js-commons';
interface TestInfo {
  [key: string]: any;
}
interface StepHelper {
  clickElement: (locator: any, name: string) => Promise<void>;
  enterText: (locator: any, value: string, name: string) => Promise<void>;
  assertElementVisible: (locator: any, name: string) => Promise<void>;
  assertElementEnabled: (locator: any, name: string) => Promise<void>;
  assertElementDisabled: (locator: any, name: string) => Promise<boolean>;
  assertElementHasText: (locator: any, expectedText: string, message: string) => Promise<void>;
}
export class ExportForMappingSteps {
  private page: Page;
  private testInfo: TestInfo;
  private helper: StepHelper;
  private homePage: HomePage;
  private exportForMappingPage: ExportForMappingPage;
  constructor(page: Page, testInfo: TestInfo, stepHelper: StepHelper) {
    this.page = page;
    this.testInfo = testInfo;
    this.helper = stepHelper;
    this.homePage = new HomePage(page);
    this.exportForMappingPage = new ExportForMappingPage(page);
  }
  async navigate_to_search_toggle_on() {
    await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
    await this.helper.clickElement(this.homePage.genericDict, 'genericDict');
    await this.helper.assertElementVisible(this.exportForMappingPage.searchSideBar, 'searchSideBar');
    await this.helper.clickElement(this.exportForMappingPage.searchSideBar, 'searchSideBar');
    await this.page.waitForTimeout(8000)
    await this.helper.assertElementEnabled(this.exportForMappingPage.isToggelOn, 'isToggelOn');
  }
  async navigate_to_search_toggle_off() {
    await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
    await this.helper.clickElement(this.homePage.genericDict, 'genericDict');
    await this.helper.assertElementVisible(this.exportForMappingPage.searchSideBar, 'searchSideBar');
    await this.helper.clickElement(this.exportForMappingPage.searchSideBar, 'searchSideBar');
    await this.page.waitForTimeout(8000)
    await this.helper.assertElementEnabled(this.exportForMappingPage.isToggelOn, 'isToggelOn');
    await this.helper.clickElement(this.exportForMappingPage.isToggelOn, 'isToggelOn');
    await this.helper.assertElementDisabled(this.exportForMappingPage.isToggelOff, 'isToggelOff');
  }
  async export_For_Mapping_common_method() {
    await this.helper.assertElementEnabled(this.exportForMappingPage.mappingValue, 'mappingValue');
    await this.helper.clickElement(this.exportForMappingPage.mappingValue, 'mappingValue');
    await this.helper.assertElementVisible(this.exportForMappingPage.arrowDown, 'Arrow Down');
    await this.helper.clickElement(this.exportForMappingPage.arrowDown, 'Arrow Down');
    await this.helper.assertElementVisible(this.exportForMappingPage.specificCriteriaDropdown, 'specificCriteriaDropdown');
    await this.helper.clickElement(this.exportForMappingPage.specificCriteriaDropdown, 'specificCriteriaDropdown');
    await this.helper.assertElementVisible(this.exportForMappingPage.sclFeatureFamCode, 'sclFeatureFamCode');
    await this.helper.clickElement(this.exportForMappingPage.sclFeatureFamCode, 'sclFeatureFamCode');
    await this.helper.enterText(this.exportForMappingPage.sclFeatureFamCode, excelData.testData.featureFamcodeValue, 'featureFamcodeValue');
    await this.helper.assertElementVisible(this.exportForMappingPage.searchIcon, 'SearchIcon');
    await this.helper.clickElement(this.exportForMappingPage.searchIcon, 'SearchIcon');
    await this.page.waitForTimeout(5000)
    if (await this.exportForMappingPage.zeroRecord.isVisible()) {
      console.log("No records Found!")
      await attachment('Record Data','No records Found!','text/plain')
    }
    else {
      const paginatorText = await this.page.$eval("//div[@class='bottom-section']//div[@class='mat-mdc-paginator-range-label']", (el) => el.textContent?.trim() || '');
      const valueAfterOf: any = paginatorText.split('of')[1]?.trim();
     
      const rowNumber = 1;
      const headers: string[] = await this.page.$$eval('table mat-header-row mat-header-cell div > div > div', divs => divs.map(div => div.textContent?.trim()).filter((text): text is string => Boolean(text)));
      if (await this.exportForMappingPage.isToggelOff.isVisible()) {
        if (headers.length === 10) {
          console.log(`Correct fields are present: ${headers}`);
          await attachment('Field Data',`Correct fields are present: ${headers}`,'text/plain')
        } else {
          console.log("Extra fields added!");
          await attachment('Field Data','Extra fields added!','text/plain')
        }
      }
      const rowSelector = `//table//mat-row[position()=${rowNumber}]//mat-cell`;
   
      const rowValues: string[] = await this.page.$$eval(rowSelector, cells => cells.map(cell => cell.textContent?.trim() || ''));
      //console.log(rowValues)
      const keyValuePairs: Record<string, string> = {};
      headers.forEach((header, index) => { keyValuePairs[header] = rowValues[index] || ''; });
      const downloadPath = path.resolve(excelData.testData.filepath);
      if (!fs.existsSync(downloadPath)) { fs.mkdirSync(downloadPath); }
      const [download] = await Promise.all([
        this.page.waitForEvent('download'),
        this.page.click("//mat-icon[text()='download']")
      ]);
      await this.helper.assertElementVisible(this.exportForMappingPage.exportMsg, 'exportMsg');
      await this.helper.assertElementHasText(this.exportForMappingPage.exportMsg, 'Export search result in progress', 'exportMsg');
      const filePath = path.join(downloadPath, await download.suggestedFilename());
      await download.saveAs(filePath);
 
      async function validateRowData(filePath: string, keyValuePairs: Record<string, string>): Promise<void> {
        if (!fs.existsSync(filePath)) {
          console.error('Excel file not found:', filePath);
         
          return;
        }
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
        const excelRowCount = jsonData.length;
        console.log('Application Row Count:', valueAfterOf);
        await attachment('Application Row Count',`Application Row Count: ${valueAfterOf}`,'text/plain')
        console.log("Excel Row Count:", excelRowCount);
        await attachment('Excel Row Count:',`Excel Row Count: ${excelRowCount}`,'text/plain')
        const columnAliasMap: Record<string, string> = {
          "feature family code": "feature family code (feature family)",
          "feature value code": "feature value code (feature value)",
          "full short description en": "full short description en (feature value)",
          "other short xf en (feature value)": "other description (feature value)",
          "class code": "class code (class code)",
          "sales code": "sales code (sales code)",
          "family code": "family code (family code)",
          "feature code": "feature code (feature code)"
        };
        const rowData = jsonData[rowNumber - 1];
        if (!rowData) {
          console.error(`❌ Row ${rowNumber} not found in Excel.`);
          await attachment('Excel Error',`❌ Row ${rowNumber} not found in Excel.`,'text/plain')
          return;
        }
        
        console.log(`Comparison for Excel Row no ${rowNumber + 1} and Application Row no ${rowNumber}:`);
        await attachment('Comparison data',`Comparison for Excel Row no ${rowNumber + 1} and Application Row no ${rowNumber}:`,'text/plain')
        let allDataMatched = true;
        for (const [key, expectedValue] of Object.entries(keyValuePairs)) {
 
 
          const normalizedKey = key.trim().toLowerCase();
          const mappedKey = columnAliasMap[normalizedKey] || key;
          const excelColumn = Object.keys(rowData).find(
            col => col.trim().toLowerCase() === mappedKey.trim().toLowerCase()
          );
          if (!excelColumn) {
            console.warn(`Column '${key}' not found in Excel.`);
            await attachment('Excel Error',`Column '${key}' not found in Excel.`,'text/plain')
            allDataMatched = false;
            continue;
          }
          const actualValue = rowData[excelColumn]?.toString().trim() || '';
          const normalizedExpected = (expectedValue as any).trim() === '-' ? '' : (expectedValue as any).trim().replace(/\s+/g, '');
          const normalizedActual = actualValue === '-' ? '' : actualValue.replace(/\s+/g, '');
          if (normalizedKey === 'other short xf en (feature value)') {
            if (normalizedActual.includes(normalizedExpected)) {
              console.log(`✅ Partial match for '${key}': Application Data '${expectedValue}' is found in Excel Data '${actualValue}'`);
               await attachment('Data Verification',`✅ Partial match for '${key}': Application Data '${expectedValue}' is found in Excel Data '${actualValue}'`,'text/plain')
            } else {
              console.log(`❌ Partial match failed for '${key}': Application Data '${expectedValue}' not found in Excel Data '${actualValue}'`);
               await attachment('Data Verification',`❌ Partial match failed for '${key}': Application Data '${expectedValue}' not found in Excel Data '${actualValue}'`,'text/plain')
              allDataMatched = false;
            }
          } else {
            if (normalizedActual === normalizedExpected) {
              console.log(`✅ Data matched for column '${key}': Expected Application Data: '${expectedValue}', Found from Excel: '${actualValue}'`);
               await attachment('Data Verification',`✅ Data matched for column '${key}': Expected Application Data: '${expectedValue}', Found from Excel: '${actualValue}'`,'text/plain')
            } else {
              console.log(`❌ Data not matched for column '${key}': Expected Application Data: '${expectedValue}', Found from Excel: '${actualValue}'`);
               await attachment('Data Verification',`❌ Data not matched for column '${key}': Expected Application Data: '${expectedValue}', Found from Excel: '${actualValue}'`,'text/plain')
              allDataMatched = false;
            }
          }
        }
        if (excelRowCount == valueAfterOf) {
          console.log('✅ Row Count Matched!');
           await attachment('Row Data Validation','✅ Row Count Matched!','text/plain')
        } else {
          console.log('❌ Row Count Not Matched!');
           await attachment('Row Data Validation','❌ Row Count Not Matched!','text/plain')
        }
        if (allDataMatched) {
          console.log("✅ All column data matched.");
           await attachment('Column Data Validation','✅ All column data matched','text/plain')
        } else {
          console.log("❌ Not all data matched.");
          await attachment('Column Data Validation','❌ Not all data matched.','text/plain')
        }
        //delete excel sheet file after performing activities
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error deleting file:', err);
          } else {
            console.log(`Excel file ${filePath} deleted successfully.`);
           
          }
        });
      }
      validateRowData(filePath, keyValuePairs);
    }
  }
}