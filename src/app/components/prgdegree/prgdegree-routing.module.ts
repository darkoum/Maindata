import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrgdegreeComponent } from './prgdegree.component';

const routes: Routes = [{ path: '', component: PrgdegreeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrgdegreeRoutingModule { }
