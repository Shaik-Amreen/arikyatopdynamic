import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganisationEmployeesRoutingModule } from './organisation-employees-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OrganisationEmployeesRoutingModule,
    DashboardModule,
    UsersModule,
    ReportsModule
  ]
})
export class OrganisationEmployeesModule { }
