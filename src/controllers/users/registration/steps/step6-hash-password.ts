import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultRegistration } from '../interfaces/steps-result-registration.interface';
import { hashPassword } from '../../../common/steps/hash-password';
import { UserRegistrationRequest } from '../interfaces/user-registration-request.interface';


export const step6HashPassword = ((callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultRegistration) => void,
                                   user: UserRegistrationRequest, stepsResults: StepsResultRegistration) => {

  hashPassword((err, statusCode, result) => {
    if (!err) {
      user.password = result;
      stepsResults.step6HashPassword = user;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, user.password)
})
