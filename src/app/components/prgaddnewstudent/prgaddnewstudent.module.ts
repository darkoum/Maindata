import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrgaddnewstudentRoutingModule } from './prgaddnewstudent-routing.module';
import { PrgaddnewstudentComponent } from './prgaddnewstudent.component';
import { FormsModule } from '@angular/forms';
import { DxButtonModule, DxCheckBoxModule, DxDateBoxModule, DxListModule, DxLookupModule, DxNumberBoxModule, DxRadioGroupModule, DxSelectBoxModule, DxTextBoxModule, DxDataGridModule, DxTabPanelModule, DxTabsModule, DxFileUploaderModule, DxLoadPanelModule, DxPopupModule, DxFormModule, DxTemplateModule } from 'devextreme-angular';
import { DxiColumnModule, DxoEditingModule, DxoLookupModule, DxoPagerModule, DxoPagingModule, DxoPopupModule, DxoScrollingModule, DxoSelectionModule } from 'devextreme-angular/ui/nested';
import { DxDateBoxCustomModule } from 'src/app/shareds/dx-date-box-custom/dx-date-box-custom.module';


@NgModule({
  declarations: [PrgaddnewstudentComponent],
  imports: [
    CommonModule,
    PrgaddnewstudentRoutingModule,
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
    DxTemplateModule,
    DxTabPanelModule
  ]
})
export class PrgaddnewstudentModule { }
