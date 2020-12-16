import { parseServiceIdsStrInResponse } from '../../../common/steps/user/parse-service-ids-str-in-response';
import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetUserByToken } from '../interfaces/steps-result-get-user-by-token.interface';


export const step4ParseInServicesResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUserByToken) => void,
                                             stepsResults: StepsResultGetUserByToken) => {

  parseServiceIdsStrInResponse((err, statusCode, userRes) => {
    if (!err) {
      stepsResults.step3TransformInUserResponse = userRes;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, stepsResults.step2GetUserFromDb, stepsResults.step3TransformInUserResponse);
}
