import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultAuthorization } from '../interfaces/steps-result-authorization.interface';
import { createToken } from '../../../common/steps/create-token';

export const step3CreateToken = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultAuthorization) => void,
                                 stepsResults: StepsResultAuthorization) => {

  const userId = stepsResults.step1GetUserFromDb[0].id;

  createToken((err, statusCode, token) => {
    if (!err) {
      stepsResults.step3CreateToken = token;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, userId)
}
