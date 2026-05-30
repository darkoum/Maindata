import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrgsearchstudentComponent } from './prgsearchstudent.component';

const routes: Routes = [{ path: '', component: PrgsearchstudentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrgsearchstudentRoutingModule { }
