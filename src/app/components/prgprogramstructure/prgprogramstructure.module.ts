import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrgprogramstructureRoutingModule } from './prgprogramstructure-routing.module';
import { PrgprogramstructureComponent } from './prgprogramstructure.component';
import { DxNumberBoxModule, DxCheckBoxModule,DxTabPanelModule, DxSelectBoxModule, DxTextBoxModule, DxPopupModule, DxDataGridModule, DxResponsiveBoxModule,DxLookupModule , DxBoxModule, DxFormModule, DxButtonModule } from 'devextreme-angular';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [PrgprogramstructureComponent],
  imports: [
    CommonModule,
    PrgprogramstructureRoutingModule,
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
  DxTabPanelModule
  ]
})
export class PrgprogramstructureModule { }
