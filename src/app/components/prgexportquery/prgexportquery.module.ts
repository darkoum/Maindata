import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrgexportqueryRoutingModule } from './prgexportquery-routing.module';
import { PrgexportqueryComponent } from './prgexportquery.component';
import { DxNumberBoxModule, DxCheckBoxModule, DxSelectBoxModule,DxAccordionModule,DxTextBoxModule, DxPopupModule, DxDataGridModule, DxResponsiveBoxModule, DxBoxModule, DxFormModule, DxButtonModule, DxDropDownBoxModule, DxLookupModule, DxTagBoxModule, DxValidatorModule } from 'devextreme-angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PrgexportqueryComponent],
  imports: [
    CommonModule,
    PrgexportqueryRoutingModule,
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
  DxDropDownBoxModule,
  DxLookupModule ,
  DxAccordionModule,
  DxTagBoxModule,
  DxValidatorModule

  ]
})
export class PrgexportqueryModule { }
