import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrgaddnewstudentComponent } from './prgaddnewstudent.component';

const routes: Routes = [{ path: '', component: PrgaddnewstudentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrgaddnewstudentRoutingModule { }
