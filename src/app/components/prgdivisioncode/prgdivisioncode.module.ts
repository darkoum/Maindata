import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrgdivisioncodeRoutingModule } from './prgdivisioncode-routing.module';


import { FormsModule } from '@angular/forms';
import { DxDataGridModule, DxButtonModule, DxPopupModule, DxTextBoxModule, DxSelectBoxModule,DxTabsModule} from 'devextreme-angular';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PrgdivisioncodeRoutingModule,
    FormsModule,
    DxTabsModule,
    DxSelectBoxModule,
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule,
    DxTextBoxModule
  ]
})
export class PrgdivisioncodeModule { }
