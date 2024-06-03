import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(
    private auth: AuthService,
    private cookieService: CookieService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  onSubmit(form: NgForm, event: Event) {
    event.preventDefault();
    if (form.valid) {
      const { email, password, username } = form.value;
      this.auth.register(username, email, password).subscribe(
        (response: any) => {
          if (response['access_token']) {
            // Store token in cookie
            this.cookieService.set('access_token', response.access_token);
            // Redirect to home page
            this.router.navigate(['/']);
            this.toastr.success('Registration successful');
          } else {
            alert('Login failed');
            event.preventDefault();
          }
        },
        (error) => {
          // Handle login error
          console.error('Login failed:', error);
          this.toastr.error('please login or use another email or username', 'User already exists',{
            positionClass: 'toast-bottom-left',
          });
        }
      );
    }
  }
}
