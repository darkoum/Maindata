import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrgprerequisiteComponent } from './prgprerequisite.component';

const routes: Routes = [{ path: '', component: PrgprerequisiteComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrgprerequisiteRoutingModule { }
