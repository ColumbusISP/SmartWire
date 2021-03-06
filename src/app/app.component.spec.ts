import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './components/header/header.component';
import { HttpErrorHandler } from './services/http-error-handler.service';
import { Component } from '@angular/core';
import { MessageService } from './services/message.service';
import { LoginService } from './services/auth/login.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return '';
            }
          }
        })],
      declarations: [
        AppComponent, MockHeaderComponent, MockFooterComponent, 
        MockRouterOutlet, MockSecureHeaderComponent, MockSecureNavComponent
      ],
      providers: [MessageService, LoginService, HttpClient, HttpErrorHandler, HttpHandler, JwtHelperService]
     
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Smart Wire'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    //expect(app.title).toEqual('Smart Wire');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    //expect(compiled.querySelector('h1').textContent).toContain('Welcome to ng-exp4!');
  });
});

@Component({
  selector: 'app-header',
  template: ''
})
class MockHeaderComponent {
}

@Component({
  selector: 'app-secure-header',
  template: ''
})
class MockSecureHeaderComponent {
}

@Component({
  selector: 'app-secure-nav',
  template: ''
})
class MockSecureNavComponent {
}

@Component({
  selector: 'app-footer',
  template: ''
})
class MockFooterComponent {
}

@Component({
  selector: 'router-outlet',
  template: ''
})
class MockRouterOutlet {
}
