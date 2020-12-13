import { parseServicesInResponse } from '../../../common/steps/user/parse-services-in-response';
import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetUserByToken } from '../interfaces/steps-result-get-user-by-token.interface';


export const step4ParseInServicesResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUserByToken) => void,
                                             stepsResults: StepsResultGetUserByToken) => {

  parseServicesInResponse((err, statusCode, userRes) => {
    if (!err) {
      stepsResults.step3ParseInUserResponse = userRes;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, stepsResults.step2GetUserFromDb, stepsResults.step3ParseInUserResponse);
}
