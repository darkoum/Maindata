import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrgprefixComponent } from './prgprefix.component';

const routes: Routes = [{ path: '', component: PrgprefixComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrgprefixRoutingModule { }
