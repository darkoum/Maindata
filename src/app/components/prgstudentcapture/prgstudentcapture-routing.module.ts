import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrgstudentcaptureComponent } from './prgstudentcapture.component';

const routes: Routes = [{ path: '', component: PrgstudentcaptureComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrgstudentcaptureRoutingModule { }
