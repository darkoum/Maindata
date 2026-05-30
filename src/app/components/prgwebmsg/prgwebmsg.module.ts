import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrgwebmsgRoutingModule } from './prgwebmsg-routing.module';
import { PrgwebmsgComponent } from './prgwebmsg.component';
import { DxDataGridModule, DxButtonModule, DxPopupModule, DxFormModule, DxSelectBoxModule, DxNumberBoxModule, DxTextBoxModule, DxDateBoxModule, DxLookupModule, DxBoxModule, DxCalendarModule, DxTextAreaModule, DxLoadPanelModule } from 'devextreme-angular';
import { FormsModule } from '@angular/forms';
import { DxDateBoxCustomModule } from "../../shareds/dx-date-box-custom/dx-date-box-custom.module";


@NgModule({
    declarations: [PrgwebmsgComponent],
    imports: [
        CommonModule,
        PrgwebmsgRoutingModule,
        FormsModule,
        DxSelectBoxModule,
        DxNumberBoxModule,
        DxTextBoxModule,
        DxDataGridModule,
        DxPopupModule,
        DxBoxModule,
        DxFormModule,
        DxButtonModule,
        DxDateBoxModule,
        DxLookupModule,
        DxCalendarModule,
        DxTextAreaModule,
        DxLoadPanelModule,
        DxDateBoxCustomModule
    ]
})
export class PrgwebmsgModule { }
