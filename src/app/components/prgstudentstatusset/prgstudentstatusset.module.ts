import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrgstudentstatussetRoutingModule } from './prgstudentstatusset-routing.module';
import { PrgstudentstatussetComponent } from './prgstudentstatusset.component';
import { FormsModule } from '@angular/forms';
import { DxDataGridModule, DxButtonModule, DxPopupModule,DxAccordionModule ,    DxSelectBoxModule,DxTextBoxModule,DxNumberBoxModule,DxLookupModule, DxCheckBoxModule, DxLoadPanelModule, DxTabPanelModule} from 'devextreme-angular';
import { DxRadioGroupModule, DxRadioGroupComponent, DxTemplateModule,DxDateBoxModule  } from 'devextreme-angular';
@NgModule({
  declarations: [PrgstudentstatussetComponent],
  imports: [
    CommonModule,
    PrgstudentstatussetRoutingModule,
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule,
    DxAccordionModule,
    DxSelectBoxModule,
    FormsModule,
    DxTextBoxModule,
    DxNumberBoxModule,
    DxLookupModule ,
    DxRadioGroupModule,
    DxTemplateModule,
    DxDateBoxModule ,
    DxCheckBoxModule,
    DxLoadPanelModule,
    DxTabPanelModule
  ]
})
export class PrgstudentstatussetModule { }
