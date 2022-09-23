import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentViewAdminRoutingModule } from './student-view-admin-routing.module';
import { StudentViewAdminComponent } from './student-view-admin.component';


@NgModule({
  declarations: [
    StudentViewAdminComponent
  ],
  imports: [
    CommonModule,
    StudentViewAdminRoutingModule
  ]
})
export class StudentViewAdminModule { }
