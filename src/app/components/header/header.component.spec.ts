import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { Routes, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginService } from 'src/app/services/auth/login.service';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { HttpErrorHandler } from 'src/app/services/http-error-handler.service';
import { MessageService } from 'src/app/services/message.service';
import { LoginComponent } from '../login/login.component';

const appRoutes: Routes = [
  { path: 'routing-test', component: HeaderComponent }
];
const fakeActivatedRoute = {
  snapshot: { data: {} }
} as ActivatedRoute;

//const loginComponent = new LoginComponent(httpClientModule: HttpClientModule, );

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        
        RouterTestingModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return '';
            }
          }
        })],
      providers: [LoginService, JwtHelperService, HttpErrorHandler, MessageService, { provide: ActivatedRoute, useValue: fakeActivatedRoute }],
      declarations: [HeaderComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    jasmine.clock().install();
    //fixture.detectChanges();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display public header if not logged in', () => {
    //alert (component.authenticated()) ;
    expect(component.authenticated()).toEqual(false);
  });
  // it('should not display public header if logged in', () => {
  //   //alert (component.authenticated()) ;
  //   login('jimmy12','jimmy12');
  //   jasmine.clock().tick(1050);
    
    
  //   expect(component.authenticated()).toEqual(true);
  // });  


});
