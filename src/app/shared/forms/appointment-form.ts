import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class AppointmentRequestForm {
  static generateAppointmentForm(fb: FormBuilder): FormGroup {
    return fb.group({
      patientId: ['', [Validators.required]],
      doctorId: ['', [Validators.required]],
      appointmentDate: ['', [Validators.required]],
      appointmentTime: ['', [Validators.required]],
      reason: ['', [Validators.required]],
    });
  }
}
