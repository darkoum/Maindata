import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrgprogramstructureComponent } from './prgprogramstructure.component';

const routes: Routes = [{ path: '', component: PrgprogramstructureComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrgprogramstructureRoutingModule { }
