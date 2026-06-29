import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../core/services/appointment/appointment-service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AppointmentRequestForm } from '../../shared/forms/appointment-form';
import { AppointmentRequest } from '../../shared/models/appointment/appointment-request';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { ErrorResponse } from '../../shared/models/error/error-response';
import { DoctorService } from '../../core/services/doctor/doctor-service';
import { PatientService } from '../../core/services/patient/patient-service';
import { PatientResponse } from '../../shared/models/patient/patient-response';
import { DoctorResponse } from '../../shared/models/doctor/doctor-response';

@Component({
  selector: 'app-appointment-form',
  standalone: false,
  templateUrl: './appointment-form.html',
  styleUrl: './appointment-form.css',
})
export class AppointmentForm implements OnInit {
  isLoading!: boolean;
  appointmentForm!: FormGroup;

  patientsRecord: PatientResponse[] = [];
  doctorsRecord: DoctorResponse[] = [];
  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private doctorService: DoctorService,
    private patientService: PatientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.appointmentForm = AppointmentRequestForm.generateAppointmentForm(this.fb);
    this.getAllDoctorRecords();
    this.getAllPatientRecord();
  }

  getAllDoctorRecords() {
    this.doctorService.getAllDoctors().subscribe({
      next: (response) => {
        this.doctorsRecord = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAllPatientRecord() {
    this.patientService.getAllPatients().subscribe({
      next: (response) => {
        this.patientsRecord = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  saveAppointment() {
    if (this.appointmentForm.invalid) {
      this.appointmentForm.markAllAsTouched();
      return;
    }
    const formValue = this.appointmentForm.value;
    const appointmentRequest = {
      patientId: formValue.patientId,
      doctorId: formValue.doctorId,
      appointmentTime: `${formValue.appointmentDate}T${formValue.appointmentTime}`,
      reason: formValue.reason,
    };

    this.appointmentService
      .createAppointment(appointmentRequest)
      .pipe(finalize(() => (this.isLoading = true)))
      .subscribe({
        next: (response) => {
          this.appointmentForm.reset;
          // this.router.navigateByUrl('/admin/appointment');
        },
        error: (err) => {
          const response: ErrorResponse = err;
          console.log(response);
        },
      });
  }

  get patientId(): FormControl {
    return this.appointmentForm.get('patientId') as FormControl;
  }

  get doctorId(): FormControl {
    return this.appointmentForm.get('doctorId') as FormControl;
  }

  get appointmentDate(): FormControl {
    return this.appointmentForm.get('appointmentDate') as FormControl;
  }

  get appointmentTime(): FormControl {
    return this.appointmentForm.get('appointmentTime') as FormControl;
  }

  get reason(): FormControl {
    return this.appointmentForm.get('reason') as FormControl;
  }
}
