import { parseServicesFromUsersList } from '../../../common/steps/user/parse-services/parse-services-from-users-list';
import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetUserByToken } from '../interfaces/steps-result-get-user-by-token.interface';


export const step4ParseServicesDbInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUserByToken) => void,
                                               stepsResults: StepsResultGetUserByToken) => {
 parseServicesFromUsersList((err, statusCode, userRes) => {
    if (!err) {
      stepsResults.step3TransformUserDbInResponse = userRes;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, stepsResults.step2GetUserFromDb, stepsResults.step3TransformUserDbInResponse);
}
