import { DxCheckBoxModule, DxNumberBoxModule, DxSelectBoxModule, DxTextBoxModule, DxButtonModule, DxListModule, DxDateBoxModule, DxLoadPanelModule, DxPopupModule, DxDataGridModule } from 'devextreme-angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrgstudentcopyRoutingModule } from './prgstudentcopy-routing.module';
import { PrgstudentcopyComponent } from './prgstudentcopy.component';
import { FormsModule } from '@angular/forms';
import { DxDateBoxCustomModule } from "../../shareds/dx-date-box-custom/dx-date-box-custom.module";




@NgModule({
    declarations: [PrgstudentcopyComponent],
    imports: [
        CommonModule,
        PrgstudentcopyRoutingModule,
        FormsModule,
        DxTextBoxModule,
        DxNumberBoxModule,
        DxCheckBoxModule,
        DxSelectBoxModule,
        DxButtonModule,
        DxListModule,
        DxDateBoxModule,
        DxLoadPanelModule,
        DxPopupModule,
        DxDataGridModule,
        DxDateBoxCustomModule
    ]
})
export class PrgstudentcopyModule { }
