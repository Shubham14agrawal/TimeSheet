import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { TimesheetListComponent } from './components/timesheet-list/timesheet-list.component';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']); //Redirects the user to the login page if he/she's not logged in.
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']); //Redirects the user to the home page if he/she's already logged in.

const routes: Routes = [
  { path: '', pathMatch: 'full', component: LandingComponent },
  { path: 'login', component: LoginComponent, ...canActivate(redirectLoggedInToHome) },
  { path: 'signup', component: SignupComponent, ...canActivate(redirectLoggedInToHome) },
  { path: 'home', component: HomeComponent,  ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'timeSheetList', component: TimesheetListComponent,  ...canActivate(redirectUnauthorizedToLogin) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
