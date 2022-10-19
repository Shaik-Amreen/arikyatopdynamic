import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentViewAdminRoutingModule } from './student-view-admin-routing.module';
import { StudentViewAdminComponent } from './student-view-admin.component';
import { AdminStudentProfileComponent } from './admin-student-profile/admin-student-profile.component';
import { AdminPromoteStudentComponent } from './admin-promote-student/admin-promote-student.component';
import { AdminDetainStudentComponent } from './admin-detain-student/admin-detain-student.component';
import { AdminPlacedStudentsComponent } from './admin-placed-students/admin-placed-students.component';
import { AdminSearchStudentsComponent } from './admin-search-students/admin-search-students.component';
import { AdminStudentBacklogComponent } from './admin-student-backlog/admin-student-backlog.component';
import { AdminStudentResultComponent } from './admin-student-result/admin-student-result.component';
import { AdminAddStudentsComponent } from './admin-add-students/admin-add-students.component';


@NgModule({
  declarations: [
    StudentViewAdminComponent,
    AdminStudentProfileComponent,
    AdminPromoteStudentComponent,
    AdminDetainStudentComponent,
    AdminPlacedStudentsComponent,
    AdminSearchStudentsComponent,
    AdminStudentBacklogComponent,
    AdminStudentResultComponent,
    AdminAddStudentsComponent
  ],
  imports: [
    CommonModule,
    StudentViewAdminRoutingModule
  ]
})
export class StudentViewAdminModule { }
