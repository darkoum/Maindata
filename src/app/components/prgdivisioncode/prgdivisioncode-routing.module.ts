import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrgdivisioncodeComponent } from './prgdivisioncode.component';

const routes: Routes = [{ path: '', component: PrgdivisioncodeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrgdivisioncodeRoutingModule { }
