import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrgschoolstatusRoutingModule } from './prgschoolstatus-routing.module';
import { PrgschoolstatusComponent } from './prgschoolstatus.component';
import { DxDataGridModule,DxAccordionModule, DxButtonModule, DxPopupModule,DxSelectBoxModule,DxFormModule ,DxNumberBoxModule,DxTabPanelModule,DxLookupModule, DxLoadPanelModule} from 'devextreme-angular';
import { FormsModule } from '@angular/forms';
import { DxDateBoxCustomModule } from 'src/app/shareds/dx-date-box-custom/dx-date-box-custom.module';


@NgModule({
  declarations: [PrgschoolstatusComponent],
  imports: [
    CommonModule,
    PrgschoolstatusRoutingModule,
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule,
    DxSelectBoxModule,
    FormsModule,DxFormModule,
    DxNumberBoxModule,
    DxTabPanelModule,
    DxLookupModule ,
    DxAccordionModule,
    DxLoadPanelModule,
    DxDateBoxCustomModule
  ]
})
export class PrgschoolstatusModule { }
