import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../../models/profile';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { catchError } from 'rxjs/operators';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private handleError: HandleError;
    private vurl = API_URL + '/api/customer';
    constructor( 
    private http: HttpClient
  ) { }

  getCustomer(id: number): Observable<Profile> {
    const url = this.vurl+'/'+id;
    //return this.http.post<any>(this.vurl, tmpUser, httpOptions)
    return this.http.get<Profile>(url)
    .pipe(
      map(returnObj => {
        let obj = JSON.parse(JSON.stringify(returnObj));
        console.log('profile object: ' + JSON.stringify(obj));
        return returnObj;
        }
      ),
    //need catch error statement  
    )

}

  updateCustomer (customer: Profile): Observable<any> {
    return this.http.put(this.vurl, customer);
  }
}
