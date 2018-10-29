import { Component, OnInit } from '@angular/core';
import { APIService } from '../../services/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private http: HttpClient, public contentsrv: APIService) {}
  public vwKeys: any[] = this.getStaticContentArray();
  public vwContent: String[][];
  public data: object;
  public x: String[][];

  ngOnInit() {
    
    this.contentsrv.getContent(this.vwKeys.join('&')).subscribe((ndata) => {
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
        'authSignupTitle', 'authSignupMessage', 'authSignupUserid', 'authSignupPassword'
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
