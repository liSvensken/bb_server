import { parseServicesFromUsersList } from '../../../common/steps/user/parse-services/parse-services-from-users-list';
import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetUser } from '../interfaces/steps-result.interface';


export const step5ParseServicesDbInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUser) => void,
                                               stepsResults: StepsResultGetUser) => {

  parseServicesFromUsersList((err, statusCode, userRes) => {
    if (!err) {
      stepsResults.step4TransformUserDbInResponse = userRes;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, stepsResults.step2GetUserFromDb, stepsResults.step4TransformUserDbInResponse);
}
