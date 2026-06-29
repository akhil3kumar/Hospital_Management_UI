import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../core/services/appointment/appointment-service';
import { AppointmentResponse } from '../../shared/models/appointment/appointment-response';
import { ErrorResponse } from '../../shared/models/error/error-response';
import { AppointmentStatus } from '../../shared/models/appointment/appointment-status';
import { ActivatedRoute } from '@angular/router';
import { S } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-appointment-list',
  standalone: false,
  templateUrl: './appointment-list.html',
  styleUrl: './appointment-list.css',
})
export class AppointmentList implements OnInit {
  appointmentRecords: AppointmentResponse[] = [];
  constructor(private appointmentService: AppointmentService, private route: ActivatedRoute) {}

  displayedColumns: string[] = [
    'id',
    'patientName',
    'doctorName',
    'appointmentTime',
    'reason',
    'appointmentStatus',
  ];

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const status = params.get('status');

      if (status) {
        this.getAppointmentByStatus(status as AppointmentStatus);
      } else {
        this.getAllAppointments();
      }
    });
  }

  getAppointmentByStatus(status: AppointmentStatus): void {
    this.appointmentService.getAppointmentByStatus(status).subscribe({
      next: (response) => {
        this.appointmentRecords = response;
      },
      error: (err) => {
        const errResponse: ErrorResponse = err;
        console.log(errResponse);
      },
    });
  }

  getAllAppointments() {
    this.appointmentService.getAllAppointment().subscribe({
      next: (response) => {
        this.appointmentRecords = response;
      },
      error: (err) => {
        const errResponse: ErrorResponse = err;
        console.log(errResponse);
      },
    });
  }
}
