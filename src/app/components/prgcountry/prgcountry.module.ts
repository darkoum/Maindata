import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrgcountryRoutingModule } from './prgcountry-routing.module';
import { PrgcountryComponent } from './prgcountry.component';
import {
    DxButtonModule,
    DxDataGridModule,
    DxPopupModule,
    DxTextBoxModule,
    DxSelectBoxModule,
} from 'devextreme-angular';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        PrgcountryRoutingModule,
        FormsModule,
        DxDataGridModule,
        DxButtonModule,
        DxPopupModule,
        DxTextBoxModule,
        DxSelectBoxModule,
    ],
})
export class PrgcountryModule {}
