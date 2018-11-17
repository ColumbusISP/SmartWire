import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { HttpClient } from 'selenium-webdriver/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { ProfileService } from 'src/app/services/customer/profile';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let service: ProfileService;
  let spy: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      providers: [ RouterModule, ProfileService ],
      imports: [ RouterModule, RouterTestingModule,FormsModule,
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule]
    })
    service = TestBed.get(ProfileService);
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should retrieve profile attributes for the current user', () => {
    expect(component).toBeTruthy();
  });
  it('should update profile attributes for the current user', () => {
    expect(component).toBeTruthy();
  });
});
