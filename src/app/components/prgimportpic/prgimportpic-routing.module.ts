import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrgimportpicComponent } from './prgimportpic.component';

const routes: Routes = [{ path: '', component: PrgimportpicComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrgimportpicRoutingModule { }
