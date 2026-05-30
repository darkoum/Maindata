import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrgschoolComponent } from './prgschool.component';

const routes: Routes = [{ path: '', component: PrgschoolComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrgschoolRoutingModule { }
