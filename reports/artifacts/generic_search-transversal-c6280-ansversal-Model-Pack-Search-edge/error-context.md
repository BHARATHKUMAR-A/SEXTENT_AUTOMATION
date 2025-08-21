# Test info

- Name: Create Transversal Model Pack Search
- Location: C:\Users\salokale\Downloads\GCM_2306\GCM\tests\generic_search\transversal_model_pack_search\createTransversalModelPackSearch.spec.ts:16:5

# Error details

```
TimeoutError: locator.waitFor: Timeout 1000000ms exceeded.
Call log:
  - waiting for locator('//h4[contains(text(),\'SUCCESS\')]') to be visible

    at FeatureTransversalSearchSteps.create_transversal_SCL_feature_family (C:\Users\salokale\Downloads\GCM_2306\GCM\steps\featureTransversalSearchSteps.ts:608:50)
    at C:\Users\salokale\Downloads\GCM_2306\GCM\tests\generic_search\transversal_model_pack_search\createTransversalModelPackSearch.spec.ts:39:25
```

# Page snapshot

```yaml
- banner:
  - button
  - button
  - text: DEV
  - banner: GLOBAL CODIFICATION MANAGEMENT
  - text: M0018333-INTERNE SIMULE M0018333 ,ADMIN
  - button "HEADER.USER"
  - button
  - button "Select a language": EN
  - button "Select a theme"
  - button
- navigation:
  - text: Home
  - button "Generic Dictionary" [expanded]
  - region "Generic Dictionary":
    - navigation:
      - text: Search
      - button "Create feature family" [expanded]
      - region "Create feature family":
        - navigation: Create SCL feature family Create WPC family code Create STV class code
      - button "Create feature value"
      - text: SCL feature family ranking Search Transversal Model Pack
  - button "Product Line"
  - text: Settings
- text: Version 2.3.3-SNAPSHOT.0
- main:
  - button
  - heading "Create Feature Value" [level=2]
  - text: "Feature family code : GL9 SCL"
  - tablist:
    - tab "Code"
    - tab "Attributes" [selected]
    - tab "Mapping"
    - tabpanel "Attributes":
      - button "Mandatory attributes" [expanded]
      - region "Mandatory attributes":
        - text: Feature Family Code
        - textbox "Feature Family Code" [disabled]: GL9
        - text: Feature Value Code
        - textbox "Feature Value Code" [disabled]: "14"
        - text: Family Description EN
        - textbox "Family Description EN" [disabled]: atsss
      - button "General attributes" [expanded]
      - region "General attributes":
        - text: Hierarchy Level
        - spinbutton "Hierarchy Level": "0"
        - text: Prohibited for new use
        - textbox "Prohibited for new use": 19/08/2025
        - button "Open calendar"
        - radiogroup "Select an option":
          - text: Confidential*
          - radio "Yes"
          - text: "Yes"
          - radio "No" [checked]
          - text: "No"
      - button "Transversal Model Pack" [expanded]:
        - text: Transversal Model Pack
        - button
      - region "Transversal Model Pack":
        - text: Feature Family
        - combobox "Feature Family" [disabled]: D08 - DOUBLE LOCK
        - text: Feature Value
        - combobox "Feature Value": 01 - WITH
        - button
        - text: Feature Family
        - combobox "Feature Family" [disabled]: D10 - HEATING AND COOLING CUP HOLDER
        - text: Feature Value
        - combobox "Feature Value": 01 - VENTILATED REFRESHING
        - button
        - text: Feature Family
        - combobox "Feature Family" [disabled]: D04 - OPENING ROOF REMOTE CONTROL
        - text: Feature Value
        - combobox "Feature Value": 02 - REMOTE CLOSING
        - button
        - text: Feature Family
        - combobox "Feature Family"
      - button "Single feature value description" [expanded]
      - region "Single feature value description":
        - text: Single feature value description EN
        - textbox "Single feature value description EN": D0801+D1001+D0402_bsH
        - text: 21/60
        - img "filter_none"
        - text: Language
        - combobox "Language"
        - button
      - button "Full short description" [expanded]
      - region "Full short description":
        - text: Full short description EN
        - textbox "Full short description EN": atsss-D0801+D1001+D0402_bsH
        - text: 27 / 36
      - button "Full long description EN (Family + Value)" [expanded]
      - region "Full long description EN (Family + Value)":
        - text: Full long description EN
        - textbox "Full long description EN": atsss-D0801+D1001+D0402_bsH
        - text: 27 / 100
      - button "Other description" [expanded]
      - region "Other description":
        - text: Other description - WPC Short Description - EN
        - textbox "Other description - WPC Short Description - EN": TEST
        - text: 4/8 Other description - xP Short Description - EN
        - textbox "Other description - xP Short Description - EN": D0801+D1001+D0402_TdS
        - text: 21/30 System
        - combobox "System"
        - text: Language
        - combobox "Language"
        - button
      - button "Explicative note" [expanded]
      - region "Explicative note":
        - text: Explicative note - EN
        - textbox "Explicative note - EN": TEST
      - button "Media URLs" [expanded]
      - region "Media URLs":
        - button
      - button "Additional attributes" [expanded]
      - region "Additional attributes":
        - switch "Non-WLTP (Genome)"
        - text: Non-WLTP (Genome)
        - switch "NRE Not defined (Genome)"
        - text: NRE Not defined (Genome)
        - switch "No homolo. phys. data impact"
        - text: No homolo. phys. data impact
        - switch "No impact CdA (Genome)"
        - text: No impact CdA (Genome)
        - switch "No impact RR (Genome)"
        - text: No impact RR (Genome)
        - switch "No techn. phys. data impact"
        - text: No techn. phys. data impact
      - button "Custom properties" [expanded]
      - region "Custom properties":
        - button
      - button "Previous"
      - button "Next"
      - button "Save without mapping"
```

