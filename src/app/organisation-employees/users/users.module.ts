import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UsershomeComponent } from './usershome/usershome.component';
import { UsersdataComponent } from './usersdata/usersdata.component';


@NgModule({
  declarations: [
    UsersComponent,
    UsershomeComponent,
    UsersdataComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
