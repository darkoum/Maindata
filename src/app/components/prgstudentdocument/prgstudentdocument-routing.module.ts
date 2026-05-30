import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrgstudentdocumentComponent } from './prgstudentdocument.component';

const routes: Routes = [{ path: '', component: PrgstudentdocumentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrgstudentdocumentRoutingModule { }
