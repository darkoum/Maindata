import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrgofficertypeComponent } from './prgofficertype.component';

const routes: Routes = [{ path: '', component: PrgofficertypeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrgofficertypeRoutingModule { }
