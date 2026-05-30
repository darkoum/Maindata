import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemplateprereportRoutingModule } from './systemplateprereport-routing.module';
import { SystemplateprereportComponent } from './systemplateprereport.component';
import { FormsModule } from '@angular/forms';
import { DxButtonModule, DxCheckBoxModule, DxDateBoxModule, DxNumberBoxModule, DxSelectBoxModule, DxTextBoxModule, DxValidatorModule } from 'devextreme-angular';

@NgModule({
  declarations: [SystemplateprereportComponent],
  imports: [
    CommonModule,
    SystemplateprereportRoutingModule,
    FormsModule,
    DxSelectBoxModule,
    DxNumberBoxModule,
    DxCheckBoxModule,
    DxTextBoxModule,
    DxDateBoxModule,
    DxValidatorModule,
    DxButtonModule,
  ]
})
export class SystemplateprereportModule { }
