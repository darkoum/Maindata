import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrgprogramgroupRoutingModule } from './prgprogramgroup-routing.module';
import { FormsModule } from '@angular/forms';
import { DxButtonModule, DxDataGridModule, DxPopupModule, DxSelectBoxModule, DxTabsModule, DxTextBoxModule } from 'devextreme-angular';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PrgprogramgroupRoutingModule,
    FormsModule,
    DxTabsModule,
    DxSelectBoxModule,
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule,
    DxTextBoxModule
  ]
})
export class PrgprogramgroupModule { }
