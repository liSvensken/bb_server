import { UserRegistrationResponse } from './user-registration-response.interface';

export interface StepsResultRegistration {
  step4HashPassword: string;
  step5CreateUser: UserRegistrationResponse;
  step6CreateToken: string;
}
