import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { PatientResponse } from '../../../shared/models/patient/patient-response';
import { PatientRequest } from '../../../shared/models/patient/patient-request';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiUrl + '/patients';

  addPatient(request: PatientRequest): Observable<PatientResponse> {
    return this.http.post<PatientResponse>(`${this.apiUrl}`, request);
  }

  getAllPatients(): Observable<PatientResponse[]> {
    return this.http.get<PatientResponse[]>(`${this.apiUrl}`);
  }

  getPatient(patientId: number): Observable<PatientResponse> {
    return this.http.get<PatientResponse>(`${this.apiUrl}/${patientId}`);
  }

  updatePatient(patientId: number, request: PatientRequest): Observable<PatientResponse> {
    return this.http.put<PatientResponse>(`${this.apiUrl}/${patientId}`, request);
  }

  deletePatient(patientId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${patientId}`);
  }
}
