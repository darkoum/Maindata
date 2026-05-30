import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrglevelcodeComponent } from './prglevelcode.component';

const routes: Routes = [{ path: '', component: PrglevelcodeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrglevelcodeRoutingModule { }
