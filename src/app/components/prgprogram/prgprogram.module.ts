import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrgprogramRoutingModule } from './prgprogram-routing.module';
import { PrgprogramComponent } from './prgprogram.component';
import { FormsModule } from '@angular/forms';
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
    DxLoadPanelModule,
} from 'devextreme-angular';
import { DxDateBoxCustomModule } from 'src/app/shareds/dx-date-box-custom/dx-date-box-custom.module';

@NgModule({
    declarations: [PrgprogramComponent],
    imports: [
        CommonModule,
        PrgprogramRoutingModule,
        FormsModule,
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
        DxDateBoxCustomModule,
        DxLoadPanelModule,
    ],
})
export class PrgprogramModule {}
