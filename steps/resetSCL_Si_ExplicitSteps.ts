
import { Locator, Page, expect } from '@playwright/test';
import { resetSCL_Si_ExplicitPage } from '../pages/resetSCL_Si_ExplicitPage';
import testData_SCL_FF from '../test-data/testData_SCL_FF.json';
// import testData_eventData from '../../test-data/step2 - test_data/eventData.json';
// import testData_CreateProductLine from '../../test-data/step2 - test_data/createProductLine.json';


interface TestInfo {
    [key: string]: any;
}

interface StepHelper {
    clickElement: (locator: any, name: string) => Promise<void>;
    clickElementForcefully: (locator: any, name: string) => Promise<void>;
    enterText: (locator: any, value: string, name: string) => Promise<void>;
    assertElementVisible: (locator: any, name: string) => Promise<void>;
    assertElementHasText: (locator: any, expectedText: string, message: string) => Promise<void>;

}

export class resetSCL_Si_ExplicitSteps {
    private page: Page;
    private testInfo: TestInfo;
    private helper: StepHelper;
    private resetSiExplicit: resetSCL_Si_ExplicitPage;

    constructor(page: Page, testInfo: TestInfo, stepHelper: StepHelper) {
        this.page = page;
        this.testInfo = testInfo;
        this.helper = stepHelper;
        this.resetSiExplicit = new resetSCL_Si_ExplicitPage(page);
    }

    // async reset_si_explicit() {
    //     //genericdict
    //     await this.helper.assertElementVisible(this.resetSiExplicit.genericDict, 'genericDict');
    //     await this.helper.clickElement(this.resetSiExplicit.genericDict, 'genericDict');

    //     //search option
    //     await this.helper.assertElementVisible(this.resetSiExplicit.search, 'search_option');
    //     await this.helper.clickElement(this.resetSiExplicit.search, 'search_option_clicked');
    //     //structure option
    //     await this.helper.assertElementVisible(this.resetSiExplicit.structure, 'structure');
    //     await this.helper.clickElement(this.resetSiExplicit.structure, 'structure_option');
    //     await this.helper.clickElement(this.resetSiExplicit.structureValue, 'structure_value');

    //     //arrow down
    //     await this.helper.assertElementVisible(this.resetSiExplicit.arrowDown, 'arrow down');
    //     await this.helper.clickElement(this.resetSiExplicit.arrowDown, 'arrow down');

    //     //arrow down SCL
    //     await this.helper.assertElementVisible(this.resetSiExplicit.arrowDownSCL, 'arrow down');
    //     await this.helper.clickElement(this.resetSiExplicit.arrowDownSCL, 'arrow down');


    //     await this.helper.assertElementVisible(this.resetSiExplicit.familyDescription, 'familydescription');
    //     await this.helper.enterText(this.resetSiExplicit.familyDescription, testData_SCL_FF.resetSCL.desc[0], 'familydescription')

    //     //search icon visible
    //     await this.helper.assertElementVisible(this.resetSiExplicit.searchIcon, 'search_icon');
    //     await this.helper.clickElement(this.resetSiExplicit.searchIcon, 'search_icon');
    //     await this.page.waitForTimeout(3000);

    //     const totalText = await this.resetSiExplicit.totalCount.textContent();
    //     console.log("total coutn :" + totalText)

    //     const match = totalText?.match(/of\s+(\d+)/);
    //     const totalRows = match ? parseInt(match[1], 10) : 0;


    //     let totalScrollY = 0;
    //     let scrollStep = 5; // Start with a very small scroll step

    //     let processedCount = 0;
    //     let hasMoreRows = true;

    //     while (hasMoreRows) {
    //         let visibleLinks = await this.page.locator("//mat-row[@role='row']//mat-cell[1]//a");
    //         let count = await visibleLinks.count();
    //         console.log("Visible rows:", count);

    //         while (processedCount < count) {
    //             console.log(`Processing row: ${processedCount}`);

    //             // Click the link at the absolute index
    //             await visibleLinks.nth(processedCount).click();
    //             await this.page.waitForTimeout(3000);


    //             const siExplicit = await this.page.locator("//mat-form-field[.//mat-label[text()='Si Explicit']]//mat-select[@formcontrolname='selectCtl']");
    //             const rawText1 = await siExplicit.textContent();
    //             const siExplicitSelectedValue = rawText1?.trim() || '';

