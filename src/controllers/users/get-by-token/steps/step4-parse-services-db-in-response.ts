import { parseServicesDbInResponse } from '../../../common/steps/user/parse-services-db-in-response';
import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetUserByToken } from '../interfaces/steps-result-get-user-by-token.interface';


export const step4ParseServicesDbInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUserByToken) => void,
                                               stepsResults: StepsResultGetUserByToken) => {

  parseServicesDbInResponse((err, statusCode, userRes) => {
    if (!err) {
      stepsResults.step3TransformUserDbInResponse = userRes;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, stepsResults.step2GetUserFromDb, stepsResults.step3TransformUserDbInResponse);
}
