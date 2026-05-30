import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrgstudentallinfoComponent } from './prgstudentallinfo.component';

const routes: Routes = [{ path: '', component: PrgstudentallinfoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrgstudentallinfoRoutingModule { }
