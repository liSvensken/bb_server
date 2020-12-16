import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultRegistration } from '../interfaces/steps-result-registration.interface';
import { UserRegistrationResponse } from '../interfaces/user-registration-response.interface';

export const step7SendApi = (callback: (err: ErrorInterface, statusCode: number, result: UserRegistrationResponse, totalItems: number, token: string) => void,
                             stepsResults: StepsResultRegistration) => {
  callback(null, 200, stepsResults.step5CreateUser, null, stepsResults.step6CreateToken);
}
