import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrglevelRoutingModule } from './prglevel-routing.module';
import { PrglevelComponent } from './prglevel.component';
import { DxDataGridModule, DxButtonModule, DxPopupModule } from 'devextreme-angular';

@NgModule({
  declarations: [
    PrglevelComponent
  ],
  imports: [
    CommonModule,
    PrglevelRoutingModule,
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule
  ]
})
export class PrglevelModule { }
