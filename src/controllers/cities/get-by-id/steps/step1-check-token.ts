import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { getUserIdByToken } from '../../../common/steps/get-user-id-by-token';
import { StepsResultGetCity } from '../interfaces/steps-result-get-city';

export const step1CheckToken = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetCity) => void,
                                token: string, stepsResults: StepsResultGetCity) => {
  getUserIdByToken((err, statusCode) => {
    if (!err) {
      callback(null, statusCode, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, token)
}
