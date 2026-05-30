import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrgwebmsgComponent } from './prgwebmsg.component';

const routes: Routes = [{ path: '', component: PrgwebmsgComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrgwebmsgRoutingModule { }
