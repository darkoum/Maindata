import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrgprogramcodeComponent } from './prgprogramcode.component';

const routes: Routes = [{ path: '', component: PrgprogramcodeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrgprogramcodeRoutingModule { }
