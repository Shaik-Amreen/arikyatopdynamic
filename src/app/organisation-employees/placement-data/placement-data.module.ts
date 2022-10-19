import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlacementDataRoutingModule } from './placement-data-routing.module';
import { PlacementDataComponent } from './placement-data.component';
import { AddEditPlacementsComponent } from './add-edit-placements/add-edit-placements.component';
import { PlacementDetailsComponent } from './placement-details/placement-details.component';
import { PlacementsHomeComponent } from './placements-home/placements-home.component';


@NgModule({
  declarations: [
    PlacementDataComponent,
    AddEditPlacementsComponent,
    PlacementDetailsComponent,
    PlacementsHomeComponent
  ],
  imports: [
    CommonModule,
    PlacementDataRoutingModule
  ]
})
export class PlacementDataModule { }
