import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DevExtremeModule, DxDateBoxModule} from 'devextreme-angular';
import {FormsModule} from '@angular/forms';
import {DxDateBoxCustomComponent} from './dx-date-box-custom.component';


@NgModule({
  declarations: [
    DxDateBoxCustomComponent
  ],
  exports: [
    DxDateBoxCustomComponent
  ],
  imports: [
    CommonModule,
    DxDateBoxModule,
    FormsModule,
    DevExtremeModule
  ]
})
export class DxDateBoxCustomModule {
}
