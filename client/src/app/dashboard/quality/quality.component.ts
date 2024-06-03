import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClearoutService } from 'src/app/services/clearout.service';

@Component({
  selector: 'app-quality',
  templateUrl: './quality.component.html',
  styleUrls: ['./quality.component.css']
})
export class QualityComponent implements OnInit {
 

  constructor() {}

  ngOnInit(): void {}

 

}



// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute } from '@angular/router';
// import { ClearoutService } from 'src/app/services/clearout.service';

// @Component({
//   selector: 'app-quality',
//   templateUrl: './quality.component.html',
//   styleUrls: ['./quality.component.css']
// })
// export class QualityComponent implements OnInit {
//   validationForm: FormGroup;
//   validationResponse: any;
//   isLoading = false;
//   selectedLeads: any[] = [];
//   receivedEmail!: string;
//   receivedPhone!: string;

//   constructor(
//     private fb: FormBuilder,
//     private clearoutService: ClearoutService,
//     private route: ActivatedRoute
//   ) {
//     this.validationForm = this.fb.group({
//       phoneNumber: ['', [Validators.required]],
//       countryCode: ['US', [Validators.required]],
//       email: ['', [Validators.required, Validators.email]]
//     });
//   }

//   ngOnInit(): void {
//     this.route.queryParams.subscribe(params => {
//       if (params['leads']) {
//         this.selectedLeads = JSON.parse(params['leads']);
//         console.log('Received leads:', this.selectedLeads);

//         if (this.selectedLeads.length > 0) {
//           this.receivedEmail = this.selectedLeads[0].email;
//           this.receivedPhone = this.selectedLeads[0].phone;

//           this.validationForm.patchValue({
//             phoneNumber: this.receivedPhone,
//             email: this.receivedEmail
//           });
//         }
//       }
//     });
//   }

//   get phoneNumber() { return this.validationForm.get('phoneNumber'); }
//   get countryCode() { return this.validationForm.get('countryCode'); }
//   get email() { return this.validationForm.get('email'); }

//   onSubmit(): void {
//     if (this.validationForm.valid) {
//       this.isLoading = true;
//       const phoneNumber = this.validationForm.value.phoneNumber;
//       const countryCode = this.validationForm.value.countryCode;
//       const email = this.validationForm.value.email;

//       console.log('Submitting data:', { phoneNumber, countryCode, email });

//       if (phoneNumber) {
//         this.clearoutService.validatePhoneNumber(phoneNumber, countryCode).subscribe(
//           response => {
//             this.validationResponse = response;
//             this.isLoading = false;
//           },
//           error => {
//             console.error('Error validating phone number:', error.message || error);
//             if (error.error) {
//               console.error('Error details:', error.error);
//             }
//             this.isLoading = false;
//           }
//         );
//       }
//       if (email) { // Changed from else if to if to allow both validations to run independently
//         this.clearoutService.validateEmail(email).subscribe(
//           response => {
//             this.validationResponse = response;
//             this.isLoading = false;
//           },
//           error => {
//             console.error('Error validating email:', error.message || error);
//             if (error.error) {
//               console.error('Error details:', error.error);
//             }
//             this.isLoading = false;
//           }
//         );
//       }
//     }
//   }
// }

