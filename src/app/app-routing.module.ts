import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SecureHomeComponent } from './components/secure/secure-home/secure-home.component';
import { ProfileComponent } from './components/secure/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
    //component: HomeComponent,
    //outlet: 'notloggedin'
    
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent

  },
  {
    path: 'home',
    component: HomeComponent
 
  },
  {
    path: 'secure-home',
    component: SecureHomeComponent,
    canActivate: [AuthGuard]
    
  },
  {
    path: 'secure-profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
    
  },
  {
    path: 'logout',
    component: LoginComponent
  
  }
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
