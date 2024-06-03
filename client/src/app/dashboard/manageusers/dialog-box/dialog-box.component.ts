import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { errorMessages, regExps } from '../../../utils/form-validator.service';
import { AuthService } from '../../../services/auth.service';

export interface UsersData {
  email: string;
  id: number;
}

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent {

  action: string;
  local_data: any;
  cancel: string = 'Cancel';

  tableForm!: FormGroup;
  errors = errorMessages;
  roles: string[] = ['Admin', 'User'];


  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData,
    private formBuilder: FormBuilder,
    private auth: AuthService
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
    this.creatForm();
    this.tableForm.patchValue(this.local_data);
  }

  creatForm(): void {
    this.tableForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(regExps['email'])]],
      role: [''],
    });
  }

  closeDialog() {
    this.dialogRef.close({ data: { action: 'Cancel' } });
  }

  onNext(): void {
    // Add your logic to handle the next button
  }
  getFormData(form: FormGroup) {
    return form.value;
  }

  onSubmit(form: FormGroup, event: Event ): void {
    console.log('Dialog Data:', this.data);
    const userData = this.getFormData(form)
    console.log('Form Data:', userData);
        

    event.preventDefault();
    const { email } = form.value;
    this.auth.sendInvitationEmail(email).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error) => {
        console.error('failed:', error);
      }
    )
    this.dialogRef.close({ data: { action: this.action, data: this.tableForm.value } });

  }
  
}