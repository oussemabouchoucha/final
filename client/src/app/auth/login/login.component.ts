import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private auth: AuthService,
    private cookieService: CookieService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  onSubmit(form: NgForm, event: Event) {
    event.preventDefault();
    if (form.valid) {
      const { email, password } = form.value;
      this.auth.login(email, password).subscribe(
        (response: any) => {
          if (response['access_token']) {
            // Store token in cookie
            this.cookieService.set('access_token', response.access_token);
            // Redirect to home page
            this.router.navigate(['dashboard']);
          } else {
            this.toastr.error('check your eplease check your credentials and try again ', 'Login failed!',{
            positionClass: 'toast-bottom-left',
            
          });
            event.preventDefault();
          }
        },
        (error) => {
          // Handle login error
          console.error('Login failed:', error);
        }
      );
    }
  }
}
