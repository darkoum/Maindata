import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrgentrydegreeComponent } from './prgentrydegree.component';

const routes: Routes = [{ path: '', component: PrgentrydegreeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrgentrydegreeRoutingModule { }
