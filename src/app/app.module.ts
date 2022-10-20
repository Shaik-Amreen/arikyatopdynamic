import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonApiCallService } from 'src/app/services/common-api-call.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrganisationEmployeesModule } from './organisation-employees/organisation-employees.module';
import { OrganisationEmployeesComponent } from './organisation-employees/organisation-employees.component';
import { CodingAdminModule } from './organisation-employees/coding-admin/coding-admin.module';
import { QuizAdminModule } from './organisation-employees/quiz-admin/quiz-admin.module';

import { StudentViewAdminModule } from './organisation-employees/student-view-admin/student-view-admin.module';
import { PlacementDataModule } from './organisation-employees/placement-data/placement-data.module';
import { ArikyaHomePageComponent } from './arikya-home-page/arikya-home-page.component';
import { ArikyaContactComponent } from './arikya-contact/arikya-contact.component';
import { ForgotPasswordPageComponent } from './forgot-password-page/forgot-password-page.component';
import { LoginComponent } from './login/login.component';
import { PageNotExistComponent } from './page-not-exist/page-not-exist.component';
import { StudentCompanyRegistrationModule } from './student-company-registration/student-company-registration.module';
import { SignupComponent } from './signup/signup.component';
import { CalendarComponent } from './common-components/calendar/calendar.component';
import { ChangePasswordComponent } from './common-components/change-password/change-password.component';




@NgModule({
  declarations: [
    AppComponent,
    OrganisationEmployeesComponent,
    ArikyaHomePageComponent,
    ArikyaContactComponent,
    ForgotPasswordPageComponent,
    LoginComponent,
    PageNotExistComponent,
    SignupComponent,
    CalendarComponent,
    ChangePasswordComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OrganisationEmployeesModule,
    CodingAdminModule,
    QuizAdminModule,
    StudentViewAdminModule,
    PlacementDataModule,
    StudentCompanyRegistrationModule,
  
  ],
  providers: [CommonApiCallService],
  bootstrap: [AppComponent]
})
export class AppModule { }
