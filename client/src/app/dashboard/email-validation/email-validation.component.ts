import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClearoutService } from 'src/app/services/clearout.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-email-validation',
  templateUrl: './email-validation.component.html',
  styleUrls: ['./email-validation.component.css']
})
export class EmailValidationComponent implements OnInit, AfterViewInit {
  @ViewChild('emailInput') emailInput!: ElementRef;

  emailForm: FormGroup;
  validationResponse: any;
  isLoading = false;
  selectedLeads: any[] = [];
  receivedEmail!: string;

  constructor(
    private fb: FormBuilder,
    private clearoutService: ClearoutService,
    private route: ActivatedRoute
  ) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get email() {
    return this.emailForm.get('email');
  }

  ngAfterViewInit(): void {
    this.emailInput.nativeElement.focus();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['leads']) {
        this.selectedLeads = JSON.parse(params['leads']);
        console.log('Received leads:', this.selectedLeads);

        if (this.selectedLeads.length > 0) {
          this.receivedEmail = this.selectedLeads[0].email;
          console.log('Patching email form with:', this.receivedEmail);

          this.emailForm.patchValue({ email: this.receivedEmail });

          // Force change detection
          this.emailForm.get('email')?.setValue(this.receivedEmail, { emitEvent: true });
        }
      }
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault(); // Prevent default form submission

    if (this.emailForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    if (this.isLoading) {
      console.log('Already loading');
      return;
    }

    this.isLoading = true;
    const email = this.emailForm.value.email;
    console.log('Submitting email for validation:', email);

    this.clearoutService.validateEmail(email).subscribe(
      response => {
        this.validationResponse = response;
        this.isLoading = false;
        console.log('Email validation status:', response.status);
        console.log('Safe to send:', response.data.safe_to_send);
      },
      error => {
        console.error('Error validating email:', error);
        this.isLoading = false;
      }
    );
  }
}
