import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClearoutService } from 'src/app/services/clearout.service';

@Component({
  selector: 'app-phone-validation',
  templateUrl: './phone-validation.component.html',
  styleUrls: ['./phone-validation.component.css']
})
export class PhoneValidationComponent implements OnInit {
  phoneForm: FormGroup;
  validationResponse: any;
  isLoading = false;
  selectedLeads: any[] = [];
  receivedPhone!: string;

  constructor(
    private fb: FormBuilder,
    private clearoutPhoneService: ClearoutService,
    private route: ActivatedRoute
  ) {
    this.phoneForm = this.fb.group({
      phoneNumber: ['', [Validators.required]],
      countryCode: ['TN', [Validators.required]]
    });
  }

  get phoneNumber() {
    return this.phoneForm.get('phoneNumber');
  }

  get countryCode() {
    return this.phoneForm.get('countryCode');
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['leads']) {
        this.selectedLeads = JSON.parse(params['leads']);
        console.log('Received leads:', this.selectedLeads);

        if (this.selectedLeads.length > 0) {
          this.receivedPhone = this.selectedLeads[0].phone;
          this.phoneForm.patchValue({
            phoneNumber: this.receivedPhone,
          });
        }
      }
    });
  }

  onSubmit(): void {
    if (this.phoneForm.valid) {
      this.isLoading = true;
      const phoneNumber = this.phoneForm.value.phoneNumber;
      const countryCode = this.phoneForm.value.countryCode;

      this.clearoutPhoneService.validatePhoneNumber(phoneNumber, countryCode).subscribe(
        response => {
          this.validationResponse = response;
          this.isLoading = false;
          console.log('Phone validation status:', response.status);
          console.log('Localization:', response.data.location);
        },
        error => {
          console.error('Error validating phone number:', error);
          this.isLoading = false;
        }
      );
    }
  }
}
