import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrgprovinceconfigRoutingModule } from './prgprovinceconfig-routing.module';
import { PrgprovinceconfigComponent } from './prgprovinceconfig.component';
import { DxDataGridModule, DxButtonModule, DxPopupModule } from 'devextreme-angular';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PrgprovinceconfigRoutingModule,
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule
  ]
})
export class PrgprovinceconfigModule { }
