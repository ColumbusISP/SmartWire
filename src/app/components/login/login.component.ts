'use strict';
import { Component, OnInit } from '@angular/core';
import { ContentAPIService } from '../../services/content.api.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LoginService } from '../../services/auth/login.service';
import { User } from '../../models/user';
import { Router, ActivatedRoute } from '@angular/router';

const API_URL = environment.apiUrl;

const stContent: string[] = ['authLoginTitle', 'authLoginMessage', 'authLoginUserid', 'authLoginPassword'];

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [ LoginService, ContentAPIService ],
  styleUrls: ['./login.component.css']
})

export class LoginComponent  implements OnInit {
  public returnUrl: string;
  public error: String = '';
  public rtrnContent: String[][];
  public vurl = API_URL + '/api/login';
  public rtrnCode: any;

  constructor(private http: HttpClient, 
    public contentSrv: ContentAPIService, 
    public loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router) {}
  
ngOnInit() {   
    // Get Externalized Content
    this.contentSrv.getContent(stContent.join('&')).subscribe((ndata) => {
      this.rtrnContent = this.contentSrv.parseContent(ndata);
      console.log('login content: ' + this.rtrnContent);
      })
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
            console.log('User Log in response: ' + JSON.stringify(tmpUser));
            let obj = JSON.parse(JSON.stringify(tmpUser));
            if(obj.success){ 
              
              this.router.navigate([this.returnUrl]);
            }
            else this.error = obj.operation;
              
          },
        error => {
          this.error = error;
        }
        );
    }

    //Static content getter function for the html
    public gSC(key:String): any {
      for (let i in this.rtrnContent){
        if (key==this.rtrnContent[i][0]) {
          return this.rtrnContent[i][1];   
        }
      }  
    }     
  }
