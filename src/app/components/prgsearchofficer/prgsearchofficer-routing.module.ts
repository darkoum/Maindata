import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrgsearchofficerComponent } from './prgsearchofficer.component';

const routes: Routes = [{ path: '', component: PrgsearchofficerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrgsearchofficerRoutingModule { }
