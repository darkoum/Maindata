import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrgreligionRoutingModule } from './prgreligion-routing.module';
import { PrgreligionComponent } from './prgreligion.component';

import { FormsModule } from '@angular/forms';
import { DxDataGridModule, DxButtonModule, DxPopupModule, DxTextBoxModule, DxSelectBoxModule,DxTabsModule} from 'devextreme-angular';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PrgreligionRoutingModule,
    FormsModule,
    DxTabsModule,
    DxSelectBoxModule,
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule,
    DxTextBoxModule
  ]
})
export class PrgreligionModule { }
