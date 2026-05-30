import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrgstudentmasterComponent } from './prgstudentmaster.component';

const routes: Routes = [{ path: '', component: PrgstudentmasterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrgstudentmasterRoutingModule { }
