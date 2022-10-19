import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganisationEmployeesRoutingModule } from './organisation-employees-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { OrganisationCompanyModule } from './organisation-company/organisation-company.module';
import { OrganisationEmployeeHomeComponent } from './organisation-employee-home/organisation-employee-home.component';
import { StudentsOfferStatusComponent } from './students-offer-status/students-offer-status.component';
import { OrganisationEmployeesProfileComponent } from './organisation-employees-profile/organisation-employees-profile.component';
import { OrganisationEmployeeNavbarComponent } from './organisation-employee-navbar/organisation-employee-navbar.component';


@NgModule({
  declarations: [
    OrganisationEmployeeHomeComponent,
    StudentsOfferStatusComponent,
    OrganisationEmployeesProfileComponent,
    OrganisationEmployeeNavbarComponent
  ],
  imports: [
    CommonModule,
    OrganisationEmployeesRoutingModule,
    DashboardModule,
    UsersModule,
    ReportsModule,
    OrganisationCompanyModule
  ]
})
export class OrganisationEmployeesModule { }
