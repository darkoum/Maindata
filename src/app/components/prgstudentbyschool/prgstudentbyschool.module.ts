import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrgstudentbyschoolRoutingModule } from './prgstudentbyschool-routing.module';
import { PrgstudentbyschoolComponent } from './prgstudentbyschool.component';

import { FormsModule } from '@angular/forms';
import { DxButtonModule, DxCheckBoxModule,DxAccordionModule, DxDateBoxModule, DxListModule, DxLookupModule, DxNumberBoxModule, DxRadioGroupModule, DxSelectBoxModule, DxTextBoxModule, DxDataGridModule, DxTabPanelModule, DxTabsModule, DxFileUploaderModule, DxLoadPanelModule, DxPopupModule, DxFormModule } from 'devextreme-angular';
import { DxiColumnModule, DxoEditingModule, DxoLookupModule, DxoPagerModule, DxoPagingModule, DxoPopupModule, DxoScrollingModule, DxoSelectionModule } from 'devextreme-angular/ui/nested';
import { DxDateBoxCustomModule } from 'src/app/shareds/dx-date-box-custom/dx-date-box-custom.module';

@NgModule({
  declarations: [PrgstudentbyschoolComponent],
  imports: [
    CommonModule,
    PrgstudentbyschoolRoutingModule,
    FormsModule,
    DxTextBoxModule,
    DxNumberBoxModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxButtonModule,
    DxListModule,
    //DxDateBoxModule,
    DxRadioGroupModule,
    DxLookupModule, 
    DxoLookupModule,
    DxiColumnModule,
    DxoSelectionModule,
    DxoScrollingModule,
    DxoPopupModule,
    DxoEditingModule,
    DxoPagerModule,
    DxoPagingModule,
    DxDataGridModule,
    DxTabsModule,
    DxFileUploaderModule,
    DxDateBoxCustomModule,
    DxLoadPanelModule,
    DxPopupModule,
    DxFormModule,
    DxAccordionModule,
    DxDateBoxModule,
    
  ]
})
export class PrgstudentbyschoolModule { }
