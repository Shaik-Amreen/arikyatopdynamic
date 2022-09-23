import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrganisationEmployeesModule } from './organisation-employees/organisation-employees.module';
import { OrganisationEmployeesComponent } from './organisation-employees/organisation-employees.component';
import { CodingAdminModule } from './organisation-employees/coding-admin/coding-admin.module';
import { QuizAdminModule } from './organisation-employees/quiz-admin/quiz-admin.module';
import { StudentViewAdminModule } from './organisation-employees/student-view-admin/student-view-admin.module';
import { PlacementDataModule } from './organisation-employees/placement-data/placement-data.module';



@NgModule({
  declarations: [
    AppComponent,
    OrganisationEmployeesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OrganisationEmployeesModule,
    CodingAdminModule,
    QuizAdminModule,
    StudentViewAdminModule,
    PlacementDataModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
