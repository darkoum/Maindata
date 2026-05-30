import { DxBoxModule, DxButtonModule, DxCheckBoxModule, DxFormModule, DxNumberBoxModule, DxPopupModule, DxResponsiveBoxModule, DxSelectBoxModule, DxTextBoxModule } from 'devextreme-angular';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { PrgfacultyRoutingModule } from './prgfaculty-routing.module';
import { PrgfacultyComponent } from './prgfaculty.component';


@NgModule({
  declarations: [PrgfacultyComponent],
  imports: [
    CommonModule,
    PrgfacultyRoutingModule,
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
  DxButtonModule
  ]
})
export class PrgfacultyModule { }
