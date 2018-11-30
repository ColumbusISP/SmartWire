import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ContentAPIService } from './services/content.api.service';
import { SignupComponent } from './components/signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { HomeComponent } from './components/home/home.component';
import { HttpErrorHandler } from './services/http-error-handler.service';
import { MessageService } from './services/message.service';
import { SecureHomeComponent } from './components/secure/secure-home/secure-home.component';
import { ProfileComponent } from './components/secure/profile/profile.component';
import { LoginService } from './services/auth/login.service';
import { FormsModule } from '@angular/forms';
import { JwtInterceptor } from './services/jwt.interceptor';
import { CommonComponent } from './components/common/common.component';


import { JwtModule   } from '@auth0/angular-jwt';
import { SecureHeaderComponent } from './components/secure/secure-header/secure-header.component';
import { SecureNavComponent } from './components/secure/secure-nav/secure-nav.component';
import { InjectionToken } from '@angular/core';
import { SidenavComponent } from './components/sidenav/sidenav.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

// const appRoutes: Routes = [
//   { path: 'routing-test', component: HeaderComponent }
// ];
export const CONTENT_LIST: InjectionToken<string> = new InjectionToken<string>('CONTENT_LIST');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SecureHomeComponent,
    ProfileComponent,
    SecureHeaderComponent,
    SecureNavComponent,
    CommonComponent,
    SidenavComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpModule,
    //RouterModule.forRoot(appRoutes),
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    JwtModule .forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:3000']
        //blacklistedRoutes: ['localhost:3000/auth/']
      }
    })
  ],
  providers: [
    ContentAPIService,
    HttpErrorHandler, 
    MessageService,
    LoginService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    { 
      provide: CONTENT_LIST, 
      useValue: 'My List Title'
    }
  ],
  exports: [LoginComponent, HeaderComponent, SignupComponent, FooterComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
