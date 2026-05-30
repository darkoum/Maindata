import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrgfacultyComponent } from './prgfaculty.component';

const routes: Routes = [{ path: '', component: PrgfacultyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrgfacultyRoutingModule { }
