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
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatMenuModule } from '@angular/material';
import { HomeComponent } from './components/home/home.component';
import { HttpErrorHandler } from './services/http-error-handler.service';
import { MessageService } from './services/message.service';
import { SecureHomeComponent } from './components/secure/secure-home/secure-home.component';
import { ProfileComponent } from './components/secure/profile/profile.component';
import { LoginService } from './services/auth/login.service';
import { FormsModule } from '@angular/forms';
//import { RouterModule } from '@angular/Router';

//import { ErrorInterceptor } from './services/error.interceptor';
//import { JwtInterceptor } from './services/jwt.interceptor';
//import { JwtHelperService } from '@auth0/angular-jwt';
//import { JwtHelperService  } from '@auth0/angular-jwt';

import { JwtModule   } from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem('token');
}

// const appRoutes: Routes = [
//   { path: 'routing-test', component: HeaderComponent }
// ];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SecureHomeComponent,
    ProfileComponent    
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
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
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
    LoginService
  ],
  exports: [LoginComponent, HeaderComponent, SignupComponent, FooterComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
