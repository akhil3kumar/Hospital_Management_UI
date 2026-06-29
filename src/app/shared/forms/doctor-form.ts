import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class DoctorRequestForm {
  static createDoctorForm(fb: FormBuilder): FormGroup {
    return fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      specialization: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    });
  }
}
