import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetUserByToken } from '../interfaces/steps-result-get-user-by-token.interface';
import { getUserIdByToken } from '../../../common/steps/get-user-id-by-token';
import { ErrorTypes } from '../../../../utils/errors/error.types';

export const step1GetUserIdByToken = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUserByToken) => void,
                                      token: string, stepsResults: StepsResultGetUserByToken) => {

  let error: ErrorInterface = {
    type: '',
    field: '',
    message: '',
    status: 0,
  };

  getUserIdByToken((err, statusCode, result) => {
    if (!err) {
      stepsResults.step1GetUserId = result;
      callback(null, statusCode, stepsResults);
    } else {
      error.type = ErrorTypes.NoContent;
      error.message = 'Not auth'
      callback(err, 204, null);
    }
  }, token)
}

