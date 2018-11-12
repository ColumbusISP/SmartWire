import { Component } from '@angular/core';
import { LoginService } from './services/auth/login.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public isAuth: boolean;
  constructor(protected loginService: LoginService) { 
    
  }
ngOnInit(): void {
  this.authenticated();
  }
  
authenticated() {
  this.loginService.isAuthenticated().subscribe((isAuth) => {
    this.isAuth = isAuth;
    // console.log('Auth: ' + this.isAuth);
  }
  )
  return this.isAuth;
}
}