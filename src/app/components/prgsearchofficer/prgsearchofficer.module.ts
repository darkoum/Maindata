import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrgsearchofficerRoutingModule } from './prgsearchofficer-routing.module';
import { PrgsearchofficerComponent } from './prgsearchofficer.component';
import { FormsModule } from '@angular/forms';
import { DxAccordionModule, DxBoxModule, DxButtonModule, DxCheckBoxModule, DxDataGridModule, DxDropDownBoxModule, DxFormModule, DxLookupModule, DxNumberBoxModule, DxPopupModule, DxResponsiveBoxModule, DxSelectBoxModule, DxTagBoxModule, DxTextBoxModule, DxValidatorModule } from 'devextreme-angular';
import dxCheckBox from 'devextreme/ui/check_box';


@NgModule({
  declarations: [PrgsearchofficerComponent],
  imports: [
    CommonModule,
    PrgsearchofficerRoutingModule,
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
export class PrgsearchofficerModule { }
