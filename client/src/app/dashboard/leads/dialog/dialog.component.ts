import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { errorMessages, regExps } from '../../../utils/form-validator.service'

export interface UsersData {
  name: string;
  id: number;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  action: string;
  local_data: any;
  countries!: string[];
  cancel: string = 'Cancel';

  tableForm!: FormGroup;
  errors = errorMessages;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData,
    private formBuilder: FormBuilder,) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
    this.creatForm();
    this.tableForm.patchValue(this.local_data);
  }

  creatForm(): void {
    this.tableForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(regExps['str'])]],
      email: ['', [Validators.required, Validators.pattern(regExps['email'])]],
      phone: ['', [Validators.required, Validators.pattern(regExps['num'])]],
      status: [Validators.pattern(regExps['str'])],
      sex: ['', [Validators.pattern(regExps['str'])]],
      localisation: ['', [Validators.pattern(regExps['str'])]],
      age: ['', [Validators.pattern(regExps['num'])]],
      ville: ['', [Validators.pattern(regExps['str'])]],
      situation: ['', [Validators.pattern(regExps['str'])]],
    });
  }

  closeDialog() {
    this.dialogRef.close({ data: { action: 'Cancel' } });
  }

  onSubmit(): void {
    if (this.tableForm.valid) {
      console.log("Form data:", this.tableForm.value);
      
      // Close the dialog with action and form data directly
      this.dialogRef.close({
        action: this.action,
        ...this.tableForm.value // Spread the form data directly
      });
    } else {
      console.log('Form is invalid');
    }
  }
  
}
