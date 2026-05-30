import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrgcountryComponent } from './prgcountry.component';

const routes: Routes = [{ path: '', component: PrgcountryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})   
export class PrgcountryRoutingModule { }
