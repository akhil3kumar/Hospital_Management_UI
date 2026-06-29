import { Specialization } from './specialization';

export interface DoctorRequest {
  name: string;
  specialization: Specialization;
  email: string;
  phoneNumber: string;
}
