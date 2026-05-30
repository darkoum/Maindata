import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrgprefixRoutingModule } from './prgprefix-routing.module';

import { FormsModule } from '@angular/forms';
import { DxDataGridModule, DxButtonModule, DxPopupModule, DxTextBoxModule, DxSelectBoxModule,DxTabsModule} from 'devextreme-angular';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PrgprefixRoutingModule,
    FormsModule,
    DxTabsModule,
    DxSelectBoxModule,
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule,
    DxTextBoxModule,
  ]
})
export class PrgprefixModule { }
