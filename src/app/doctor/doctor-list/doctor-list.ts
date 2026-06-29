import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../core/services/doctor/doctor-service';
import { DoctorResponse } from '../../shared/models/doctor/doctor-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-list',
  standalone: false,
  templateUrl: './doctor-list.html',
  styleUrl: './doctor-list.css',
})
export class DoctorList implements OnInit {
  constructor(private doctorService: DoctorService, private router: Router) {}

  doctorRecords: DoctorResponse[] = [];

  ngOnInit(): void {
    this.getAllDoctorRecords();
  }

  getAllDoctorRecords() {
    this.doctorService.getAllDoctors().subscribe({
      next: (response) => {
        this.doctorRecords = response;
      },
      error: (err) => {
        const errResponse: HttpErrorResponse = err;
        console.log(errResponse);
      },
    });
  }

  updateDoctorRecord(doctorId: number) {
    this.router.navigate(['/admin/doctor/edit', doctorId]);
  }

  deleteDoctorRecord(doctorId: number) {
    this.doctorService.deleteDoctor(doctorId).subscribe({
      next: () => {
        this.getAllDoctorRecords();
        // this.router.navigate(['/admin/pattients'])
      },
      error: (err) => console.error(err),
    });
  }
}
