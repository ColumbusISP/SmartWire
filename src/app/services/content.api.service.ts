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
export class ContentAPIService {
  constructor(private http: HttpClient) {}
    
    public vurl = API_URL + '/api/get-view-content?';
    
    public data: object;
    public vwContent: String[][];

    public getContent(contentKeys: String): Observable<any[]> {
      console.log('api url: ' + this.vurl);
      return this.http.get<any[]>(this.vurl+contentKeys)
      }
    public parseContent(vwKeys: object): any {
        let x = vwKeys;
        this.vwContent = new Array;
        for (let i in vwKeys){
            this.vwContent[i] = [x[i].id, x[i].name] ;  
        }
           return this.vwContent;
       }
      
    }