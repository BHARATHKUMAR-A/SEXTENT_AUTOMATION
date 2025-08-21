import { Locator, Page, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { ExportDataPage } from '../pages/exportDataPage';
import excelData from '../test-data/excelData.json';
import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';


interface TestInfo {
  [key: string]: any;
}

interface StepHelper {
  clickElement: (locator: any, name: string) => Promise<void>;
  enterText: (locator: any, value: string, name: string) => Promise<void>;
  assertElementHasText: (locator: any, expectedText: string, message: string) => Promise<void>;
  assertElementVisible: (locator: any, name: string) => Promise<void>;
  getRandomNumber: (locator: any, name: any) => Promise<number>;
  assertElementEnabled: (locator: any, name: string) => Promise<void>;
  assertElementDisabled: (locator: any, name: string) => Promise<boolean>;
}

export class ExportdataSteps {
  private page: Page;
  private testInfo: TestInfo;
  private helper: StepHelper;
  private homePage: HomePage;
  private exportDataPage: ExportDataPage;


  constructor(page: Page, testInfo: TestInfo, stepHelper: StepHelper) {
    this.page = page;
    this.testInfo = testInfo;
    this.helper = stepHelper;
    this.homePage = new HomePage(page);
    this.exportDataPage = new ExportDataPage(page);

  }

  async navigate_to_search_toggle_on() {
    //navigate to Generic Dictionary
    await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
    await this.helper.clickElement(this.homePage.genericDict, 'genericDict');

    await this.helper.assertElementVisible(this.exportDataPage.searchSideBar, 'searchSideBar');
    await this.helper.clickElement(this.exportDataPage.searchSideBar, 'searchSideBar');
    await this.page.waitForTimeout(8000)

    await this.helper.assertElementEnabled(this.exportDataPage.isToggelOn, 'isToggelOn');
    
    await this.helper.assertElementEnabled(this.exportDataPage.singleValue, 'singleValue');

    await this.helper.assertElementVisible(this.exportDataPage.structure, 'Structure');
    await this.helper.clickElement(this.exportDataPage.structure, 'Structure');

    await this.helper.assertElementVisible(this.exportDataPage.structureValue, 'structureValue');
    await this.helper.clickElement(this.exportDataPage.structureValue, 'structureValue');

  }

  async navigate_to_search_toggle_off() {
    //navigate to Generic Dictionary
    await this.helper.assertElementVisible(this.homePage.genericDict, 'genericDict');
    await this.helper.clickElement(this.homePage.genericDict, 'genericDict');

    await this.helper.assertElementVisible(this.exportDataPage.searchSideBar, 'searchSideBar');
    await this.helper.clickElement(this.exportDataPage.searchSideBar, 'searchSideBar');
    await this.page.waitForTimeout(8000)

    await this.helper.assertElementEnabled(this.exportDataPage.isToggelOn, 'isToggelOn');
    await this.helper.clickElement(this.exportDataPage.isToggelOn, 'isToggelOn');
    await this.helper.assertElementDisabled(this.exportDataPage.isToggelOff, 'isToggelOff');
    
    await this.helper.assertElementEnabled(this.exportDataPage.singleValue, 'singleValue');

    await this.helper.assertElementVisible(this.exportDataPage.structure, 'Structure');
    await this.helper.clickElement(this.exportDataPage.structure, 'Structure');

    await this.helper.assertElementVisible(this.exportDataPage.structureValue, 'structureValue');
    await this.helper.clickElement(this.exportDataPage.structureValue, 'structureValue');

  }

  

    async export_common_method() {

    await this.helper.assertElementVisible(this.exportDataPage.searchByCode, 'searchByCode');
    await this.helper.clickElement(this.exportDataPage.searchByCode, 'searchByCode');
    await this.helper.enterText(this.exportDataPage.searchByCode,excelData.testData.codeValue, 'inputCode');

    await this.helper.assertElementVisible(this.exportDataPage.searchIcon, 'SearchIcon');
    await this.helper.clickElement(this.exportDataPage.searchIcon, 'SearchIcon');
    await this.page.waitForTimeout(5000)

    if (await this.exportDataPage.zeroRecord.isVisible()) {
      console.log("No records Found!")
    }

    else {

      const header1: string[] = await this.page.$$eval('table mat-header-row mat-header-cell div > div > div', divs => divs.map(div => div.textContent?.trim()).filter((text): text is string => Boolean(text)));
       
       if(await this.exportDataPage.isToggelOff.isVisible())
      {
        if(excelData.testData.structureValue==='SCL')
         {if (header1.length==4)
         {
          console.log(`Correct fields are present : ${header1}`)
         }
         else
         {
          console.log("Extra fields added!")
         }}
         if(excelData.testData.structureValue==='WPC')
         {if (header1.length==2)
         {
          console.log(`Correct fields are present : ${header1}`)
         }
         else
         {
          console.log("Extra fields added!")
         }}
         if(excelData.testData.structureValue==='STV')
         {if (header1.length==3)
         {
          console.log(`Correct fields are present : ${header1}`)
         }
         else
         {
          console.log("Extra fields added!")
         }}

      }
      else
      {
         console.log("Application headers: ",header1);
      }
    

    
      const downloadPath = path.resolve(__dirname, excelData.testData.filepath); // Create a folder in your framework 
      if (!fs.existsSync(downloadPath)) { fs.mkdirSync(downloadPath); }

      // Trigger the download
      const [download] = await Promise.all([
        this.page.waitForEvent('download'), // Wait for the download to start
        this.page.click("//mat-icon[text()='download']")
      ]);

      await this.helper.assertElementHasText(this.exportDataPage.exportMsg, 'Export search result in progress', 'exportMsg');

      // Save the file to your framework's folder
      const filePath = path.join(downloadPath, await download.suggestedFilename());
      await download.saveAs(filePath);

      //console.log('Downloaded file saved to:', filePath);

      const paginatorText = await this.page.$eval("//div[@class='bottom-section']//div[@class='mat-mdc-paginator-range-label']", (el) => el.textContent?.trim() || '');
      const valueAfterOf: any = paginatorText.split('of')[1]?.trim();
      console.log('Application Row Count:', valueAfterOf);

      // Define the function
      function validateExcelHeaders(filePath: string): void {
        if (!fs.existsSync(filePath)) {
          console.error('Excel file not found:', filePath);
          return;
        }

        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData1 = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        const headers = jsonData1[0] as string[];
        console.log("Excel Headers: ",headers);
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
        const excelRowCount = jsonData.length;
        console.log("Excel Row Count: ", excelRowCount);

        if (excelRowCount == valueAfterOf) {
          console.log('✅ Row Count Matched !');
        } else {
          console.log('❌ Row Count Not Matched !');
        }
        
        if(excelData.testData.structureValue==='STV')
        {
        const missing: string[] = [];
        let allPresent: boolean = true;

          for (let i: number = 0; i < header1.length; i++) {
          let headerItem = header1[i];
          if (headerItem.toLowerCase() === "class code") {
            headerItem = "Creation date (Class Code)";
          }
          if (headerItem.toLowerCase() === "sales code") {
            headerItem = "Sales Code (Sales Code)";
          }
          const isPresent = headers.some(h => h.toLowerCase() === headerItem.toLowerCase());

          if (!isPresent) {
            missing.push(header1[i]);
            allPresent = false;
          }
        }
        if (allPresent) {
          console.log('✅ All values are present.');
        } else {
          console.log('❌ Missing values:', missing.join(', '));
        }

        }
        
        if(excelData.testData.structureValue==='WPC')
        {

          const missing: string[] = [];
        let allPresent: boolean = true;

          
        for (let i: number = 0; i < header1.length; i++) {
          let headerItem = header1[i];
          if (headerItem.toLowerCase() === "family code") {
            headerItem = "Family Code (Family Code)";
          }
          if (headerItem.toLowerCase() === "feature code") {
            headerItem = "Feature Code (Feature Code)";
          }
          const isPresent = headers.some(h => h.toLowerCase() === headerItem.toLowerCase());
          if (!isPresent) {
            missing.push(header1[i]);
            allPresent = false; // Mark that not all are present
          }
        }
        if (allPresent) {
          console.log('✅ All values are present.');
        } else {
          console.log('❌ Missing values:', missing.join(', '));
        }
 

        }
        if(excelData.testData.structureValue==='SCL')
        {

        const missing: string[] = [];
        let allPresent: boolean = true;

         for (let i: number = 0; i < header1.length; i++) {
          let headerItem = header1[i];
          if (headerItem.toLowerCase() === "feature family code") {
            headerItem = "Feature Family Code (Feature Family)";
          }
          if (headerItem.toLowerCase() === "feature value code") {
            headerItem = "Feature Value Code (Feature Value)";
          }
          const isPresent = headers.some(h => h.toLowerCase() === headerItem.toLowerCase());
          if (!isPresent) {
            missing.push(header1[i]);
            allPresent = false; // Mark that not all are present
 
          }
 
        }
        if (allPresent) {
          console.log('✅ All values are present.');
        } else {
          console.log('❌ Missing values:', missing.join(', '));
        }

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
      validateExcelHeaders(filePath);

    }

  }

}