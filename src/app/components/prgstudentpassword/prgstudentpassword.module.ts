import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PrgstudentpasswordRoutingModule } from "./prgstudentpassword-routing.module";
import { IdentityPipe, PrgstudentpasswordComponent } from "./prgstudentpassword.component";
import {
  DxNumberBoxModule,
  DxCheckBoxModule,
  DxSelectBoxModule,
  DxTextBoxModule,
  DxPopupModule,
  DxDataGridModule,
  DxResponsiveBoxModule,
  DxBoxModule,
  DxFormModule,
  DxButtonModule,
  DxTemplateModule,
  DxTabPanelModule,
  DxDropDownBoxModule,
  DxListModule,
  DxLoadPanelModule,
  DxLookupModule,
  DxTextAreaModule,
  DxValidatorModule,
} from "devextreme-angular";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [PrgstudentpasswordComponent, IdentityPipe],
  imports: [
    CommonModule,
    PrgstudentpasswordRoutingModule,
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
    DxLookupModule,
    DxDropDownBoxModule,
    DxListModule,
    DxTextAreaModule,
    DxLoadPanelModule,
    DxValidatorModule
  ],
})
export class PrgstudentpasswordModule {}
