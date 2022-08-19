import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoneComponent } from './done/done.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TodoComponent } from './todo/todo.component';
import { canActivate, redirectLoggedInTo,redirectUnauthorizedTo} from "@angular/fire/auth-guard"
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const redirectUnauthorizedToLogin=()=>redirectUnauthorizedTo(['login']); //it routes unloggedin users to login page
const routes: Routes = [
  {path:"",redirectTo:"/login", pathMatch:"full"},
  {path:'signup',component:SignupComponent},
  {path:'login',component:LoginComponent},
  {path:'verify',component:VerifyEmailComponent},  
  {path:'forgot',component:ForgotPasswordComponent},
  // {path:'signup',component:SignupComponent,...canActivate(redirectLoggedInToHome)},
  {path:'tasks',component:TodoComponent,...canActivate(redirectUnauthorizedToLogin)},
  {path:'done',component:DoneComponent,...canActivate(redirectUnauthorizedToLogin)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
