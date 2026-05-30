import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrgstudentbioentryComponent } from './prgstudentbioentry.component';

const routes: Routes = [{ path: '', component: PrgstudentbioentryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrgstudentbioentryRoutingModule { }
