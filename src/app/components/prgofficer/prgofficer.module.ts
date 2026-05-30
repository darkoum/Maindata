import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrgofficerRoutingModule } from './prgofficer-routing.module';
import { PrgofficerComponent } from './prgofficer.component';
import { DxNumberBoxModule, DxCheckBoxModule, DxSelectBoxModule, DxTextBoxModule, DxPopupModule, DxDataGridModule, DxResponsiveBoxModule, DxBoxModule, DxFormModule, DxButtonModule, DxTemplateModule, DxTabPanelModule, DxDropDownBoxModule, DxListModule, DxLoadPanelModule, DxLookupModule, DxTextAreaModule } from 'devextreme-angular';
import { FormsModule } from '@angular/forms';
import { DxDateBoxCustomModule } from "../../shareds/dx-date-box-custom/dx-date-box-custom.module";
@NgModule({
  declarations: [PrgofficerComponent],
  imports: [
    CommonModule,
    PrgofficerRoutingModule,
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
  DxTabPanelModule,
  DxTemplateModule,
  DxDateBoxCustomModule,
DxLookupModule ,
DxDropDownBoxModule,
       DxListModule,
       DxTextAreaModule,
       DxLoadPanelModule
  ]
})
export class PrgofficerModule { }
