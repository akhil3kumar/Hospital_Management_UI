import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class PatientRequestForm {
  static createPatientForm(fb: FormBuilder): FormGroup {
    return fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      age: [null, [Validators.required, Validators.min(0), Validators.max(120)]],
      disease: ['', [Validators.minLength(3), Validators.maxLength(150)]],
      gender: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
    });
  }
}
