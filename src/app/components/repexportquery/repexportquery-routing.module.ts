import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepexportqueryComponent } from './repexportquery.component';

const routes: Routes = [{ path: '', component: RepexportqueryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepexportqueryRoutingModule { }
