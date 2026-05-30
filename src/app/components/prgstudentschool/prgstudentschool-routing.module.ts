import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrgstudentschoolComponent } from './prgstudentschool.component';

const routes: Routes = [{ path: '', component: PrgstudentschoolComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrgstudentschoolRoutingModule { }
