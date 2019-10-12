import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment'; 
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  constructor(private _http: HttpClient) { }

  createStories(formData){
    return this._http.post<any>(environment.baseUrl + 'stories', formData)
  }
}
