import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DoctorRequestForm } from '../../shared/forms/doctor-form';
import { Specialization } from '../../shared/models/doctor/specialization';
import { DoctorService } from '../../core/services/doctor/doctor-service';
import { defineConfig } from 'vite';
import { finalize } from 'rxjs';
import { DoctorRequest } from '../../shared/models/doctor/doctor-request';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-doctor-form',
  standalone: false,
  templateUrl: './doctor-form.html',
  styleUrl: './doctor-form.css',
})
export class DoctorForm implements OnInit {
  doctorForm!: FormGroup;
  patientId: number | null = null;
  isLoading!: boolean;
  feildOfSpeciality: string[] = Object.values(Specialization);

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.doctorForm = DoctorRequestForm.createDoctorForm(this.fb);
    this.fetchDoctorsRecordById();
  }

  fetchDoctorsRecordById() {
    const idParam = this.route.snapshot.paramMap.get('doctorId');

    if (idParam) {
      this.patientId = +idParam;
      this.doctorService.getDoctorById(this.patientId).subscribe({
        next: (response) => {
          console.log(response);
          this.doctorForm.patchValue(response);
        },
        error: (err) => {
          const errResponse: HttpErrorResponse = err;
          console.log(errResponse);
        },
      });
    }
  }

  doctorFormSubmit() {
    if (this.doctorForm.invalid) {
      this.doctorForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const doctorRequest = this.doctorForm.getRawValue() as DoctorRequest;

    if (this.patientId) {
      this.doctorService
        .updateDoctor(this.patientId, doctorRequest)
        .pipe(finalize(() => (this.isLoading = true)))
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('admin/doctors');
          },
          error: (err) => {
            const errResponse: HttpErrorResponse = err;
            console.log(errResponse);
          },
        });
    } else {
      this.doctorService
        .createDoctor(doctorRequest)
        .pipe(finalize(() => (this.isLoading = true)))
        .subscribe({
          next: (response) => {
            this.doctorForm.reset;
            // this.router.navigateByUrl('admin/doctors');
          },
          error: (err) => {
            const errResponse: HttpErrorResponse = err;
            console.log(errResponse);
          },
        });
    }
  }

  get name() {
    return this.doctorForm.get('name') as FormControl;
  }

  get specialization() {
    return this.doctorForm.get('specialization') as FormControl;
  }

  get email() {
    return this.doctorForm.get('email') as FormControl;
  }

  get phoneNumber() {
    return this.doctorForm.get('phoneNumber') as FormControl;
  }
}
