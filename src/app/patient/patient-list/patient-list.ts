import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../core/services/patient/patient-service';
import { PatientResponse } from '../../shared/models/patient/patient-response';
import { Router } from '@angular/router';
import { NotExpr } from '@angular/compiler';

@Component({
  selector: 'app-patient-list',
  standalone: false,
  templateUrl: './patient-list.html',
  styleUrl: './patient-list.css',
})
export class PatientList implements OnInit {
  patientTableInput: string[] = [
    'Id',
    'Name',
    'Age',
    'Gender',
    'Email',
    'Phone Number',
    'Active',
    'Created At',
    'Updated At',
    'Disease',
    'Action',
  ];

  patientsResponse: PatientResponse[] = [];

  constructor(private patientService: PatientService, private router: Router) {}

  ngOnInit(): void {
    this.getAllPatients();
  }

  getAllPatients(): void {
    this.patientService.getAllPatients().subscribe({
      next: (response) => {
        this.patientsResponse = response;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  updateButton(patientId: number) {
    this.router.navigate(['/admin/patient/edit', patientId]);
  }

  deleteButton(patientId: number) {
    this.patientService.deletePatient(patientId).subscribe({
      next: () => {
        this.getAllPatients();
        // this.router.navigate(['/admin/pattients'])
      },
      error: (err) => console.error(err),
    });
  }
}
