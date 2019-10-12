import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { superAdmin } from '../_models/superAdmin';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {
  currentSuperAdmin:String; 
  redirectUrl:String;
  constructor(private router:Router, private _http:HttpClient) { }

  login(superAdmin:superAdmin):Observable<superAdmin>{
  
    let httpheaders = new HttpHeaders()
    .set('content-type','application/json');
    let options = {
      //withCredentials:true,
      headers:httpheaders
    };
    return this._http.post<superAdmin>(environment.baseUrl + 'superAdmin/login', superAdmin, options);
  
  }
  getAuthorizationToken(){
    const currentSuperAdmin = JSON.parse(localStorage.getItem('currentSuperAdmin'));
    return currentSuperAdmin;
  }

  isLoggedIn(){
    if(localStorage.getItem('currentSuperAdmin')){
      return true;
    }
    return false;
  }

  logout(){
    localStorage.removeItem('currentSuperAdmin');
    this.router.navigate(['/super-admin']);
  }
}
