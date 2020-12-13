import { UserRegistrationResponse } from './user-registration-response.interface';

export interface StepsResultRegistration {
  step6HashPassword: string;
  step7CreateUser: UserRegistrationResponse;
  step8CreateToken: string;
}
