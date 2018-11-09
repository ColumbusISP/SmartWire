import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { catchError } from 'rxjs/operators';



const API_URL = environment.apiUrl;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private handleError: HandleError;
    private vurl = API_URL + '/api/customer';
    constructor( 
    private http: HttpClient
  ) { }

  getCustomer(id: number): Observable<User> {
    const url = this.vurl+'/'+id;
    //return this.http.post<any>(this.vurl, tmpUser, httpOptions)
    return this.http.get<User>(url)
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

  updateCustomer (customer: User): Observable<any> {
    return this.http.put(this.vurl, customer, httpOptions);
  }
}
