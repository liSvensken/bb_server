import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetUsersList } from '../interfaces/steps-result-get-users-list';
import { parseServicesInResponse } from '../../../common/steps/user/parse-services-in-response';

export const step3ParseServicesInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUsersList) => void,
                                             stepsResults: StepsResultGetUsersList) => {
  parseServicesInResponse((err, statusCode, userRes) => {
    if (!err) {
      stepsResults.step2ParseUsersInResponse = userRes;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, stepsResults.step1GetUsersFromDb, stepsResults.step2ParseUsersInResponse);
}
