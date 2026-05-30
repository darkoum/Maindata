import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrggraduateprogramsetComponent } from './prggraduateprogramset.component';

const routes: Routes = [{ path: '', component: PrggraduateprogramsetComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrggraduateprogramsetRoutingModule { }
