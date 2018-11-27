import { Component, OnInit } from '@angular/core';
import { ContentAPIService } from '../../services/content.api.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { HttpErrorHandler, HandleError } from '../../services/http-error-handler.service';
import { SignUpService } from '../../services/auth/signup.service';
import { extend } from 'webdriver-js-extender'; 
import { CommonComponent } from '../common/common.component';
import { User } from '../../models/user';
import { RouterModule } from '@angular/router';

const API_URL = environment.apiUrl;

const stContent: string[] = ['authSignupTitle', 'authSignupMessage', 'authSignupUserid', 'authSignupPassword'];

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  providers: [ SignUpService, ContentAPIService, RouterModule ],
  styleUrls: ['./signup.component.css']
})
export class SignupComponent extends CommonComponent{
  public vurl = API_URL + '/api/signup';
  public createStatus: string = '';
  public error: string = '';

  constructor(protected http: HttpClient,
    protected contentSrv: ContentAPIService,
    public signupService: SignUpService) {
    super(http, contentSrv);
    
  }
  ngOnInit() {
    super.ngOnInit();
    super.getViewContent(stContent);
  }


  public signUp(username: string, password: string): void {
    this.error = '';
    username = username.trim();
    password = password.trim();
    if (!username) { return; }
    if (!password) { return; }

    const newtmpUser: User = { username , password } as User;
    this.signupService.addUser(newtmpUser)
      .subscribe((tmpUser) => {
        let obj = JSON.parse(JSON.stringify(tmpUser));
        if(obj.returnstatus<=2){ 
            console.log('User created, return code: ' + JSON.stringify(obj));
            this.createStatus = 'User registered.'
            }
        else {
          this.error = obj.message;
          console.log('User not created, return code: ' + JSON.stringify(obj));
        }
      });
  }
      
}
