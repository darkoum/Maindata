import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxPopupModule, DxDataGridModule, DxLoadPanelModule, DxTextBoxModule, DxButtonModule } from 'devextreme-angular';

import { StudentSelectorComponent } from './student-selector.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [StudentSelectorComponent],
  imports: [
    CommonModule,
    DxPopupModule,
    DxDataGridModule,
    DxLoadPanelModule,
    DxTextBoxModule,
    FormsModule,
    DxButtonModule
  ],
  exports: [StudentSelectorComponent]
})
export class StudentSelectorModule {}
