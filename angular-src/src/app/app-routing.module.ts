import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HomepageComponent } from './_components/homepage/homepage.component';


const routes: Routes = [
  // {path: '', redirectTo: '', pathMatch: 'full'},
  {path: '', component: HomepageComponent},
  {
    path:'super-admin',
    loadChildren:'./super-admin/super-admin.module#SuperAdminModule'
  },
  {
    path:'admins',
    loadChildren:'./admin/admin.module#AdminModule'
  },
  // {path:'customer/:id' , component: CustomerComponent},
  
  {path: '**', component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
