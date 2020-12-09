import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultUpdateUser } from '../interfaces/steps-result-update-user';

export const step7SendApi = (callback: (err: ErrorInterface, statusCode: number, result?: any) => void,
                             stepsResults?: StepsResultUpdateUser) => {
  callback(null, 200, stepsResults.step6UpdateUser);
}
