import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-ph',
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.css']
})
export class PlaceholderComponent implements OnInit {
  public params;
  public page;

  constructor(route:ActivatedRoute) { 
    route.queryParams.subscribe(val => { 
        this.params = val;
        this.page = this.params["page"];
    }); 
}

  ngOnInit() {
  }

}
