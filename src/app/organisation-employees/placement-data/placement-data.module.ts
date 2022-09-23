import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlacementDataRoutingModule } from './placement-data-routing.module';
import { PlacementDataComponent } from './placement-data.component';


@NgModule({
  declarations: [
    PlacementDataComponent
  ],
  imports: [
    CommonModule,
    PlacementDataRoutingModule
  ]
})
export class PlacementDataModule { }
