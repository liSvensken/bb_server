import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultRegistration } from '../interfaces/steps-result-registration';

export const step7SendApi = (callback: (err: ErrorInterface, statusCode: number, result: any) => void,
                             stepsResults: StepsResultRegistration) => {
  callback(null, 200, stepsResults.step6CreateUser);
}
