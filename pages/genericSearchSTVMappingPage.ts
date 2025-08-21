import { Page,Locator} from "@playwright/test";
 
export class GenericSearchSTVMappingPage{
 
    search:Locator;
    mappingRadioButton : Locator;
    firstToggleButton: Locator;
    stvToggleButton : Locator;
    stvClassCode : Locator;
    searchIcon : Locator;
    rowLine  :Locator;
    paginator : Locator;
    rows : Locator;
    localizedDesc : Locator;
    mapping : Locator;
    mappedSclCode : Locator;
    mappedWPCClassCode : Locator;
   
 
    constructor(page:Page){
 
        this.search = page.locator("//*[@id='cdk-accordion-child-0']/div/mat-nav-list/a[1]/span");
        this.mappingRadioButton = page.locator("//mat-radio-button[@id='mat-radio-3']");
        this.firstToggleButton = page.locator("//mat-icon[text()='keyboard_arrow_down']");
        this.stvToggleButton = page.locator("//mat-panel-title[text()=' STV specific criteria ']");
        this.stvClassCode = page.locator("//mat-label[text()='Class code']");
        this.searchIcon = page.locator("//mat-icon[text()='search']");
        this.rowLine = page.locator("//*[@id='undefined'][1]");
        this.paginator = page.locator("//div[@class='bottom-section']//div[@class='mat-mdc-paginator-range-label']");
        this.rows = page.locator("//table/tbody/mat-row");
        this.localizedDesc = page.locator("//mat-label[text()='Localized description EN']");
        this.mapping = page.locator("//span[text()='Mapping']");
        this.mappedSclCode = page.locator("//mat-tab-body/div/step-three/section/div[2]/div[1]/div[2]/p[1]/span[1]/strong");
        this.mappedWPCClassCode = page.locator("//mat-tab-body/div/step-three/section/div[2]/div[3]/div[2]/p[1]/strong");
       
    }
}