    //             const siExclusion = await this.page.locator("//mat-form-field[.//mat-label[text()='Si Exclusion']]//mat-select[@formcontrolname='selectCtl']");
    //             const rawText2 = await siExclusion.textContent();
    //             const siExclusionSelectedValue = rawText2?.trim() || '';

    //             const Mand_structure = await this.page.locator("//mat-form-field[.//mat-label[text()='Mandatory with Structure']]//mat-select[@formcontrolname='selectCtl']");
    //             const rawText3 = await Mand_structure.textContent();
    //             const Mand_structureSelectedValue = rawText3?.trim() || '';

    //             const Mand_resp = await this.page.locator("//mat-form-field[.//mat-label[text()='Mandatory with Responsibility']]//mat-select[@formcontrolname='selectCtl']");
    //             const rawText4 = await Mand_resp.textContent();
    //             const Mand_respSelectedValue = rawText4?.trim() || '';

    //             if (siExplicitSelectedValue === "" && siExclusionSelectedValue === "" && Mand_structureSelectedValue === "" && Mand_respSelectedValue === "") {
    //                 await this.helper.clickElement(this.resetSiExplicit.cancel, 'cancel');
    //                 await this.helper.clickElement(this.resetSiExplicit.confirm, 'confirm');
    //                 await this.helper.clickElement(this.resetSiExplicit.backBtn, 'backBtn');
    //             } else {
    //                 if (siExplicitSelectedValue == "") {
    //                     await this.page.keyboard.press('Tab');
    //                 } else {
    //                     if (siExplicitSelectedValue.includes(',')) {
    //                         await siExplicit.click();
    //                         const resultArray = siExplicitSelectedValue.split(',').map(item => item.trim());
    //                         for (const value of resultArray) {
    //                             await this.page.locator(`//mat-option//span[normalize-space(text())='${value}']`).click();
    //                         }
    //                         await this.page.keyboard.press('Tab');
    //                     } else {
    //                         await siExplicit.click();
    //                         await this.page.locator(`//mat-option//span[normalize-space(text())='${siExplicitSelectedValue}']`).click();
    //                         await this.page.keyboard.press('Tab');
    //                     }
    //                 }

    //                 if (siExclusionSelectedValue == "") {
    //                     await this.page.keyboard.press('Tab');
    //                 } else {
    //                     if (siExclusionSelectedValue.includes(',')) {
    //                         await siExclusion.click();
    //                         const resultArray = siExclusionSelectedValue.split(',').map(item => item.trim());
    //                         for (const value of resultArray) {
    //                             await this.page.locator(`//mat-option//span[normalize-space(text())='${value}']`).click();
    //                         }
    //                         await this.page.keyboard.press('Tab');
    //                     } else {
    //                         await siExclusion.click();
    //                         await this.page.locator(`//mat-option//span[normalize-space(text())='${siExclusionSelectedValue}']`).click();
    //                         await this.page.keyboard.press('Tab');
    //                     }
    //                 }

    //                 if (Mand_structureSelectedValue == "") {
    //                     await this.page.keyboard.press('Tab');
    //                 } else {
    //                     if (Mand_structureSelectedValue.includes(',')) {
    //                         await Mand_structure.click();
    //                         const resultArray = Mand_structureSelectedValue.split(',').map(item => item.trim());
    //                         for (const value of resultArray) {
    //                             await this.page.locator(`//mat-option//span[normalize-space(text())='${value}']`).click();
    //                         }
    //                         await this.page.keyboard.press('Tab');
    //                     } else {
    //                         await Mand_structure.click();
    //                         await this.page.locator(`//mat-option//span[normalize-space(text())='${Mand_structureSelectedValue}']`).click();
    //                         await this.page.keyboard.press('Tab');
    //                     }
    //                 }

    //                 if (Mand_respSelectedValue == "") {
    //                     await this.page.keyboard.press('Tab');
    //                 } else {
    //                     await Mand_resp.click();
    //                     await this.page.locator("//mat-option//span[normalize-space(text())='---Select---']").click();
    //                 }

