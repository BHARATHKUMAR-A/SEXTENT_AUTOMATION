import { Page, Locator } from '@playwright/test';
 
export class GenericWPCPage {
    classCode : Locator;
    search:Locator;
    rowLine : Locator;
    searchByCode : Locator;
    searchIcon : Locator;
    firstDropdown : Locator;
    secondSpanToggle : Locator;
 
    //wpc mapping FF and FV
    mappingButton : Locator;
    wpcSpecDropdown : Locator;
    wpcFamCode : Locator;
    sclFtFamily : Locator;
    sclDescription : Locator;
    stvClassCode : Locator;
    mappingSection : Locator;
    wpcFamilyCode : Locator;
    mappedStvClassCode: Locator;
    mappedSCLFFCode : Locator;
    mappedWPCCode : Locator;
    paginator : Locator;
    rows : Locator;
    localizedDescription : Locator;
 
 
    constructor (page:Page){
        //baidehi
        this.search = page.locator("//*[@id='cdk-accordion-child-0']/div/mat-nav-list/a[1]/span");
        //this.rowLine = page.locator("//*[@id='tree-table']/tbody/mat-row[2]");
        this.searchIcon = page.locator("//mat-icon[text()='search']");
        this.rowLine = page.locator("//*[@id='undefined'][1]");
        this.firstDropdown = page.locator("//mat-icon[text()='keyboard_arrow_down']");
        this.secondSpanToggle = page.locator("//*[@id='mat-expansion-panel-header-4']/span[2]");
        this.mappingButton = page.locator("//mat-radio-button[@id='mat-radio-3']");
        this.wpcSpecDropdown = page.locator("//mat-panel-title[text()=' WPC specific criteria ']");
        this.wpcFamCode = page.locator("//mat-label[text()='Family code']");
        this.sclFtFamily = page.locator("//mat-row[1]/mat-cell[1]/div/a");
        this.sclDescription = page.locator("//mat-row[1]/mat-cell[2]/div/a");
        this.stvClassCode = page.locator("//mat-row[1]/mat-cell[9]/div/a");
        this.mappingSection = page.locator("//span[text()='Mapping']");
        this.wpcFamilyCode = page.locator("//mat-row[1]/mat-cell[13]/div/a");
        this.mappedStvClassCode = page.locator("//mat-tab-body/div/step-three/section/div[2]/div[2]/div[2]/p[1]/strong");
        this.mappedSCLFFCode = page.locator("//mat-tab-body/div/step-three/section/div[2]/div[1]/div[2]/p[1]/span[1]/strong");
        this.mappedWPCCode = page.locator("//mat-tab-body/div/step-three/section/div[2]/div[3]/div[2]/p[1]/strong");
        this.paginator = page.locator("//div[@class='bottom-section']//div[@class='mat-mdc-paginator-range-label']");
        this.rows = page.locator("//table/tbody/mat-row");
        this.localizedDescription = page.locator("//mat-label[text()='Localized description EN']");
    }
}