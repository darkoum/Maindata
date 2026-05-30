import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrgprovinceconfigComponent } from './prgprovinceconfig.component';

const routes: Routes = [{ path: '', component: PrgprovinceconfigComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrgprovinceconfigRoutingModule { }
