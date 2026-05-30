import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrgofficertypeRoutingModule } from './prgofficertype-routing.module';
import { PrgofficertypeComponent } from './prgofficertype.component';
import { DxButtonModule, DxDataGridModule, DxPopupModule } from 'devextreme-angular';


@NgModule({
  declarations: [PrgofficertypeComponent],
  imports: [
    CommonModule,
    PrgofficertypeRoutingModule,
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule
  ]
})
export class PrgofficertypeModule { }
