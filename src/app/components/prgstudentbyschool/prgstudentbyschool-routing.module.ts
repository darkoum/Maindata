import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrgstudentbyschoolComponent } from './prgstudentbyschool.component';

const routes: Routes = [{ path: '', component: PrgstudentbyschoolComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrgstudentbyschoolRoutingModule { }
