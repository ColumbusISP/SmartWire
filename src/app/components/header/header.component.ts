import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {
      public buttons = [
        {name:'Home', active:false, path:'home'},
        {name:'Register', active:false, path: 'signup'},
        {name:'Login', active:false, path:'login'},
      ];

  constructor() { 
    
  }

  ngOnInit() {
    
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
