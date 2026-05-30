import { DxDataGridModule, DxButtonModule, DxPopupModule } from 'devextreme-angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrgprogramcodeRoutingModule } from './prgprogramcode-routing.module';
import { PrgprogramcodeComponent } from './prgprogramcode.component';


@NgModule({
  declarations: [PrgprogramcodeComponent],
  imports: [
    CommonModule,
    PrgprogramcodeRoutingModule,
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule
  ]
})
export class PrgprogramcodeModule { }
