import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultsDeleteUser } from '../interfaces/steps-results-delete-user.interface';

export const step2SendApi = (callback: (err: ErrorInterface, statusCode: number, result?: any) => void,
                             stepsResults?: StepsResultsDeleteUser) => {
  callback(null, 200, stepsResults.step1DeleteUser);
}
