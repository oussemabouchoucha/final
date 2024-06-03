import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { CookieService } from 'ngx-cookie-service';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
  },
  { 
    path: 'register',
   component: RegisterComponent,
   canActivate: [AuthGuard],
  },
  { 
    path: 'forgot-password',
   component: ForgotPasswordComponent,
   canActivate: [AuthGuard],
  },
  { path: 'reset-password/:id/:token',
   component: ResetPasswordComponent,
   canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
  constructor(private cookieService: CookieService) {}
}
