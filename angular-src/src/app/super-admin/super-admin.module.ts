import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { LoginComponent } from './login/login.component';
import { SuperadminComponent } from './superadmin/superadmin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuperAdminService } from '../_services/super-admin.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminsComponent } from './admins/admins.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';


@NgModule({
  declarations: [LoginComponent, SuperadminComponent, DashboardComponent, AdminsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SuperAdminRoutingModule,
    AngularMaterialModule
  ],
  providers: [SuperAdminService]
})
export class SuperAdminModule { }
