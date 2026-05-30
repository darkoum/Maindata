import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrgschoolstatusComponent } from './prgschoolstatus.component';

const routes: Routes = [{ path: '', component: PrgschoolstatusComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrgschoolstatusRoutingModule { }
