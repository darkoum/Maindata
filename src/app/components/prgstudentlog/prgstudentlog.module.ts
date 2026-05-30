import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrgstudentlogRoutingModule } from './prgstudentlog-routing.module';
import { PrgstudentlogComponent } from './prgstudentlog.component';
import { FormsModule } from '@angular/forms';
import { DxDataGridModule, DxButtonModule, DxPopupModule, DxTextBoxModule, DxSelectBoxModule, DxTabPanelModule, DxDateBoxModule } from 'devextreme-angular';
import { StudentSelectorModule } from 'src/app/shareds/student-selector/student-selector.module';


@NgModule({
  declarations: [
    PrgstudentlogComponent
  ],
  imports: [
    CommonModule,
    PrgstudentlogRoutingModule,
    FormsModule,
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule,
    DxTextBoxModule,
    DxSelectBoxModule,
    DxTabPanelModule,
    DxDateBoxModule,
    StudentSelectorModule,
  ]
})
export class PrgstudentlogModule { }
