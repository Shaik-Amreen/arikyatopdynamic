import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlacementsReportsRoutingModule } from './placements-reports-routing.module';
import { PlacementsReportsComponent } from './placements-reports.component';

import { CompanywisePlacementReportsComponent } from './companywise-placement-reports/companywise-placement-reports.component';
import { OverallPlacementReportsComponent } from './overall-placement-reports/overall-placement-reports.component';


@NgModule({
  declarations: [
    PlacementsReportsComponent,
 
    CompanywisePlacementReportsComponent,
      OverallPlacementReportsComponent
  ],
  imports: [
    CommonModule,
    PlacementsReportsRoutingModule
  ]
})
export class PlacementsReportsModule { }
