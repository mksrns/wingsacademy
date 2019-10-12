import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Admin } from '../_models/admin';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  constructor(private _http: HttpClient ) { }

  getAbout():Observable<any[]>{
    return this._http.get<any[]>(environment.baseUrl + 'abouts');
  }
}
