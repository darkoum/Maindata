import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrgstudentcopyComponent } from './prgstudentcopy.component';

const routes: Routes = [{ path: '', component: PrgstudentcopyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrgstudentcopyRoutingModule { }
