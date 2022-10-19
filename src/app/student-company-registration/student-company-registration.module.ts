import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentCompanyRegistrationRoutingModule } from './student-company-registration-routing.module';
import { StudentCompanyRegistrationComponent } from './student-company-registration.component';
import { StudentCompanyRegistrationLoginComponent } from './student-company-registration-login/student-company-registration-login.component';
import { StudentCompanyRegistrationHomeComponent } from './student-company-registration-home/student-company-registration-home.component';


@NgModule({
  declarations: [
    StudentCompanyRegistrationComponent,
    StudentCompanyRegistrationLoginComponent,
    StudentCompanyRegistrationHomeComponent
  ],
  imports: [
    CommonModule,
    StudentCompanyRegistrationRoutingModule
  ]
})
export class StudentCompanyRegistrationModule { }
