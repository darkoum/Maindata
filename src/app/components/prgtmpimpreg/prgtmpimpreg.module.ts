import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrgtmpimpregComponent } from './prgtmpimpreg.component';
import { FormsModule } from '@angular/forms';
import { DxDataGridModule, DxButtonModule, DxPopupModule, DxFormModule, DxSelectBoxModule, DxNumberBoxModule, DxTextBoxModule, DxDateBoxModule, DxLookupModule, DxBoxModule, DxCalendarModule, DxTextAreaModule, DxLoadPanelModule } from 'devextreme-angular';
import { DxDateBoxCustomModule } from "../../shareds/dx-date-box-custom/dx-date-box-custom.module";
import { PrgtmpimpregRoutingModule } from './prgtmpimpreg-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PrgtmpimpregRoutingModule,
    FormsModule,
            DxSelectBoxModule,
            DxNumberBoxModule,
            DxTextBoxModule,
            DxDataGridModule,
            DxPopupModule,
            DxBoxModule,
            DxFormModule,
            DxButtonModule,
            DxDateBoxModule,
            DxLookupModule,
            DxCalendarModule,
            DxTextAreaModule,
            DxLoadPanelModule,
            DxDateBoxCustomModule
  ],
  declarations: [PrgtmpimpregComponent]
})
export class PrgtmpimpregModule { }
