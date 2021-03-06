'use strict';
import { Component } from '@angular/core';
import { ContentAPIService } from '../../../services/content.api.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { LoginService } from '../../../services/auth/login.service';
import { User } from '../../../models/user';
import { Router } from '@angular/router';
import { CommonComponent } from '../../common/common/common.component';


const API_URL = environment.apiUrl;

const stContent: string[] = ['authLoginTitle', 'authLoginMessage', 'authLoginUserid', 'authLoginPassword'];

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [ LoginService, ContentAPIService ],
  styleUrls: ['./login.component.css']
})

export class LoginComponent extends CommonComponent {
  public returnUrl: string;
  public error: String = '';
  public vurl = API_URL + '/api/login';
  public rtrnCode: any;
  

  constructor(public http: HttpClient, 
    public contentSrv: ContentAPIService, 
    public loginService: LoginService,
    private router: Router) {
      super(contentSrv);
  }
   
  ngOnInit() {
      super.getViewContent(stContent);
      this.loginService.logout();
      
      //Deep linking Support
      //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      this.returnUrl = 'secure-home';
   }
    
  public login(username: string, password: string): void {
      username = username.trim();
      password = password.trim();
      if (!username) { return; }
      if (!password) { return; }

      const newtmpUser: User = { username , password } as User;
      this.loginService.loginUser(newtmpUser)      
        .subscribe(
          (tmpUser) => {
            let obj = JSON.parse(JSON.stringify(tmpUser));
            console.debug('User Log in response: ' + JSON.stringify(obj));
            
            if(obj.returnstatus<=2){ 
              this.router.navigate([this.returnUrl]);
                            
            }
            else this.error = obj.message;
              
          },
        error => {
          this.error = error;
        }
        );
  }
}
