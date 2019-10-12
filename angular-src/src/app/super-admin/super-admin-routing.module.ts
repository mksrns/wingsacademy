import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SuperadminComponent } from './superadmin/superadmin.component';
import { SuperAdminGuardGuard } from '../_guards/super-admin.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminsComponent } from './admins/admins.component';


const routes: Routes = [
  {path: '', component:LoginComponent},
  {path: 'dashboard', component:SuperadminComponent, canActivate: [SuperAdminGuardGuard],
    children: [
      {path:'', component: DashboardComponent},
      {path:'dashboard', redirectTo:'', pathMatch: 'full'},
      {path:'admins', component: AdminsComponent},
      // {path:'customers', component: CustomersComponent},
      // {path:'staffs', component: StaffsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
