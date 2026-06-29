import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { AppointmentResponse } from '../../../shared/models/appointment/appointment-response';
import { AppointmentRequest } from '../../../shared/models/appointment/appointment-request';
import { HttpClient } from '@angular/common/http';
import { AppointmentStatus } from '../../../shared/models/appointment/appointment-status';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiUrl + `/appointments`;

  createAppointment(request: AppointmentRequest): Observable<AppointmentResponse> {
    return this.http.post<AppointmentResponse>(this.apiUrl, request);
  }

  getAllAppointment(): Observable<AppointmentResponse[]> {
    return this.http.get<AppointmentResponse[]>(this.apiUrl);
  }

  getSpecificAppointment(appointmentId: number): Observable<AppointmentResponse> {
    return this.http.get<AppointmentResponse>(`${this.apiUrl}/${appointmentId}`);
  }

  cancelAppointment(appointmentId: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${appointmentId}/cancel`, {});
  }

  getAllAppointmentByPatientId(patientId: number): Observable<AppointmentResponse[]> {
    return this.http.get<AppointmentResponse[]>(`${this.apiUrl}/patient/${patientId}`);
  }

  getAllAppointmentByDoctorId(doctorId: number): Observable<AppointmentResponse[]> {
    return this.http.get<AppointmentResponse[]>(`${this.apiUrl}/doctor/${doctorId}`);
  }

  getAppointmentByStatus(status: AppointmentStatus): Observable<AppointmentResponse[]> {
    return this.http.get<AppointmentResponse[]>(`${this.apiUrl}/status/${status}`);
  }
}
