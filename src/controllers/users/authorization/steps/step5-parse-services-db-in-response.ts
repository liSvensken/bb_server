import { parseServicesFromUsersList } from '../../../common/steps/user/parse-services/parse-services-from-users-list';
import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultAuthorization } from '../interfaces/steps-result-authorization.interface';


export const step5ParseServicesDbInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultAuthorization) => void,
                                               stepsResults: StepsResultAuthorization) => {

  const role = stepsResults.step1GetUserFromDb[0].role;

 parseServicesFromUsersList((err, statusCode, userRes) => {
    if (!err) {
      stepsResults.step4TransformUserDbInResponse = userRes;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, stepsResults.step1GetUserFromDb, stepsResults.step4TransformUserDbInResponse, role);
}
