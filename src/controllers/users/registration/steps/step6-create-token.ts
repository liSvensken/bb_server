import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultRegistration } from '../interfaces/steps-result-registration.interface';
import { createToken } from '../../../common/steps/create-token';

export const step6CreateToken = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultRegistration) => void,
                                 stepsResults: StepsResultRegistration) => {

  const userId = stepsResults.step5CreateUser.id;

  createToken((err, statusCode, token) => {
    if (!err) {
      stepsResults.step6CreateToken = token;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, userId)
}