# Test source

```ts
  508 |
  509 |                 // Wait for options to appear
  510 |                 const options = this.featureFamily.page().locator('mat-option');
  511 |
  512 |                 // Ensure the desired index exists
  513 |                 const count = await options.count();
  514 |                 if (index >= count) {
  515 |                     throw new Error(`Index ${index} is out of bounds. Only ${count} options available.`);
  516 |                 }
  517 |
  518 |                 // Click the option at the given index
  519 |                 await options.nth(index).click();
  520 |
  521 |                 // Feature value
  522 |                 const featureValue = this.page.locator(`(//mat-label[text()='Feature Value'])[${i}]`);
  523 |                 await this.helper.clickElement(featureValue, "Feature value");
  524 |                 this.page.waitForTimeout(1000);
  525 |                 await this.helper.selectDropdownByIndex(featureValue, 1);
  526 |             }
  527 |         };
  528 |
  529 |         await transversal_family(transversalModelCount);
  530 |
  531 |
  532 |         //Verify Description
  533 |         const inputs = this.page.locator('input[role="combobox"][matinput]');
  534 |         const count = await inputs.count();
  535 |
  536 |         const mergedResults: string[] = [];
  537 |
  538 |         for (let i = 0; i < count - 1; i += 2) {
  539 |             const firstText = await inputs.nth(i).inputValue();
  540 |             const secondText = await inputs.nth(i + 1).inputValue();
  541 |
  542 |             const code = firstText.split(' - ')[0].trim();
  543 |             const number = secondText.split(' - ')[0].trim();
  544 |
  545 |             mergedResults.push(`${code}${number}`);
  546 |         }
  547 |
  548 |         const finalOutput = mergedResults.join('+');
  549 |
  550 |         singleFeatureValueDescriptionText = (await this.featureSCLPage.singleFeatureValueDescription.inputValue())?.trim() ?? '';
  551 |
  552 |         shortDescriptionText = (await this.featureSCLPage.fullShortDescription.inputValue())?.trim() ?? '';
  553 |
  554 |         if (await this.featureSCLPage.otherDescShortDesc.isVisible()) {
  555 |             otherDescShortDescText = (await this.featureSCLPage.otherDescShortDesc.inputValue())?.trim() ?? '';
  556 |             console.log('Other Short Description:', otherDescShortDescText);
  557 |         }
  558 |
  559 |
  560 |         console.log('Single Feature Value Description:', singleFeatureValueDescriptionText);
  561 |
  562 |         if (finalOutput === singleFeatureValueDescriptionText || finalOutput === otherDescShortDescText) {
  563 |             console.log("Descriptions match:", finalOutput);
  564 |         } else {
  565 |             console.error("Descriptions do not match ", finalOutput);
  566 |         }
  567 |
  568 |
  569 |         //enter value singleFeatureValueDescription and otherShortDescText
  570 |         const singleFVDescriptionText = singleFeatureValueDescriptionText + '_' + await this.helper.generateRandomText(3);
  571 |         const otherShortDescText = otherDescShortDescText + '_' + await this.helper.generateRandomText(3);
  572 |         const fullshortDescriptionText = shortDescriptionText + '_' + await this.helper.generateRandomText(3);
  573 |
  574 |         await this.helper.enterText(this.featureSCLPage.singleFeatureValueDescription, singleFVDescriptionText, "singleFeatureValueDescription");
  575 |         await this.helper.clickElement(this.featureSCLPage.copyTextSCL, "Copy single feature value ");
  576 |
  577 |         while (await this.featureSCLPage.maxLengthError.isVisible()) {
  578 |             await this.helper.clickElement(this.featureSCLPage.fullShortDescription, "fullShortDescription");
  579 |             await this.page.keyboard.press('Backspace');
  580 |         }
  581 |         await this.helper.enterText(this.featureSCLPage.otherDescShortDesc, otherShortDescText, "otherShortDescText");
  582 |
  583 |         //other short xf Description
  584 |         if (await this.featureSCLPage.otherDescShortXF.isVisible()) {
  585 |             await this.helper.enterText(this.featureSCLPage.otherDescShortXF, testData_SCL_FF.transversalData.otherWPCShortDesc, "otherWPCShortDesc");
  586 |
  587 |         }
  588 |
  589 |         //other WPCShortDesc
  590 |         if (await this.featureSCLPage.otherWPCShortDesc.isVisible()) {
  591 |             await this.helper.enterText(this.featureSCLPage.otherWPCShortDesc, testData_SCL_FF.transversalData.otherWPCShortDesc, "otherWPCShortDesc");
  592 |
  593 |         }
  594 |
  595 |         //enter explicative note
  596 |         await this.helper.assertElementVisible(this.featureSCLPage.explicativeNote, "explicativeNote");
  597 |         await this.helper.enterText(this.featureSCLPage.explicativeNote, testData_SCL_FF.transversalData.explicativeNote, "explicativeNote");
  598 |
  599 |         // click on save button
  600 |         await this.helper.assertElementVisible(this.featureSCLPage.saveBtn, "SaveButton");
  601 |         await this.helper.clickElement(this.featureSCLPage.saveBtn, "SaveButton");
  602 |
  603 |         //click on confirmation 
  604 |         await this.helper.assertElementVisible(this.featureSCLPage.confirmationBtn, "ConfirmationButton");
  605 |         await this.helper.clickElement(this.featureSCLPage.confirmationBtn, "ConfirmationButton");
  606 |
  607 |         //Verify success message
