import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrgacadRoutingModule } from './prgacad-routing.module';
import { PrgacadComponent } from './prgacad.component';
import { DxButtonModule, DxDataGridModule, DxFormModule, DxLoadPanelModule, DxPopupModule, DxTabPanelModule, DxTemplateModule } from 'devextreme-angular';
import { DxTabsModule, DxSelectBoxModule } from 'devextreme-angular';
import { FormsModule } from '@angular/forms';
@NgModule({
    declarations: [PrgacadComponent],
    imports: [
        CommonModule,
        PrgacadRoutingModule,
        DxDataGridModule,
        DxButtonModule,
        DxTabPanelModule,
        DxTemplateModule,
        DxPopupModule,
        DxSelectBoxModule,
        DxFormModule,
        FormsModule,
        DxLoadPanelModule
    ],
})
export class PrgacadModule {}
