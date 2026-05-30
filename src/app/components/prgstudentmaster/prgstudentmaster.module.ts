import { DxiColumnModule, DxoEditingModule, DxoLookupModule } from 'devextreme-angular/ui/nested';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrgstudentmasterRoutingModule } from './prgstudentmaster-routing.module';
import { PrgstudentmasterComponent } from './prgstudentmaster.component';
import {
    DxNumberBoxModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    DxPopupModule,
    DxDataGridModule,
    DxResponsiveBoxModule,
    DxBoxModule,
    DxFormModule,
    DxButtonModule,
    DxAccordionModule,
    DxLoadPanelModule,
    DxLookupModule,
} from 'devextreme-angular';
import { FormsModule } from '@angular/forms';
import { DxDateBoxCustomModule } from 'src/app/shareds/dx-date-box-custom/dx-date-box-custom.module';

@NgModule({
    declarations: [PrgstudentmasterComponent],
    imports: [
        CommonModule,
        PrgstudentmasterRoutingModule,
        DxSelectBoxModule,
        DxNumberBoxModule,
        DxCheckBoxModule,
        DxTextBoxModule,
        DxDataGridModule,
        DxPopupModule,
        DxResponsiveBoxModule,
        DxBoxModule,
        DxFormModule,
        DxButtonModule,
        FormsModule,
        DxAccordionModule,
        DxLoadPanelModule,
        DxoEditingModule,
        DxLookupModule,
        DxoLookupModule,
        DxiColumnModule,
        DxDateBoxCustomModule
    ],
})
export class PrgstudentmasterModule {}
