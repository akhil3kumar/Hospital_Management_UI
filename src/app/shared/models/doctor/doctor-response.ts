import { Specialization } from './specialization';

export interface DoctorResponse {
  id: number;
  name: string;
  specialization: string;
  email: string;
  phoneNumber: string;
  available: boolean;
}
