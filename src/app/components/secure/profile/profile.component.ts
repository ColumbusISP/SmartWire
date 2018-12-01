import { Component } from '@angular/core';
import { CommonComponent } from '../../common/common/common.component';
import { ContentAPIService } from '../../../services/content.api.service';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from '../../../services/customer/profile';
import { Profile } from '../../../models/profile';

const stContent: string[] = ['custProfileTitle','custProfileMessage','custProfileFirstName','custProfileLasttName','custProfileEMail']

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  providers: [ ContentAPIService ],
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends CommonComponent {
  profile = new Profile();
  submitted = false;
  message: string;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  constructor(protected http: HttpClient, 
    public contentSrv: ContentAPIService, 
    private profileService: ProfileService) { 
    super(contentSrv);

    //var id = this.currentUser.id;

    this.profileService.getCustomer(this.currentUser.id)
      .subscribe(profile => {
        this.profile = profile;
        }
      )
  }  
  
  ngOnInit() {
    super.getViewContent(stContent);
  }

  update(): void {
    this.submitted = true;
    this.profileService.updateCustomer(this.profile)
        .subscribe(() => this.message = "Customer Updated Successfully!");
  }
}
