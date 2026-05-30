import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrgstudentdocumentRoutingModule } from './prgstudentdocument-routing.module';
import { PrgstudentdocumentComponent } from './prgstudentdocument.component';
import { FormsModule } from '@angular/forms';
import { DxDataGridModule, DxButtonModule, DxPopupModule, DxTextBoxModule, DxSelectBoxModule, DxTabPanelModule, DxDateBoxModule, DxToolbarModule } from 'devextreme-angular';
import { DxDateBoxCustomModule } from 'src/app/shareds/dx-date-box-custom/dx-date-box-custom.module';
import { StudentSelectorModule } from 'src/app/shareds/student-selector/student-selector.module';


@NgModule({
  declarations: [
    PrgstudentdocumentComponent
  ],
  imports: [
    CommonModule,
    PrgstudentdocumentRoutingModule,
    FormsModule,
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule,
    DxTextBoxModule,
    DxSelectBoxModule,
    DxTabPanelModule,
    DxDateBoxModule,
    DxToolbarModule,
    DxDateBoxCustomModule,
    StudentSelectorModule
  ]
})
export class PrgstudentdocumentModule { }
