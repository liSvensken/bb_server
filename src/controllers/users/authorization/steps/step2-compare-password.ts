import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultAuthorization } from '../interfaces/steps-result-authorization.interface';
import { comparePassword } from '../../../common/steps/compare-password';

export const step2ComparePassword = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultAuthorization) => void,
                                     userPassword: string, stepsResults: StepsResultAuthorization) => {

  comparePassword((err, statusCode) => {
    if (!err) {
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, userPassword, stepsResults.step1GetUserFromDb[0].passwordHash)
}
