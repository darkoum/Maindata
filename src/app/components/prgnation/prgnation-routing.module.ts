import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrgnationComponent } from './prgnation.component';

const routes: Routes = [{ path: '', component: PrgnationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})   
export class PrgnationRoutingModule { }
