import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PrggraduateprogramsetRoutingModule } from "./prggraduateprogramset-routing.module";
import { PrggraduateprogramsetComponent } from "./prggraduateprogramset.component";
import { FormsModule } from "@angular/forms";
import {
  DxButtonModule,
  DxDataGridModule,
  DxPopupModule,
  DxSelectBoxModule,
  DxTextBoxModule,
  DxNumberBoxModule,
  DxLoadPanelModule,
} from "devextreme-angular";

@NgModule({
  declarations: [PrggraduateprogramsetComponent],
  imports: [
    CommonModule,
    PrggraduateprogramsetRoutingModule,
    FormsModule,
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule,
    DxTextBoxModule,
    DxSelectBoxModule,
    DxNumberBoxModule,
    DxLoadPanelModule,
  ],
})
export class PrggraduateprogramsetModule {}
