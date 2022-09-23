import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { TrainingReportsModule } from './training-reports/training-reports.module';
import { PlacementsReportsModule } from './placements-reports/placements-reports.module';


@NgModule({
  declarations: [
    ReportsComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    TrainingReportsModule,
    PlacementsReportsModule
  ]
})
export class ReportsModule { }
