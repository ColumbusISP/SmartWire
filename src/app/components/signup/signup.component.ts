import { Component, OnInit } from '@angular/core';
import { ContentAPIService } from '../../services/content.api.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { HttpErrorHandler, HandleError } from '../../services/http-error-handler.service';
import { SignUpService } from './signup.service';

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
export class SignupComponent implements OnInit {
  
  constructor(private http: HttpClient, public contentSrv: ContentAPIService, public signupService: SignUpService) {}
  private handleError: HandleError;
  public rtrnContent: String[][];
  public vurl = API_URL + '/api/signup';

  ngOnInit() {
      // Get Externalized Content
      this.contentSrv.getContent(stContent.join('&')).subscribe((ndata) => {
        this.rtrnContent = this.contentSrv.parseContent(ndata);
        console.log('signup: ' + this.rtrnContent);
      }
      )
    }
    
    //Static content getter function for the html
    public gSC(key:String): any {
      for (let i in this.rtrnContent){
        if (key==this.rtrnContent[i][0]) {
          return this.rtrnContent[i][1];   
        }
      }  
    }     

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
