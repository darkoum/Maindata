import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrgnationRoutingModule } from './prgnation-routing.module';
import { PrgnationComponent } from './prgnation.component';
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
        PrgnationRoutingModule,
        FormsModule,
        DxDataGridModule,
        DxButtonModule,
        DxPopupModule,
        DxTextBoxModule,
        DxSelectBoxModule,
    ],
})
export class PrgnationModule {}
