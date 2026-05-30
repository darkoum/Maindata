import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrgexportqueryComponent } from './prgexportquery.component';

const routes: Routes = [{ path: '', component: PrgexportqueryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrgexportqueryRoutingModule { }
