import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrgstudentgroupRoutingModule } from './prgstudentgroup-routing.module';
import { PrgstudentgroupComponent } from './prgstudentgroup.component';
import { FormsModule } from '@angular/forms';
import { DxButtonModule, DxDataGridModule, DxPopupModule, DxSelectBoxModule, DxTextBoxModule,DxNumberBoxModule } from 'devextreme-angular';


@NgModule({
  declarations: [PrgstudentgroupComponent],
  imports: [
    CommonModule,
    PrgstudentgroupRoutingModule,
    FormsModule,
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule,
    DxTextBoxModule,
    DxSelectBoxModule,
    DxNumberBoxModule
  ]
})
export class PrgstudentgroupModule { }
