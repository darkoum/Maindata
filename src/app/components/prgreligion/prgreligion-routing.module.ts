import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrgreligionComponent } from './prgreligion.component';

const routes: Routes = [{ path: '', component: PrgreligionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrgreligionRoutingModule { }
