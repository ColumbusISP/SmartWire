'use strict';
import { Component, OnInit } from '@angular/core';
import { ContentAPIService } from '../../services/content.api.service';
import { HttpClient } from '@angular/common/http';

export interface CAASContent {
   id: string;
   name: string;
   }

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent  implements OnInit {
  constructor(private http: HttpClient, public contentSrv: ContentAPIService) {}
    public vwKeys: any[] = this.getStaticContentArray();
    public vwContent: String[][];
    public data: object;
    public x: String[][];
    
    ngOnInit() {  
      this.contentSrv.getContent(this.vwKeys.join('&')).subscribe((ndata) => {
          this.data = ndata;
          let x = this.data;
          this.vwContent = new Array;
          for (let i in this.vwKeys){
              this.vwContent[i] = [this.vwKeys[i], x[i].name] ;  
          }
             console.log(this.vwContent);
         }
        )
      }
      public getStaticContentArray(): any {
        return [
          'authLoginTitle', 'authLoginMessage', 'authLoginUserid', 'authLoginPassword'
        ]
      }
      public gSC(key:String): any {
        for (let i in this.vwContent){
          if (key==this.vwContent[i][0]) {
            return this.vwContent[i][1];   
          }
        }  
      }      
  }
