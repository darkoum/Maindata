import { FormsModule } from '@angular/forms';
import { DxButtonModule, DxSelectBoxModule, DxNumberBoxModule, DxCheckBoxModule, DxTextBoxModule, DxDataGridModule, DxPopupModule, DxResponsiveBoxModule, DxBoxModule, DxAccordionModule, DxScrollViewModule, DxDateBoxModule, DxFileManagerModule, DxLoadPanelModule } from 'devextreme-angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrgexportstudentimgRoutingModule } from './prgexportstudentimg-routing.module';
import { PrgexportstudentimgComponent } from './prgexportstudentimg.component';
import { DxDateBoxCustomModule } from 'src/app/shareds/dx-date-box-custom/dx-date-box-custom.module';


@NgModule({
  declarations: [
    PrgexportstudentimgComponent
  ],
  imports: [
    CommonModule,
    PrgexportstudentimgRoutingModule,
    DxButtonModule,
    DxSelectBoxModule,
    DxNumberBoxModule,
    DxCheckBoxModule,
    DxTextBoxModule,
    DxDataGridModule,
    DxPopupModule,
    DxResponsiveBoxModule,
    DxBoxModule,
    FormsModule,
    DxAccordionModule,
    DxScrollViewModule,
    DxDateBoxModule,
    DxFileManagerModule,
    DxLoadPanelModule,
    DxDateBoxCustomModule
  ]
})
export class PrgexportstudentimgModule { }
