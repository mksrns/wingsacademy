import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ScrollerComponent } from './scroller/scroller.component';
import { AboutComponent } from './about/about.component';
import { EventComponent } from './event/event.component';
import { StoryComponent } from './story/story.component';


@NgModule({
  declarations: [LoginComponent, AdminComponent, DashboardComponent, ScrollerComponent, AboutComponent, EventComponent, StoryComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ]
})
export class AdminModule { }
