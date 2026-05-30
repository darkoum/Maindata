import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrgdegreeRoutingModule } from './prgdegree-routing.module';
import { PrgdegreeComponent } from './prgdegree.component';
import { DxButtonModule, DxDataGridModule, DxPopupModule ,DxResponsiveBoxModule } from 'devextreme-angular';


@NgModule({
  declarations: [PrgdegreeComponent],
  imports: [
    CommonModule,
    PrgdegreeRoutingModule,
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule,
    DxResponsiveBoxModule 

  ]
})
export class PrgdegreeModule { }
