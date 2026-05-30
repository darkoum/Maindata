import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { PrgcampusRoutingModule } from './prgcampus-routing.module';
import { PrgcampusComponent } from './prgcampus.component';
import { FormsModule } from '@angular/forms';
import { DxButtonModule, DxDataGridModule, DxPopupModule, DxTextBoxModule } from 'devextreme-angular';


@NgModule({
  declarations: [PrgcampusComponent],
  imports: [
    CommonModule,
    PrgcampusRoutingModule,
    CommonModule,
    FormsModule,
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule,
    DxTextBoxModule,
    DxTextBoxModule
  ]
})
export class PrgcampusModule { }
