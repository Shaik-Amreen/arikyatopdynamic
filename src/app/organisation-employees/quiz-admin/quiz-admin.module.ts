import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizAdminRoutingModule } from './quiz-admin-routing.module';
import { QuizAdminComponent } from './quiz-admin.component';


@NgModule({
  declarations: [
    QuizAdminComponent
  ],
  imports: [
    CommonModule,
    QuizAdminRoutingModule
  ]
})
export class QuizAdminModule { }