    //                 await this.page.keyboard.press('Tab');
    //                 await this.helper.clickElement(this.resetSiExplicit.save, 'save');
    //                 await this.page.waitForTimeout(5000);
    //                 await this.helper.clickElement(this.resetSiExplicit.confirm, 'confirm');
    //                 await this.page.waitForTimeout(5000);
    //                 await this.helper.clickElement(this.resetSiExplicit.backBtn, 'backBtn');
    //                 await this.page.waitForTimeout(5000);
    //             }

    //             processedCount++;

    //             //After navigating back, scroll to the last known position
    //             await this.page.evaluate((scrollY) => {
    //                 const viewport = document.querySelector('#wrapper-table > cdk-virtual-scroll-viewport');
    //                 if (viewport) {
    //                     viewport.scrollTo({ top: scrollY, behavior: 'auto' });
    //                 }
    //             }, totalScrollY);

    //             // Wait for rows to reappear
    //             await this.page.waitForTimeout(3000);

    //             // Re-fetch the row list after returning
    //             visibleLinks = await this.page.locator("//mat-row[@role='row']//mat-cell[1]//a");
    //             count = await visibleLinks.count();


    //             // Scroll further for next row
    //             totalScrollY += scrollStep;
    //             scrollStep = Math.min(scrollStep + 2, 50); // Increase slowly, cap at 100
    //             await this.page.waitForTimeout(3000);



    //         }

    //         const totalRowsNow = await this.page.locator("//mat-row[@role='row']//mat-cell[1]//a").count();
    //         hasMoreRows = totalRowsNow > processedCount;
    //     }




    // }

