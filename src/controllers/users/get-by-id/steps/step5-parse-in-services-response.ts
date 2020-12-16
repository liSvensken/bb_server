import { parseServiceIdsStrInResponse } from '../../../common/steps/user/parse-service-ids-str-in-response';
import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetUser } from '../interfaces/steps-result.interface';


export const step5ParseInServicesResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUser) => void,
                                             stepsResults: StepsResultGetUser) => {

  parseServiceIdsStrInResponse((err, statusCode, userRes) => {
    if (!err) {
      stepsResults.step3TransformInUserResponse = userRes;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, stepsResults.step2GetUserFromDb, stepsResults.step3TransformInUserResponse);
}
