import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrgcourseComponent } from './prgcourse.component';

const routes: Routes = [{ path: '', component: PrgcourseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrgcourseRoutingModule { }
