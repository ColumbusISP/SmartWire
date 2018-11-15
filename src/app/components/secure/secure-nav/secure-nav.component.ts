import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/auth/login.service'

@Component({
  selector: 'app-secure-nav',
  templateUrl: './secure-nav.component.html',
  styleUrls: ['./secure-nav.component.css']
})
export class SecureNavComponent implements OnInit {

  constructor( private loginService: LoginService) { }

  ngOnInit() {
  }
  authenticated() {
    return this.loginService.isAuthenticated()
  }
}
