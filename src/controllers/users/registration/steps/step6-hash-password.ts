import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultRegistration } from '../interfaces/steps-result-registration.interface';
import { hashPassword } from '../../../common/steps/hash-password';


export const step6HashPassword = ((callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultRegistration) => void,
                                   userPassword: string, stepsResults: StepsResultRegistration) => {

  hashPassword((err, statusCode, result) => {
    if (!err) {
      stepsResults.step6HashPassword = result;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, userPassword)
})
