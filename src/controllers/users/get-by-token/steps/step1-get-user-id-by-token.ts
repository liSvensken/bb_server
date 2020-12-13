import { TOKENS_LIST } from '../../../../../TOKENS_LIST';
import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetUserByToken } from '../interfaces/steps-result-get-user-by-token.interface';

export const step1GetUserIdByToken = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUserByToken) => void,
                                      token: string, stepsResults: StepsResultGetUserByToken) => {

  if (TOKENS_LIST[token]) {
    stepsResults.step1GetUserId = TOKENS_LIST[token];
    callback(null, 200, stepsResults);
  } else {
    callback(null, 204, stepsResults);
  }
}

