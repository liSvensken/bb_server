import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetUserByToken } from '../interfaces/steps-result-get-user-by-token.interface';
import { getUserIdByToken } from '../../../common/steps/get-user-id-by-token';

export const step1GetUserIdByToken = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUserByToken) => void,
                                      token: string, stepsResults: StepsResultGetUserByToken) => {
  getUserIdByToken((err, statusCode, result) => {
    if (!err) {
      stepsResults.step1GetUserId = result;
      callback(null, statusCode, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, token)
}

