import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxPopupModule, DxDataGridModule, DxLoadPanelModule, DxTextBoxModule, DxButtonModule, DxSelectBoxModule } from 'devextreme-angular';

import { CourseSelectorComponent } from './course-selector.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CourseSelectorComponent],
  imports: [
    CommonModule,
    DxPopupModule,
    DxDataGridModule,
    DxLoadPanelModule,
    DxTextBoxModule,
    FormsModule,
    DxButtonModule,
    DxSelectBoxModule
  ],
  exports: [CourseSelectorComponent]
})
export class CourseSelectorModule {}
