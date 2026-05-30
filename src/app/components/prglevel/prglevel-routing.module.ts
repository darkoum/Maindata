import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrglevelComponent } from './prglevel.component';

const routes: Routes = [{ path: '', component: PrglevelComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrglevelRoutingModule { }
