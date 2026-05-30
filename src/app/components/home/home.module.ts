import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';

import { HomeRoutes } from './home.routing';

@NgModule({
    declarations: [HomeComponent],
    imports: [CommonModule, HomeRoutes],
})
export class HomeModule {}
