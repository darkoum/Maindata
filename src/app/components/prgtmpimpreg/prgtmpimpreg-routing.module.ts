import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrgtmpimpregComponent } from './prgtmpimpreg.component';

const routes: Routes = [{ path: '', component: PrgtmpimpregComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrgtmpimpregRoutingModule { }
