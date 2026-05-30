import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrgcourseRoutingModule } from './prgcourse-routing.module';
import { PrgcourseComponent } from './prgcourse.component';
import { FormsModule } from '@angular/forms';
import { DxNumberBoxModule, DxCheckBoxModule,DxLoadPanelModule, DxTextAreaModule,DxScrollViewModule,DxSelectBoxModule,DxLookupModule,DxListModule,DxDropDownBoxModule, DxTextBoxModule, DxPopupModule, DxDataGridModule, DxResponsiveBoxModule, DxBoxModule, DxFormModule, DxButtonModule } from 'devextreme-angular';


@NgModule({
  declarations: [PrgcourseComponent],
  imports: [
    CommonModule,
    PrgcourseRoutingModule,
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
  DxLookupModule ,
  DxDropDownBoxModule,
         DxListModule,
         DxTextAreaModule,
         DxLoadPanelModule,
         DxScrollViewModule
  ]
})
export class PrgcourseModule { }
