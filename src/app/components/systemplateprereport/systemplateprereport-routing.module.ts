import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SystemplateprereportComponent } from './systemplateprereport.component';

const routes: Routes = [{ path: '', component: SystemplateprereportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemplateprereportRoutingModule { }
