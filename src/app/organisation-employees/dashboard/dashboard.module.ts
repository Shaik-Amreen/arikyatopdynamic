import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { PlacementDashboardComponent } from './placement-dashboard/placement-dashboard.component';
import { TrainingDashboardComponent } from './training-dashboard/training-dashboard.component';


@NgModule({
  declarations: [
    DashboardComponent,
    PlacementDashboardComponent,
    TrainingDashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
