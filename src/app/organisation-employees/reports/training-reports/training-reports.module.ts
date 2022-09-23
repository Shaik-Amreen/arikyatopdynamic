import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingReportsRoutingModule } from './training-reports-routing.module';
import { TrainingReportsComponent } from './training-reports.component';
import { OverallReportsComponent } from './overall-reports/overall-reports.component';
import { CodingReportsComponent } from './coding-reports/coding-reports.component';
import { QuizReportsComponent } from './quiz-reports/quiz-reports.component';


@NgModule({
  declarations: [
    TrainingReportsComponent,
    OverallReportsComponent,
    CodingReportsComponent,
    QuizReportsComponent
  ],
  imports: [
    CommonModule,
    TrainingReportsRoutingModule
  ]
})
export class TrainingReportsModule { }
