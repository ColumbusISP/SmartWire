import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { SecureHeaderComponent } from './secure-header.component';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../../services/auth/login.service'
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpErrorHandler } from 'src/app/services/http-error-handler.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from '../../../guards/auth.guard';
import { JwtModule } from '@auth0/angular-jwt';
import { MessageService } from '../../../services/message.service';

export function tokenGetter() {
  return localStorage.getItem('token');
}

describe('SecureHeaderComponent', () => {
  let component: SecureHeaderComponent;
  let fixture: ComponentFixture<SecureHeaderComponent>;
  let service: LoginService;
  let spy: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ SecureHeaderComponent ],
      providers: [ RouterModule, LoginService, JwtHelperService, AuthGuard, 
        HttpErrorHandler, MessageService ],
      imports: [ RouterModule, RouterTestingModule,
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        JwtModule .forRoot({
          config: {
            tokenGetter: tokenGetter
          }
        })]
     });

    //service = new LoginService(http, jwtHelperService, httpErrorHandler);
    service = TestBed.get(LoginService);

    fixture = TestBed.createComponent(SecureHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
   //inject([HttpTestingController],(httpMock: HttpTestingController ) => {
    
    spy = spyOn(service, 'isAuthenticated').and.returnValue(true);
    expect(component).toBeTruthy();
  });
});
