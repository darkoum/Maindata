import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrgstudentstatussetComponent } from './prgstudentstatusset.component';

const routes: Routes = [{ path: '', component: PrgstudentstatussetComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrgstudentstatussetRoutingModule { }
