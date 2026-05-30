import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrgquestionRoutingModule } from './prgquestion-routing.module';
import { PrgquestionComponent } from './prgquestion.component';
import { FormsModule } from '@angular/forms';
import { DxButtonModule, DxDataGridModule, DxPopupModule, DxSelectBoxModule, DxTextBoxModule,DxNumberBoxModule } from 'devextreme-angular';


@NgModule({
  declarations: [PrgquestionComponent],
  imports: [
    CommonModule,
    PrgquestionRoutingModule,
    FormsModule,
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule,
    DxTextBoxModule,
    DxSelectBoxModule,
    DxNumberBoxModule
  ]
})
export class PrgquestionModule { }
