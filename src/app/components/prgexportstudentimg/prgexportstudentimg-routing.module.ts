import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrgexportstudentimgComponent } from './prgexportstudentimg.component';

const routes: Routes = [{ path: '', component: PrgexportstudentimgComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrgexportstudentimgRoutingModule { }
