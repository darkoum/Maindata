import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrgadvisorpresentComponent } from './prgadvisorpresent.component';

const routes: Routes = [{ path: '', component: PrgadvisorpresentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrgadvisorpresentRoutingModule { }
