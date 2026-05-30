import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrgstudenttransferComponent } from './prgstudenttransfer.component';

const routes: Routes = [{ path: '', component: PrgstudenttransferComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrgstudenttransferRoutingModule { }
