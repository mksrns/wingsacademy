import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private _http:HttpClient) { }

  getAll():Observable<any[]>{ 
    return this._http.get<any[]>(environment.baseUrl + 'events/');
  }
  getSingle(eventId):Observable<any>{
    return this._http.get<any>(environment.baseUrl + 'events/' + eventId);
  }

  create(formData:any):Observable<any>{
    // let httpheaders = new HttpHeaders()
    // .set('content-type','multipart/form-data');
    // let options = {
    //   headers:httpheaders 
    // };
    return this._http.post<any>(environment.baseUrl + 'events/', formData, {
      reportProgress: true,
      observe: 'events'
    });
  } 

  delete(eventId:String):Observable<any[]>{
    return this._http.delete<any[]>(environment.baseUrl + 'events/' + eventId);
  }
 
  update(eventId, updateEvent):Observable<any>{
    // let httpheaders = new HttpHeaders()
    // .set('content-type','application/json');
    // let options = {
    //   headers:httpheaders 
    // };
    return this._http.patch<any>(environment.baseUrl + 'events/' + eventId, updateEvent);
  } 
}
