import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrgstudentallinfoRoutingModule } from './prgstudentallinfo-routing.module';
import { PrgstudentallinfoComponent } from './prgstudentallinfo.component';
import { DxDataGridModule, DxButtonModule, DxPopupModule, DxTextBoxModule, DxSelectBoxModule, DxTabPanelModule,DxFormModule,DxListModule,DxTabsModule, DxDateBoxModule } from 'devextreme-angular';
import { FormsModule } from '@angular/forms';
import { StudentSelectorModule } from 'src/app/shareds/student-selector/student-selector.module';



@NgModule({
  declarations: [PrgstudentallinfoComponent],
  imports: [
    CommonModule,
    PrgstudentallinfoRoutingModule,
    FormsModule,
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule,
    DxTextBoxModule,
    DxSelectBoxModule,
    DxTabPanelModule,
    DxTabsModule,
    DxFormModule,
    DxDateBoxModule,
    DxListModule,
    StudentSelectorModule
  ]
})
export class PrgstudentallinfoModule { }
