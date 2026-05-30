import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrgcampusComponent } from './prgcampus.component';

const routes: Routes = [{ path: '', component: PrgcampusComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrgcampusRoutingModule { }
