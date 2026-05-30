import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrgstudentpasswordComponent } from './prgstudentpassword.component';

const routes: Routes = [{ path: '', component: PrgstudentpasswordComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrgstudentpasswordRoutingModule { }
