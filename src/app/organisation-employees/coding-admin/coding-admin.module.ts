import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodingAdminRoutingModule } from './coding-admin-routing.module';
import { CodingAdminComponent } from './coding-admin.component';


@NgModule({
  declarations: [
    CodingAdminComponent
  ],
  imports: [
    CommonModule,
    CodingAdminRoutingModule
  ]
})
export class CodingAdminModule { }
