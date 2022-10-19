import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizAdminRoutingModule } from './quiz-admin-routing.module';
import { QuizAdminComponent } from './quiz-admin.component';
import { AddEditQuizComponent } from './add-edit-quiz/add-edit-quiz.component';
import { QuizTopicDetailsComponent } from './quiz-topic-details/quiz-topic-details.component';
import { QuizTopicsComponent } from './quiz-topics/quiz-topics.component';


@NgModule({
  declarations: [
    QuizAdminComponent,
    AddEditQuizComponent,
    QuizTopicDetailsComponent,
    QuizTopicsComponent
  ],
  imports: [
    CommonModule,
    QuizAdminRoutingModule
  ]
})
export class QuizAdminModule { }