> 608 |         await this.featureSCLPage.successMessage.waitFor({ state: 'visible', timeout: 1000000 });
      |                                                  ^ TimeoutError: locator.waitFor: Timeout 1000000ms exceeded.
  609 |         await this.helper.assertElementHasText(this.featureSCLPage.successMessage, 'SUCCESS', 'SUCCESS message displayed');
  610 |
  611 |
  612 |         const transversal = (this.scl_familyCode + this.featureCode).replace(/\s+/g, '');
  613 |         const classCodeSalescode = transversal.trim();
  614 |
  615 |         return classCodeSalescode;
  616 |     }
  617 |
  618 |
  619 |     async edit_transversal_SCL_feature_family_recycle() {
  620 |
  621 |         // delete transversal pack
  622 |         await this.helper.assertElementVisible(this.featureTransverseSearchPage.deleteIcon, "delete button");
  623 |         await this.helper.clickElement(this.featureTransverseSearchPage.deleteIcon, "delete button");
  624 |
  625 |         //Verify descriptions
  626 |         await this.helper.assertElementHasInputValues(this.featureTransverseSearchPage.singleFeatureValueDes, "To recycle", "singleFeatureValueDes");
  627 |
  628 |         await this.helper.assertElementHasInputValues(this.featureTransverseSearchPage.fullShortDesc, "To recycle", "fullShortDesc");
  629 |
  630 |         await this.helper.assertElementHasInputValues(this.featureTransverseSearchPage.otherDesc, "To recycle", "otherDesc");
  631 |
  632 |         // click on save button
  633 |         await this.helper.assertElementVisible(this.featureSCLPage.saveBtn, "SaveButton");
  634 |         await this.helper.clickElement(this.featureSCLPage.saveBtn, "SaveButton");
  635 |
  636 |         //click on confirmation 
  637 |         await this.helper.assertElementVisible(this.featureSCLPage.confirmationBtn, "ConfirmationButton");
  638 |         await this.helper.clickElement(this.featureSCLPage.confirmationBtn, "ConfirmationButton");
  639 |         this.page.waitForTimeout(10000);
  640 |
  641 |         this.featureTransverseSearchPage.alreadyExistDesc.waitFor({ timeout: 10000 })
  642 |         await this.helper.clickElement(this.featureTransverseSearchPage.fullShortDesc, "fullShortDesc");
  643 |         await this.helper.enterText(
  644 |             this.featureTransverseSearchPage.fullShortDesc,
  645 |             `To recycle_${await this.helper.generateRandomText(2)}`,
  646 |             "fullShortDesc"
  647 |         );
  648 |
  649 |         await this.helper.assertElementVisible(this.featureSCLPage.saveBtn, "SaveButton");
  650 |         await this.helper.clickElement(this.featureSCLPage.saveBtn, "SaveButton");
  651 |
  652 |         await this.helper.assertElementVisible(this.featureSCLPage.confirmationBtn, "ConfirmationButton");
  653 |         await this.helper.clickElement(this.featureSCLPage.confirmationBtn, "ConfirmationButton");
  654 |
  655 |         this.page.waitForTimeout(5000);
  656 |         await this.helper.assertElementVisible(this.featureSCLPage.successMessage, "successMessage");
  657 |
  658 |         const expectedEditMessage = `Edit feature value${this.featureCode}with success`;
  659 |
  660 |         this.verifyEditMessage = this.page.locator(`//p[contains(text(),'${expectedEditMessage}')]`);
  661 |         await this.helper.assertElementHasText(this.verifyEditMessage, expectedEditMessage, "verifyEditMessage");
  662 |
  663 |         await this.helper.clickElement(this.featureTransverseSearchPage.historyIcon, "historyIcon");
  664 |
  665 |         console.log(localizedDescriptionText + "-" + otherDescShortDescText);
  666 |         console.log(localizedDescriptionText + "-" + "To recycle");
  667 |
  668 |         await this.helper.assertElementTextContainedIn(this.featureTransverseSearchPage.fullLongDescOld, localizedDescriptionText + "-" + otherDescShortDescText, "fullLongDescOld");
  669 |         await this.helper.assertElementTextContainedIn(this.featureTransverseSearchPage.fullLongDescNew, localizedDescriptionText + "-" + "To recycle", "fullLongDescNew");
  670 |
  671 |         await this.helper.assertElementTextContainedIn(this.featureTransverseSearchPage.singleFeatureDescOld, singleFeatureValueDescriptionText, "singleFeatureValueDescriptionTextOld");
  672 |         await this.helper.assertElementTextContainedIn(this.featureTransverseSearchPage.singleFeatureDescNew, "To recycle", "singleFeatureValueDescriptionTextNew");
  673 |
  674 |         await this.helper.assertElementTextContainedIn(this.featureTransverseSearchPage.otherDescOld, otherDescShortDescText, "otherDescShortDescTextOld");
  675 |         await this.helper.assertElementTextContainedIn(this.featureTransverseSearchPage.otherDescNew, "To recycle", "otherDescShortDescTextNew");
  676 |
  677 |         await this.helper.assertElementTextContainedIn(this.featureTransverseSearchPage.fullShortDescOld, shortDescriptionText, "shortDescriptionTextOld");
  678 |         await this.helper.assertElementTextContainedIn(this.featureTransverseSearchPage.fullShortDescNew, "To recycle", "shortDescriptionTextNew");
  679 |
  680 |         await this.helper.clickElement(this.featureTransverseSearchPage.historyClose, "historyClose");
  681 |
  682 |     }
  683 |
  684 |     async edit_transversal_SCL_feature_family() {
  685 |
  686 |         await this.helper.clearText(this.featureTransverseSearchPage.singleFeatureValueDes, "single feature value description");
  687 |         await this.helper.enterText(this.featureTransverseSearchPage.singleFeatureValueDes, `Description_${await this.helper.generateRandomText(2)}`, "single feature value description");
  688 |
  689 |         await this.helper.assertElementVisible(this.featureSCLPage.copyTextSCL, "Copy feature description");
  690 |         await this.helper.clickElement(this.featureSCLPage.copyTextSCL, "Copy feature description");
  691 |
  692 |         this.page.waitForTimeout(5000);
  693 |
  694 |         // click on save button
  695 |         await this.helper.assertElementVisible(this.featureSCLPage.saveBtn, "SaveButton");
  696 |         await this.helper.clickElement(this.featureSCLPage.saveBtn, "SaveButton");
  697 |
  698 |         //click on confirmation 
  699 |         await this.helper.assertElementVisible(this.featureSCLPage.confirmationBtn, "ConfirmationButton");
  700 |         await this.helper.clickElement(this.featureSCLPage.confirmationBtn, "ConfirmationButton");
  701 |         this.page.waitForTimeout(10000);
  702 |
  703 |         await this.helper.assertElementVisible(this.featureSCLPage.saveBtn, "SaveButton");
  704 |         await this.helper.clickElement(this.featureSCLPage.saveBtn, "SaveButton");
  705 |
  706 |         await this.helper.assertElementVisible(this.featureSCLPage.confirmationBtn, "ConfirmationButton");
  707 |         await this.helper.clickElement(this.featureSCLPage.confirmationBtn, "ConfirmationButton");
  708 |
```