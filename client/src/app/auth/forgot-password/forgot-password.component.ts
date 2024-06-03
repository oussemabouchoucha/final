import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  constructor(
    private auth: AuthService,
    private cookieService: CookieService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  onSubmit(form: NgForm, event: Event) {
    event.preventDefault();
    if (form.valid) {
      const { email } = form.value;
      this.auth.forgot(email).subscribe(
        (response: any) => {
          console.log(response);
          this.toastr.success('Please check your email inbox.', 'Email sent!', {
            positionClass: 'toast-bottom-left',
          });
        },
        (error) => {
          // Handle login error
          console.error('Login failed:', error);
          this.toastr.error('Please check your email and try again', 'Email not sent!', {
            positionClass: 'toast-bottom-left',
          });
        }
      );
    }
  }
}
