import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { LoginService } from '../../services/auth/login.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {
      public buttons = [
        {name:'Login', active:false, path:'login'}       
      ];

  constructor(protected loginService: LoginService) { 
  }

  ngOnInit() {
    
  }
  authenticated() {
    return this.loginService.isAuthenticated()
    
  }
  toggleClass(button){
    for (let i in this.buttons){
      if (this.buttons[i].name == button.name){
        this.buttons[i].active = true;  
      }
      else
      {
        this.buttons[i].active = false;
      }
    }
    
  }
}