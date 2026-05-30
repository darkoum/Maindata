import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrgadminallRoutingModule } from './prgadminall-routing.module';
import { PrgadminallComponent } from './prgadminall.component';

import { FormsModule } from '@angular/forms';
import {
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule,
    DxTextBoxModule,
    DxSelectBoxModule,
    DxTabsModule,
    DxBoxModule,
    DxTemplateModule,
    DxTabPanelModule,
} from 'devextreme-angular';
import { PrgentrydegreeComponent } from './../prgentrydegree/prgentrydegree.component';
import { PrgnationComponent } from '../prgnation/prgnation.component';
import { PrgprefixComponent } from '../prgprefix/prgprefix.component';
import { PrgreligionComponent } from '../prgreligion/prgreligion.component';
import { PrgdivisioncodeComponent } from '../prgdivisioncode/prgdivisioncode.component';
import { PrgschoolComponent } from '../prgschool/prgschool.component';
import { PrglevelcodeComponent } from '../prglevelcode/prglevelcode.component';
import { PrgprovinceconfigComponent } from '../prgprovinceconfig/prgprovinceconfig.component';
import { PrgprogramgroupComponent } from '../prgprogramgroup/prgprogramgroup.component';
import { PrgcountryComponent } from '../prgcountry/prgcountry.component';

@NgModule({
    declarations: [
        PrgadminallComponent,
        PrgnationComponent,
        PrgprefixComponent,
        PrgreligionComponent,
        PrgschoolComponent,
        PrgdivisioncodeComponent,
        PrglevelcodeComponent,
        PrgentrydegreeComponent,
        PrgprovinceconfigComponent,
        PrgprogramgroupComponent,
        PrgcountryComponent
    ],
    imports: [
        CommonModule,
        PrgadminallRoutingModule,
        FormsModule,
        DxTabsModule,
        DxSelectBoxModule,
        DxBoxModule,
        DxDataGridModule,
        DxButtonModule,
        DxPopupModule,
        DxTextBoxModule,
        DxTemplateModule,
        DxTabPanelModule,
    ],
})
export class PrgadminallModule {}
