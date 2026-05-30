import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SysprereportRoutingModule } from './sysprereport-routing.module';
import { SysprereportComponent } from './sysprereport.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxSelectBoxModule, DxNumberBoxModule, DxCheckBoxModule, DxTextBoxModule, DxDateBoxModule, DxValidatorModule, DxButtonModule } from 'devextreme-angular';
import { DxDateBoxCustomModule } from 'src/app/shareds/dx-date-box-custom/dx-date-box-custom.module';


@NgModule({
  declarations: [
    SysprereportComponent
  ],
  imports: [
    CommonModule,
    SysprereportRoutingModule,
    FormsModule,
        DxSelectBoxModule,
        DxNumberBoxModule,
        DxCheckBoxModule,
        DxTextBoxModule,
        DxDateBoxModule,
        DxValidatorModule,
        DxButtonModule,
        DxDateBoxCustomModule,
        ReactiveFormsModule
  ]
})
export class SysprereportModule { }
