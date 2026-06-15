import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '../../core/services/patient/patient-service';
import { PatientRequest } from '../../shared/models/patient/patient-request';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-patient-form',
  standalone: false,
  templateUrl: './patient-form.html',
  styleUrl: './patient-form.css',
})
export class PatientForm implements OnInit {
  patientForm!: FormGroup;
  patientId!: number | null;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.patientForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      age: ['', [Validators.required, Validators.min(0)]],
      disease: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.patientId = +idParam;
      this.patientService.getPatient(this.patientId).subscribe({
        next: (response) => {
          this.patientForm.patchValue({
            name: response.name,
            age: response.age,
            disease: response.disease,
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

    console.log(this.patientForm.value);
    const patientRequest: PatientRequest = this.patientForm.value;

    if (this.patientId) {
      this.patientService.updatePatient(this.patientId, patientRequest).subscribe({
        next: (response) => {
          this.router.navigate(['/admin/patient']);
        },
        error: (err) => {
          console.error(err);
        },
      });
    } else {
      this.patientService.addPatient(patientRequest).subscribe({
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
}
