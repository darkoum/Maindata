import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrgstudentstatusComponent } from './prgstudentstatus.component';

const routes: Routes = [{ path: '', component: PrgstudentstatusComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrgstudentstatusRoutingModule { }
