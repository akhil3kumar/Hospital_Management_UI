import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { DoctorRequest } from '../../../shared/models/doctor/doctor-request';
import { Observable } from 'rxjs';
import { DoctorResponse } from '../../../shared/models/doctor/doctor-response';
import { Specialization } from '../../../shared/models/doctor/specialization';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiUrl + `/doctors`;

  createDoctor(request: DoctorRequest): Observable<DoctorResponse> {
    return this.http.post<DoctorResponse>(this.apiUrl, request);
  }

  getAllDoctors(): Observable<DoctorResponse[]> {
    return this.http.get<DoctorResponse[]>(`${this.apiUrl}`);
  }

  getDoctorById(doctorId: number): Observable<DoctorResponse> {
    return this.http.get<DoctorResponse>(`${this.apiUrl}/${doctorId}`);
  }

  updateDoctor(doctorId: number, request: DoctorRequest): Observable<DoctorResponse> {
    return this.http.put<DoctorResponse>(`${this.apiUrl}/${doctorId}`, request);
  }

  deleteDoctor(doctorId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${doctorId}`);
  }

  getDoctorsBySpecialization(specialization: Specialization): Observable<DoctorResponse[]> {
    return this.http.get<DoctorResponse[]>(`${this.apiUrl}/specialization/${specialization}`);
  }

  getDoctorsByAvailability(): Observable<DoctorResponse[]> {
    return this.http.get<DoctorResponse[]>(`${this.apiUrl}/available`);
  }

  //{id}/availability?
  updateDoctorAvailability(doctorId: number, availability: boolean): Observable<DoctorResponse> {
    return this.http.patch<DoctorResponse>(`${this.apiUrl}/${doctorId}/availability`, {
      available: availability,
    });
  }
}
