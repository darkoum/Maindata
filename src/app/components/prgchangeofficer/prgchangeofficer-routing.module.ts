import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrgchangeofficerComponent } from './prgchangeofficer.component';

const routes: Routes = [{ path: '', component: PrgchangeofficerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrgchangeofficerRoutingModule { }
