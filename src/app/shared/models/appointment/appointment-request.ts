export interface AppointmentRequest {
  patientId: number;
  doctorId: number;
  appointmentTime: string;
  reason: string;
}
