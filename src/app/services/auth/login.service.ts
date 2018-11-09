import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { User } from '../../models/user';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

const API_URL = environment.apiUrl;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class LoginService {
    private handleError: HandleError;
    vurl = API_URL + '/api/authenticate';
    
  constructor(
      private http: HttpClient,
      public jwtHelper: JwtHelperService,
      httpErrorHandler: HttpErrorHandler) {
      this.handleError = httpErrorHandler.createHandleError('LoginService');
    }
  loginUser(tmpUser : User) {
    return this.http.post<any>(this.vurl, tmpUser, httpOptions)
        .pipe(
          map(returnObj => {
            // login successful if there's a jwt token in the response
            let obj = JSON.parse(JSON.stringify(returnObj));
            //console.log('Initial Return:' + JSON.stringify(tmpuser));
            let user = obj.payload;
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                //localStorage.setItem('token', JSON.stringify(user.token));
                console.log('User Logged in:' + JSON.stringify(user));
            }
            else{
              console.log('User Token Not available:' + JSON.stringify(user));
            }
            return returnObj;
        }),
          catchError(this.handleError('Login User', {'success':false, 'message': 'incorrect password'} ))
        );
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
  isAuthenticated(): boolean {
    const user = localStorage.getItem('currentUser');
    const obj = JSON.parse(user);
    if (obj){
      console.log(this.jwtHelper.getTokenExpirationDate(obj.token));
      return !this.jwtHelper.isTokenExpired(obj.token);
    }
    else return false; 
  }
  
}
