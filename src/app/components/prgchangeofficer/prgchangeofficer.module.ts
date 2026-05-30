import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrgchangeofficerRoutingModule } from './prgchangeofficer-routing.module';
import { PrgchangeofficerComponent } from './prgchangeofficer.component';
import {
  DxNumberBoxModule,
  DxCheckBoxModule,
  DxSelectBoxModule,
  DxTagBoxModule,
  DxValidatorModule,
  DxTextBoxModule,
  DxAccordionModule,
  DxLookupModule,
  DxPopupModule,
  DxDataGridModule,
  DxResponsiveBoxModule,
  DxBoxModule,
  DxFormModule,
  DxButtonModule,
  DxDropDownBoxModule,
  DxLoadPanelModule,
} from 'devextreme-angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PrgchangeofficerComponent],
  imports: [
    CommonModule,
    PrgchangeofficerRoutingModule,
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
    DxLookupModule,
    DxAccordionModule,
    DxTagBoxModule,
    DxValidatorModule,
    DxLoadPanelModule,
  ],
})
export class PrgchangeofficerModule {}
