import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SuperAdminService } from './super-admin.service';
import { Admin } from '../_models/admin';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  currentAdmin: string;

  constructor(private _http:HttpClient, private superAdminServ:SuperAdminService, private router:Router) { }

  getAll():Observable<Admin[]>{ 
      return this._http.get<Admin[]>(environment.baseUrl + 'admin');
  }

  getSingle(adminId:String):Observable<Admin[]>{
    return this._http.get<Admin[]>(environment.baseUrl + 'admin/' + adminId);
  }

  create(formData:any):Observable<any>{
    let httpheaders = new HttpHeaders()
    .set('content-type','application/json');
    let options = {
      headers:httpheaders 
    };
    return this._http.post<any>(environment.baseUrl + 'admin/', formData, options);
  } 

  delete(adminId:String):Observable<Admin[]>{
    return this._http.delete<Admin[]>(environment.baseUrl + 'admin/' + adminId);
  }
 
  update(adminId, updateAdmin):Observable<Admin>{
    let httpheaders = new HttpHeaders()
    .set('content-type','application/json');
    let options = {
      headers:httpheaders 
    };
    return this._http.patch<Admin>(environment.baseUrl + 'admin/' + adminId, updateAdmin, options);
  } 

  login(admin:Admin):Observable<Admin>{
  
    let httpheaders = new HttpHeaders()
    .set('content-type','application/json');
    let options = {
      //withCredentials:true,
      headers:httpheaders
    };
    return this._http.post<Admin>(environment.baseUrl + 'admin/login', admin, options);
  
  }
  getAuthorizationToken(){
    const currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    return currentAdmin;
  }

  isLoggedIn(){
    if(localStorage.getItem('currentAdmin')){
      return true;
    }
    return false;
  }

  logout(){
    localStorage.removeItem('currentAdmin');
    this.router.navigate(['/admins']);
  }

  getCustomers():Observable<any[]>{
    return this._http.get<any[]>(environment.baseUrl + 'customers/');
  }
}
