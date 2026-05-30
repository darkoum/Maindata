import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrgcourseequivalentComponent } from './prgcourseequivalent.component';

const routes: Routes = [{ path: '', component: PrgcourseequivalentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrgcourseequivalentRoutingModule { }
