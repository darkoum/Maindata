import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrgquestionComponent } from './prgquestion.component';

const routes: Routes = [{ path: '', component: PrgquestionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrgquestionRoutingModule { }
