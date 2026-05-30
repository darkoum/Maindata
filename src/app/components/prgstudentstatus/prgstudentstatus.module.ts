import { DxDataGridModule, DxButtonModule, DxPopupModule, DxTextBoxModule, DxSelectBoxModule, DxTabPanelModule, DxDateBoxModule, DxLoadPanelModule, DxToolbarModule } from 'devextreme-angular';
import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrgstudentstatusRoutingModule } from './prgstudentstatus-routing.module';
import { PrgstudentstatusComponent } from './prgstudentstatus.component';
import { DxDateBoxCustomModule } from "../../shareds/dx-date-box-custom/dx-date-box-custom.module";
import { StudentSelectorModule } from 'src/app/shareds/student-selector/student-selector.module';


@NgModule({
    declarations: [PrgstudentstatusComponent],
    imports: [
        CommonModule,
        PrgstudentstatusRoutingModule,
        FormsModule,
        DxDataGridModule,
        DxButtonModule,
        DxPopupModule,
        DxTextBoxModule,
        DxSelectBoxModule,
        DxTabPanelModule,
        DxDateBoxModule,
        DxDateBoxCustomModule,
        DxLoadPanelModule,
        DxToolbarModule,
        StudentSelectorModule
    ]
})
export class PrgstudentstatusModule { }
