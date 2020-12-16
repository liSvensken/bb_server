import { parseServiceIdsStrInResponse } from '../../../common/steps/user/parse-service-ids-str-in-response';
import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultAuthorization } from '../interfaces/steps-result-authorization.interface';


export const step5ParseInServicesResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultAuthorization) => void,
                                             stepsResults: StepsResultAuthorization) => {

  parseServiceIdsStrInResponse((err, statusCode, userRes) => {
    if (!err) {
      stepsResults.step4TransformInUserResponse = userRes;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, stepsResults.step1GetUserFromDb, stepsResults.step4TransformInUserResponse);
}
