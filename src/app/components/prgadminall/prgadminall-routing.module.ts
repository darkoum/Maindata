import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrgadminallComponent } from './prgadminall.component';

const routes: Routes = [{ path: '', component: PrgadminallComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrgadminallRoutingModule { }
