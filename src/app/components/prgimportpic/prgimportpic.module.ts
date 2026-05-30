import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrgimportpicRoutingModule } from './prgimportpic-routing.module';
import { PrgimportpicComponent } from './prgimportpic.component';
import { DxDataGridModule, DxButtonModule, DxPopupModule, DxValidatorModule, DxDateBoxModule, DxTextBoxModule, DxCheckBoxModule, DxNumberBoxModule, DxSelectBoxModule, DxRadioGroupModule, DxTabPanelModule, DxLoadPanelModule } from 'devextreme-angular';
import { DxDateBoxCustomModule } from 'src/app/shareds/dx-date-box-custom/dx-date-box-custom.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PrgimportpicComponent
  ],
  imports: [
    CommonModule,
    PrgimportpicRoutingModule,
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule,
    FormsModule,
        DxSelectBoxModule,
        DxNumberBoxModule,
        DxCheckBoxModule,
        DxTextBoxModule,
        DxDateBoxModule,
        DxValidatorModule,
        DxDateBoxCustomModule,
        DxRadioGroupModule,
        DxTabPanelModule,
        DxLoadPanelModule,
  ]
})
export class PrgimportpicModule { }
