import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface PatientRequest {
  name: string;
  age: number;
  gender: string;
  email: string;
  phoneNumber: string;
  address: string;
  disease: string;
}
