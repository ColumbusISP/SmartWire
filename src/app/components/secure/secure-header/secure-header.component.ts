import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/auth/login.service'

@Component({
  selector: 'app-secure-header',
  templateUrl: './secure-header.component.html',
  styleUrls: ['./secure-header.component.css']
})
export class SecureHeaderComponent implements OnInit {
  public isAuth: boolean;
  public buttons = [
    {name:'Account Summary', active:false, path:'secure-home', secure: true},
    {name:'Profile', active:false, path:'secure-profile', secure: true},
    {name:'Logout', active:false, path:'logout', secure: true},
           
  ];

constructor( protected loginService: LoginService) { 

}

ngOnInit() {

}
authenticated() {
  this.loginService.isAuthenticated().subscribe((isAuth) => {
    this.isAuth = isAuth;
    // console.log('Auth: ' + this.isAuth);
  }
  )
  return this.isAuth;
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
