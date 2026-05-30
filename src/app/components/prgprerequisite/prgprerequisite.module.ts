import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrgprerequisiteRoutingModule } from './prgprerequisite-routing.module';
import { PrgprerequisiteComponent } from './prgprerequisite.component';

import { FormsModule } from '@angular/forms';
import {
	DxSelectBoxModule,
	DxTextAreaModule,
	DxDateBoxModule,
	DxFormModule,
  DxButtonModule, 
  DxPopupModule, 
  DxTextBoxModule,
  DxTemplateModule,
  DxDataGridModule,
  DxDropDownBoxModule,
  DxLookupModule,
  DxLoadPanelModule
} from 'devextreme-angular';

@NgModule({
  declarations: [PrgprerequisiteComponent],
  imports: [
    CommonModule,
    PrgprerequisiteRoutingModule,
    FormsModule,
    DxSelectBoxModule,
		DxTextAreaModule,
		DxDateBoxModule,
		DxFormModule,
    DxButtonModule,
    DxPopupModule,
    DxTextBoxModule,
    DxTemplateModule,
    DxDataGridModule,
    DxDropDownBoxModule,
    DxLookupModule,
    DxLoadPanelModule,
  ]
})
export class PrgprerequisiteModule { }
