import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrgstudentgroupComponent } from './prgstudentgroup.component';

const routes: Routes = [{ path: '', component: PrgstudentgroupComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrgstudentgroupRoutingModule { }
