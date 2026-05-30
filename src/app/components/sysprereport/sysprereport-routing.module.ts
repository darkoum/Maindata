import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SysprereportComponent } from './sysprereport.component';

const routes: Routes = [{ path: '', component: SysprereportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SysprereportRoutingModule { }
