import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganisationCompanyRoutingModule } from './organisation-company-routing.module';
import { OrganisationCompanyComponent } from './organisation-company.component';
import { AddEditCompanyComponent } from './add-edit-company/add-edit-company.component';
import { OrganisationCompanyDetailsComponent } from './organisation-company-details/organisation-company-details.component';
import { OrganisationCompanyHomeComponent } from './organisation-company-home/organisation-company-home.component';


@NgModule({
  declarations: [
    OrganisationCompanyComponent,
    AddEditCompanyComponent,
    OrganisationCompanyDetailsComponent,
    OrganisationCompanyHomeComponent
  ],
  imports: [
    CommonModule,
    OrganisationCompanyRoutingModule
  ]
})
export class OrganisationCompanyModule { }