    async reset_si_explicit() {
       //genericdict
        await this.helper.assertElementVisible(this.resetSiExplicit.genericDict, 'genericDict');
        await this.helper.clickElement(this.resetSiExplicit.genericDict, 'genericDict');

        //search option
        await this.helper.assertElementVisible(this.resetSiExplicit.search, 'search_option');
        await this.helper.clickElement(this.resetSiExplicit.search, 'search_option_clicked');
        //structure option
        await this.helper.assertElementVisible(this.resetSiExplicit.structure, 'structure');
        await this.helper.clickElement(this.resetSiExplicit.structure, 'structure_option');
        await this.helper.clickElement(this.resetSiExplicit.structureValue, 'structure_value');

        //arrow down
        await this.helper.assertElementVisible(this.resetSiExplicit.arrowDown, 'arrow down');
        await this.helper.clickElement(this.resetSiExplicit.arrowDown, 'arrow down');

        //arrow down SCL
        await this.helper.assertElementVisible(this.resetSiExplicit.arrowDownSCL, 'arrow down');
        await this.helper.clickElement(this.resetSiExplicit.arrowDownSCL, 'arrow down');


        await this.helper.assertElementVisible(this.resetSiExplicit.familyDescription, 'familydescription');
        await this.helper.enterText(this.resetSiExplicit.familyDescription, testData_SCL_FF.resetSCL.desc[0], 'familydescription')

        //search icon visible
        await this.helper.assertElementVisible(this.resetSiExplicit.searchIcon, 'search_icon');
        await this.helper.clickElement(this.resetSiExplicit.searchIcon, 'search_icon');
        await this.page.waitForTimeout(3000);

        const totalText = await this.resetSiExplicit.totalCount.textContent();
        console.log("total coutn :" + totalText)

        const match = totalText?.match(/of\s+(\d+)/);
        const totalRows = match ? parseInt(match[1], 10) : 0;
   

    // Step 3: Scroll until all rows are loaded
    let visibleCount = 0;
    let previousCount = -1;
    let scrollAttempts = 0;
    const maxScrollAttempts = 50;

    while (visibleCount < totalRows && scrollAttempts < maxScrollAttempts) {
        previousCount = visibleCount;

        await this.page.evaluate(() => {
            const viewport = document.querySelector('#wrapper-table > cdk-virtual-scroll-viewport');
            if (viewport) {
                viewport.scrollBy({ top: 300, behavior: 'auto' });
            }
        });

        await this.page.waitForTimeout(1000);
        visibleCount = await this.page.locator("//mat-row[@role='row']//mat-cell[1]//a").count();
        scrollAttempts++;
    }

    // Step 4: Process each row
    for (let i = 0; i < visibleCount; i++) {
        const visibleLinks = await this.page.locator("//mat-row[@role='row']//mat-cell[1]//a");
        await visibleLinks.nth(i).click();

        // Wait for form to load with timeout guard
        await this.page.waitForSelector("//mat-form-field[.//mat-label[text()='Si Explicit']]", { timeout: 10000 });
        console.log(`Processing row: ${i + 1}`);

        const siExplicit = this.page.locator("//mat-form-field[.//mat-label[text()='Si Explicit']]//mat-select[@formcontrolname='selectCtl']");
        const siExclusion = this.page.locator("//mat-form-field[.//mat-label[text()='Si Exclusion']]//mat-select[@formcontrolname='selectCtl']");
        const Mand_structure = this.page.locator("//mat-form-field[.//mat-label[text()='Mandatory with Structure']]//mat-select[@formcontrolname='selectCtl']");
        const Mand_resp = this.page.locator("//mat-form-field[.//mat-label[text()='Mandatory with Responsibility']]//mat-select[@formcontrolname='selectCtl']");

        const siExplicitSelectedValue = (await siExplicit.textContent())?.trim() || '';
        const siExclusionSelectedValue = (await siExclusion.textContent())?.trim() || '';
        const Mand_structureSelectedValue = (await Mand_structure.textContent())?.trim() || '';
        const Mand_respSelectedValue = (await Mand_resp.textContent())?.trim() || '';

        const allEmpty = !siExplicitSelectedValue && !siExclusionSelectedValue && !Mand_structureSelectedValue && !Mand_respSelectedValue;

        if (allEmpty) {
            await this.helper.clickElement(this.resetSiExplicit.cancel, 'cancel');
            await this.helper.clickElement(this.resetSiExplicit.confirm, 'confirm');
            await this.helper.clickElement(this.resetSiExplicit.backBtn, 'backBtn');
            await this.page.waitForSelector("//mat-row[@role='row']//mat-cell[1]//a", { timeout: 10000 });

            // Restore scroll position
            await this.page.evaluate((scrollY) => {
                const viewport = document.querySelector('#wrapper-table > cdk-virtual-scroll-viewport');
                if (viewport) {
                    viewport.scrollTo({ top: scrollY, behavior: 'auto' });
                }
            }, i * 50); // assuming ~50px per row

            continue;
        }

        // Handle dropdowns
        await this.handleDropdown(siExplicit, siExplicitSelectedValue);
        await this.handleDropdown(siExclusion, siExclusionSelectedValue);
        await this.handleDropdown(Mand_structure, Mand_structureSelectedValue);
        await this.handleDropdown(Mand_resp, Mand_respSelectedValue, true); // true = reset to "---Select---"

        // Save and confirm
        await this.page.keyboard.press('Tab');
        await this.helper.clickElement(this.resetSiExplicit.save, 'save');
        await this.page.waitForTimeout(5000);
        await this.helper.clickElement(this.resetSiExplicit.confirm, 'confirm');
        await this.page.waitForTimeout(5000);
        await this.helper.clickElement(this.resetSiExplicit.backBtn, 'backBtn');

        // Wait for rows to reappear
        await this.page.waitForSelector("//mat-row[@role='row']//mat-cell[1]//a", { timeout: 10000 });

        // Restore scroll position to continue from next row
        await this.page.evaluate((scrollY) => {
            const viewport = document.querySelector('#wrapper-table > cdk-virtual-scroll-viewport');
            if (viewport) {
                viewport.scrollTo({ top: scrollY, behavior: 'auto' });
            }
        }, (i + 1) * 50); // assuming ~50px per row
    }

    console.log("✅ All rows processed successfully.");
}

// 🔧 Reusable dropdown handler
async handleDropdown(dropdownLocator, selectedValue, resetToDefault = false) {
    if (!selectedValue) {
        await this.page.keyboard.press('Tab');
        return;
    }

    await dropdownLocator.click();

    if (resetToDefault) {
        await this.page.locator("//mat-option//span[normalize-space(text())='---Select---']").click();
        return;
    }

    const values = selectedValue.includes(',') 
        ? selectedValue.split(',').map(v => v.trim()) 
        : [selectedValue];

    for (const value of values) {
        const optionLocator = this.page.locator(`//mat-option//span[normalize-space(text())='${value}']`);
        await optionLocator.click();
    }

    await this.page.keyboard.press('Tab');
}



}