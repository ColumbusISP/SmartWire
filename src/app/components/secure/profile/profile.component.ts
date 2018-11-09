import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../../common/common.component';
import { ContentAPIService } from '../../../services/content.api.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../../services/customer/profile';
import { User } from '../../../models/user';

const stContent: string[] = ['custProfileTitle','custProfileMessage','custProfileFirstName','custProfileLasttName','custProfileEMail']

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  providers: [ ContentAPIService ],
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends CommonComponent {
  profile = new User();
  submitted = false;
  message: string;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  constructor(protected http: HttpClient, 
    public contentSrv: ContentAPIService, 
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private router: Router) { 
    super(http, contentSrv, stContent);

    var id = this.currentUser.id;

    this.profileService.getCustomer(id)
      .subscribe(profile => {
        
        this.profile = profile;
        console.debug('User Profile again: ' + JSON.stringify(this.profile));
        console.debug('User First Name: ' + JSON.stringify(profile.firstname));
        }
      )
  }  

  update(): void {
    this.submitted = true;
    this.profileService.updateCustomer(this.profile)
        .subscribe(() => this.message = "Customer Updated Successfully!");
  }
}
