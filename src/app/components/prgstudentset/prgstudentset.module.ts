import { FormsModule } from '@angular/forms';
import { DxDataGridModule, DxButtonModule, DxPopupModule, DxTextBoxModule, DxSelectBoxModule, DxLookupModule ,DxNumberBoxModule, DxLoadPanelModule } from 'devextreme-angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrgstudentsetRoutingModule } from './prgstudentset-routing.module';
import { PrgstudentsetComponent } from './prgstudentset.component';
import { DxDateBoxCustomModule } from 'src/app/shareds/dx-date-box-custom/dx-date-box-custom.module';


@NgModule({
  declarations: [PrgstudentsetComponent],
  imports: [
    CommonModule,
    PrgstudentsetRoutingModule,
    FormsModule,
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule,
    DxTextBoxModule,
    DxSelectBoxModule,
    DxNumberBoxModule,
    DxLookupModule ,
    DxDateBoxCustomModule,
    DxLoadPanelModule
  ]
})
export class PrgstudentsetModule { }
