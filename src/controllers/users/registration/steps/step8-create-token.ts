import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultRegistration } from '../interfaces/steps-result-registration.interface';
import { createToken } from '../../../common/steps/create-token';

export const step8CreateToken = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultRegistration) => void,
                                 stepsResults: StepsResultRegistration) => {

  const userId = stepsResults.step7CreateUser.id;

  createToken((err, statusCode, token) => {
    if (!err) {
      stepsResults.step8CreateToken = token;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, userId)
}
