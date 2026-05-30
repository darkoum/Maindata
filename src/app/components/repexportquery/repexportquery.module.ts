import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepexportqueryRoutingModule } from './repexportquery-routing.module';
import { RepexportqueryComponent } from './repexportquery.component';
import { DxNumberBoxModule, DxCheckBoxModule, DxSelectBoxModule,DxAccordionModule,DxTextBoxModule, DxPopupModule, DxDataGridModule, DxResponsiveBoxModule, DxBoxModule, DxFormModule, DxButtonModule, DxDropDownBoxModule, DxLookupModule, DxTagBoxModule, DxValidatorModule } from 'devextreme-angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [RepexportqueryComponent],
  imports: [
    CommonModule,
    RepexportqueryRoutingModule,
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
export class RepexportqueryModule { }
