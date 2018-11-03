import { Component, OnInit } from '@angular/core';
import { ContentAPIService } from '../../services/content.api.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { HttpErrorHandler, HandleError } from '../../services/http-error-handler.service';
import { SignUpService } from '../../services/auth/signup.service';
import { extend } from 'webdriver-js-extender';
import { CommonComponent } from '../common/common.component';

const API_URL = environment.apiUrl;

const stContent: string[] = ['authSignupTitle', 'authSignupMessage', 'authSignupUserid', 'authSignupPassword'];

export interface TmpUser {
  username: String,
  password: String;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  providers: [ SignUpService, ContentAPIService ],
  styleUrls: ['./signup.component.css']
})
export class SignupComponent extends CommonComponent{
  
  constructor(protected http: HttpClient,
    protected contentSrv: ContentAPIService,
    public signupService: SignUpService) {
    super(http, contentSrv, stContent);
  }
  private handleError: HandleError;
  public vurl = API_URL + '/api/signup';
 

  public signUp(username: string, password: string): void {
    username = username.trim();
    password = password.trim();
    if (!username) { return; }
    if (!password) { return; }

    const newtmpUser: TmpUser = { username , password } as TmpUser;
    this.signupService.addUser(newtmpUser)
      .subscribe((tmpUser) => {
        console.log("User Created: " + newtmpUser.username);
      });
  }
      
}
