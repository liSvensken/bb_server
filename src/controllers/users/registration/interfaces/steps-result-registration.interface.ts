import { UserRegistrationResponse } from './user-registration-response.interface';
import { UserRegistrationRequest } from './user-registration-request.interface';

export interface StepsResultRegistration {
  step6HashPassword: UserRegistrationRequest;
  step7CreateUser: UserRegistrationResponse;
}
