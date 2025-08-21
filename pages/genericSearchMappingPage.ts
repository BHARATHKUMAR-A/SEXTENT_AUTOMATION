import { Page, Locator } from '@playwright/test';
 
export class GenericSearchMappingPage{
    search:Locator;
    mappingRadioButton : Locator;
    firstToggleButton: Locator;
    sclToggleButton : Locator;
    sclCodeInputBox : Locator;
    searchIcon : Locator;
    rowLine  :Locator;
    featureFamilyCode : Locator;
    stvClassCode : Locator;
    wpcFamilyCode : Locator;
    mapping : Locator;
    mappedSTVClassCode : Locator;
    mappedWPCClassCode : Locator;
    paginator : Locator;
    rows : Locator
    localizedDesc : Locator;
    languageDropDown : Locator;
    fft : Locator;
    constructor(page : Page){
        this.search = page.locator("//*[@id='cdk-accordion-child-0']/div/mat-nav-list/a[1]/span");
        this.mappingRadioButton = page.locator("//mat-radio-button[@id='mat-radio-3']");
        this.firstToggleButton = page.locator("//mat-icon[text()='keyboard_arrow_down']");
        this.sclToggleButton = page.locator("//mat-panel-title[text()=' SCL specific criteria ']");
        this.sclCodeInputBox = page.locator("//mat-label[text()='Feature family code']");
        this.searchIcon = page.locator("//mat-icon[text()='search']");
        this.rowLine = page.locator("//*[@id='undefined'][1]");
        this.featureFamilyCode = page.locator("//mat-row[1]/mat-cell[1]/div/a");
        this.stvClassCode = page.locator("//mat-row[1]/mat-cell[9]/div/a");
        this.wpcFamilyCode = page.locator("//mat-row[1]/mat-cell[13]/div/a");
        this.mapping = page.locator("//span[text()='Mapping']");
        this.mappedSTVClassCode = page.locator("//mat-tab-body/div/step-three/section/div[2]/div[2]/div[2]/p[1]/strong");
        this.mappedWPCClassCode = page.locator("//mat-tab-body/div/step-three/section/div[2]/div[3]/div[2]/p[1]/strong");
        this.paginator = page.locator("//div[@class='bottom-section']//div[@class='mat-mdc-paginator-range-label']");
        this.rows = page.locator("//table//tbody//mat-row");
        this.localizedDesc = page.locator("//mat-label[text()='Localized description EN']");
        this.languageDropDown = page.locator("//mat-label[text()=' Languages ']");
        this.fft =page.locator("//mat-label[text()='Feature Family Categories']");
     
    }
}
 