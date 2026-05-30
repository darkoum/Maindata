import { PrglevelcodeComponent } from './prglevelcode.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrglevelcodeRoutingModule } from './prglevelcode-routing.module';


import { FormsModule } from '@angular/forms';
import { DxDataGridModule, DxButtonModule, DxPopupModule, DxTextBoxModule, DxSelectBoxModule,DxTabsModule} from 'devextreme-angular';
@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    PrglevelcodeRoutingModule,
    FormsModule,
    DxTabsModule,
    DxSelectBoxModule,
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule,
    DxTextBoxModule
  ]
})
export class PrglevelcodeModule { }
