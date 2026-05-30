import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrgstudentbioentryRoutingModule } from './prgstudentbioentry-routing.module';
import { PrgstudentbioentryComponent } from './prgstudentbioentry.component';
import { DxDataGridModule, DxButtonModule, DxPopupModule, DxTextBoxModule, DxSelectBoxModule, DxTabPanelModule,DxFormModule,DxListModule,DxTabsModule, DxDateBoxModule, DxLoadPanelModule, DxValidatorModule, DxValidatorComponent, DxValidationSummaryModule } from 'devextreme-angular';
import { FormsModule } from '@angular/forms';
import { DxDateBoxCustomModule } from 'src/app/shareds/dx-date-box-custom/dx-date-box-custom.module';

@NgModule({
  declarations: [PrgstudentbioentryComponent],
  imports: [
    CommonModule,
    PrgstudentbioentryRoutingModule,
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
    DxDateBoxCustomModule,
    DxLoadPanelModule
  ]
})
export class PrgstudentbioentryModule { }
