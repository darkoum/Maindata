import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrgstudenttransferRoutingModule } from './prgstudenttransfer-routing.module';
import { PrgstudenttransferComponent } from './prgstudenttransfer.component';

import { FormsModule } from '@angular/forms';
import {
    DxSelectBoxModule,
    DxTextAreaModule,
    DxDateBoxModule,
    DxFormModule,
    DxButtonModule,
    DxPopupModule,
    DxTextBoxModule,
    DxTemplateModule,
    DxDataGridModule,
    DxDropDownBoxModule,
    DxLookupModule,
    DxBoxModule,
    DxAccordionModule,
    DxNumberBoxModule,
    DxLoadPanelModule,
    DxScrollViewModule
} from 'devextreme-angular';
import { DxDateBoxCustomModule } from "../../shareds/dx-date-box-custom/dx-date-box-custom.module";

@NgModule({
    declarations: [PrgstudenttransferComponent],
    imports: [
        CommonModule,
        PrgstudenttransferRoutingModule,
        FormsModule,
        DxSelectBoxModule,
        DxTextAreaModule,
        DxDateBoxModule,
        DxFormModule,
        DxButtonModule,
        DxPopupModule,
        DxTextBoxModule,
        DxTemplateModule,
        DxDataGridModule,
        DxDropDownBoxModule,
        DxLookupModule,
        DxBoxModule,
        DxAccordionModule,
        DxNumberBoxModule,
        DxLoadPanelModule,
        DxDateBoxCustomModule,
        DxScrollViewModule
    ]
})
export class PrgstudenttransferModule {}
