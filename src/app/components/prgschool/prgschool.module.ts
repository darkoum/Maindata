import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrgschoolRoutingModule } from './prgschool-routing.module';


import { FormsModule } from '@angular/forms';
import { DxDataGridModule, DxButtonModule, DxPopupModule, DxTextBoxModule, DxSelectBoxModule,DxTabsModule} from 'devextreme-angular';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PrgschoolRoutingModule,
    FormsModule,
    DxTabsModule,
    DxSelectBoxModule,
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule,
    DxTextBoxModule
  ]
})
export class PrgschoolModule { }
