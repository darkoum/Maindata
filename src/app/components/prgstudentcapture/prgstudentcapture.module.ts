import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrgstudentcaptureRoutingModule } from './prgstudentcapture-routing.module';
import { PrgstudentcaptureComponent } from './prgstudentcapture.component';
import { FormsModule } from '@angular/forms';
import { DxButtonModule, DxCheckBoxModule, DxDataGridModule, DxDateBoxModule, DxFileUploaderModule, DxNumberBoxModule, DxPopupModule, DxRadioGroupModule, DxSelectBoxModule, DxTabPanelModule, DxTextBoxModule } from 'devextreme-angular';
import { DxDateBoxCustomModule } from 'src/app/shareds/dx-date-box-custom/dx-date-box-custom.module';
import { StudentSelectorModule } from 'src/app/shareds/student-selector/student-selector.module';


@NgModule({
  declarations: [
    PrgstudentcaptureComponent
  ],
  imports: [
    CommonModule,
    PrgstudentcaptureRoutingModule,
    FormsModule,
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule,
    DxTextBoxModule,
    DxSelectBoxModule,
    DxTabPanelModule,
    DxDateBoxModule,
    DxDateBoxCustomModule, 
    DxCheckBoxModule,
    DxNumberBoxModule,
    DxFileUploaderModule,
    DxRadioGroupModule,
    StudentSelectorModule
  ]
})
export class PrgstudentcaptureModule { }
