import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrgstudentschoolRoutingModule } from './prgstudentschool-routing.module';
import { PrgstudentschoolComponent } from './prgstudentschool.component';
import { DxDataGridModule,DxAccordionModule, DxButtonModule, DxPopupModule,DxSelectBoxModule,DxFormModule ,DxNumberBoxModule,DxTabPanelModule,DxLookupModule, DxLoadPanelModule, DxTextBoxModule} from 'devextreme-angular';
import { FormsModule } from '@angular/forms';
import { DxDateBoxCustomModule } from 'src/app/shareds/dx-date-box-custom/dx-date-box-custom.module';
import { StudentSelectorModule } from 'src/app/shareds/student-selector/student-selector.module';

@NgModule({
  declarations: [PrgstudentschoolComponent],
  imports: [
    CommonModule,
    PrgstudentschoolRoutingModule,
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule,
    DxSelectBoxModule,
    FormsModule,DxFormModule,
    DxNumberBoxModule,
    DxTabPanelModule,
    DxLookupModule ,
    DxTextBoxModule,
    DxAccordionModule,
    DxLoadPanelModule,
    DxDateBoxCustomModule,
    StudentSelectorModule
  ]
})
export class PrgstudentschoolModule { }
