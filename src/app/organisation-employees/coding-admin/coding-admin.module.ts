import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodingAdminRoutingModule } from './coding-admin-routing.module';
import { CodingAdminComponent } from './coding-admin.component';
import { AddEditCodeComponent } from './add-edit-code/add-edit-code.component';
import { CodeTopicDetailsComponent } from './code-topic-details/code-topic-details.component';
import { CodeTopicsComponent } from './code-topics/code-topics.component';


@NgModule({
  declarations: [
    CodingAdminComponent,
    AddEditCodeComponent,
    CodeTopicDetailsComponent,
    CodeTopicsComponent
  ],
  imports: [
    CommonModule,
    CodingAdminRoutingModule
  ]
})
export class CodingAdminModule { }
