import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrgprogramComponent } from './prgprogram.component';

const routes: Routes = [{ path: '', component: PrgprogramComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrgprogramRoutingModule { }
