import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../../services/http-error-handler.service';

const API_URL = environment.apiUrl;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

export interface TmpUser {
    username: String,
    password: String;
  }

@Injectable()
export class SignUpService {
    private handleError: HandleError;
    vurl = API_URL + '/api/signup';

    constructor(
        private http: HttpClient,
        httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('SignupService');
      }
      
      /** POST: add a new hero to the database */
  addUser (tmpUser: TmpUser): Observable<TmpUser> {
    return this.http.post<TmpUser>(this.vurl, tmpUser, httpOptions)
      .pipe(
        catchError(this.handleError('Signup User', tmpUser))
      );
  }
}