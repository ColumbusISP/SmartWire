import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { LoginService } from '../../../services/auth/login.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {
      public buttons = [
        {name:'Home', active:false, path:'/'},
        {name:'Login', active:false, path:'login'},
        {name:'Register', active:false, path:'signup'}

            
      ];

  constructor(protected loginService: LoginService) { 
  }

  ngOnInit() {
    
  }
  authenticated() {
    return this.loginService.isAuthenticated()
    
  }

}