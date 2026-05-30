import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrgcourseequivalentRoutingModule } from './prgcourseequivalent-routing.module';
import { PrgcourseequivalentComponent } from './prgcourseequivalent.component';
import { DxLoadPanelModule ,DxBoxModule, DxButtonModule, DxCheckBoxModule, DxDataGridModule, DxFormModule, DxLookupModule, DxNumberBoxModule, DxPopupModule, DxResponsiveBoxModule, DxSelectBoxModule, DxTabPanelModule, DxTextBoxModule } from 'devextreme-angular';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [PrgcourseequivalentComponent],
  imports: [
    CommonModule,
    PrgcourseequivalentRoutingModule,
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
  DxTabPanelModule,
  DxLoadPanelModule
  ]
})
export class PrgcourseequivalentModule { }
