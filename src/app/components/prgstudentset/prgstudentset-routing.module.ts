import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrgstudentsetComponent } from './prgstudentset.component';

const routes: Routes = [{ path: '', component: PrgstudentsetComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrgstudentsetRoutingModule { }
