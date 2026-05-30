import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrgsearchstudentRoutingModule } from './prgsearchstudent-routing.module';
import { PrgsearchstudentComponent } from './prgsearchstudent.component';
import { FormsModule } from '@angular/forms';
import { DxAccordionModule, DxButtonModule, DxCheckBoxModule, DxDataGridModule, DxFormModule, DxLoadPanelModule, DxNumberBoxModule, DxPopupModule, DxSelectBoxModule, DxTabPanelModule, DxTemplateModule, DxTextBoxModule, DxValidatorModule } from 'devextreme-angular';


@NgModule({
  declarations: [PrgsearchstudentComponent],
  imports: [
    CommonModule,
    PrgsearchstudentRoutingModule,
    FormsModule,
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule,
    DxTextBoxModule,
    DxTabPanelModule,
    DxTemplateModule,
    DxFormModule,
    DxNumberBoxModule,
    DxValidatorModule,
    DxCheckBoxModule,
    DxAccordionModule,
    DxSelectBoxModule,
    DxLoadPanelModule
  ]
})
export class PrgsearchstudentModule { }
