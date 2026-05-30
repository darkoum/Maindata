import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrgacadComponent } from './prgacad.component';

const routes: Routes = [{ path: '', component: PrgacadComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrgacadRoutingModule { }
