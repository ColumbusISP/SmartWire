import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/auth/login.service'

@Component({
  selector: 'app-secure-header',
  templateUrl: './secure-header.component.html',
  styleUrls: ['./secure-header.component.css']
})
export class SecureHeaderComponent implements OnInit {
  
  public buttons = [
    {name:'Logout', active:false, path:'logout'}
           
  ];

constructor( protected loginService: LoginService) { 

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
