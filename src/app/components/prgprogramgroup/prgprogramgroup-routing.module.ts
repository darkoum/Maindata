import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrgprogramgroupComponent } from './prgprogramgroup.component';

const routes: Routes = [{ path: '', component: PrgprogramgroupComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrgprogramgroupRoutingModule { }
