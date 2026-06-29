import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '../../core/services/patient/patient-service';
import { PatientRequest } from '../../shared/models/patient/patient-request';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientRequestForm } from '../../shared/forms/patient-form';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-patient-form',
  standalone: false,
  templateUrl: './patient-form.html',
  styleUrl: './patient-form.css',
})
export class PatientForm implements OnInit {
  patientForm!: FormGroup;
  patientId: number | null = null;
  isLoading!: boolean;

  genderType: string[] = ['Male', 'Female', 'Others'];

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.patientForm = PatientRequestForm.createPatientForm(this.fb);
    this.fetchFormDataById();
  }

  fetchFormDataById() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isLoading = true;

      this.patientId = +idParam;
      this.patientService
        .getPatient(this.patientId)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe({
          next: (response) => {
            console.log(response);
            this.patientForm.patchValue({
              name: response.name,
              age: response.age,
              disease: response.disease,
              gender: response.gender,
              email: response.email,
              phoneNumber: response.phoneNumber,
              address: response.address,
            });
          },
          error: (err) => {
            console.error(err);
          },
        });
    }
  }

  onSubmitForm() {
    if (this.patientForm.invalid) {
      this.patientForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    console.log(this.patientForm.value);
    const patientRequest = this.patientForm.getRawValue() as PatientRequest;

    if (this.patientId) {
      this.patientService
        .updatePatient(this.patientId, patientRequest)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe({
          next: (response) => {
            this.router.navigate(['/admin/patient']);
          },
          error: (err) => {
            console.error(err);
          },
        });
    } else {
      this.patientService
        .addPatient(patientRequest)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe({
          next: (response) => {
            console.log(response);
            this.patientForm.reset();
            this.router.navigate(['/admin/patient']);
          },
          error: (err) => {
            console.error(err);
          },
        });
    }
  }

  get name(): FormControl {
    return this.patientForm.get('name') as FormControl;
  }
  get age(): FormControl {
    return this.patientForm.get('age') as FormControl;
  }

  get disease(): FormControl {
    return this.patientForm.get('disease') as FormControl;
  }

  get gender(): FormControl {
    return this.patientForm.get('gender') as FormControl;
  }

  get email(): FormControl {
    return this.patientForm.get('email') as FormControl;
  }

  get phoneNumber(): FormControl {
    return this.patientForm.get('phoneNumber') as FormControl;
  }

  get address(): FormControl {
    return this.patientForm.get('address') as FormControl;
  }
}
