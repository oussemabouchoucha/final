import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent implements OnInit {
  token: string | undefined;
  id: string | undefined;
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string | undefined;


  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Get the token from the route parameters
    this.route.params.subscribe((params) => {
      this.token = params['token'];
      this.id = params['id'];

      // Check the token validity
      this.authService.checkResetPasswordToken(this.id, this.token).subscribe(
        (isValid) => {
          if (isValid) {
            // Token is valid, you can proceed with resetting the password
            console.log('Token is valid');
          } else {
            // Token is not valid, handle accordingly (e.g., redirect to an error page)
            console.log('Token is not valid');
            this.toastr.error('Invalid token','Oops!',{
              positionClass: 'toast-bottom-left',
            });
          }
        },
        (error) => {
          // Handle API request error
          console.error('Error checking token validity', error);
          this.toastr.error('Error checking token validity','Oops!',{
            positionClass: 'toast-bottom-left',
          });
        }
      );
    });
  }
  onSubmit() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      this.toastr.error('Rewrite it and try again','Passwords do not match',{
        positionClass: 'toast-bottom-left',
      });
      return;
    }

    this.authService.resetPassword(this.id, this.token, this.password)
      .subscribe(
        () => {
          // Password reset successful, redirect to login or any other page
          this.router.navigate(['/login']);
          this.toastr.success('Password reset successful','Success',{
            positionClass: 'toast-bottom-left',
          });
        },
        (error) => {
          // Handle error, display appropriate message
          console.error('Password reset failed', error);
          this.errorMessage = 'Password reset failed';
          this.toastr.error('Password reset failed','Oops!',{
            positionClass: 'toast-bottom-left',
          });
        }
      );
  }
}
