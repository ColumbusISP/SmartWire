'use strict';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;

export interface CAASContent {
  id: string;
  name: string;
  }

@Injectable()
export class APIService {
  constructor(private http: HttpClient) {}
    
    public vurl = API_URL + '/api/get-view-content?';

    public getContent(contentKeys: String): Observable<any[]> {
      
      return this.http.get<any[]>(this.vurl+contentKeys);
     
    }
}
