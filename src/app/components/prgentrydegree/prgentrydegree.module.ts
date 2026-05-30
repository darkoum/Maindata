import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrgentrydegreeRoutingModule } from './prgentrydegree-routing.module';


import { FormsModule } from '@angular/forms';
import { DxDataGridModule, DxButtonModule, DxPopupModule, DxTextBoxModule, DxSelectBoxModule,DxTabsModule} from 'devextreme-angular';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PrgentrydegreeRoutingModule,
    FormsModule,
    DxTabsModule,
    DxSelectBoxModule,
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule,
    DxTextBoxModule
  ]
})
export class PrgentrydegreeModule { }
